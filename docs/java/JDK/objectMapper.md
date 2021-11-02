---
title: ObjectMapper
tag:
 - ObjectMapper
 - 序列化
date: 2021-10-09 19:25:18
sidebar: true
categories: java
---

## 概述

Jackson ObjectMapper可以从字符串、流或文件解析JSON，并创建Java对象或对象图来表示已解析的JSON。将JSON解析为Java对象也称为从JSON反序列化Java对象；Jackson ObjectMapper也可以从Java对象创建JSON. 从Java对象生成JSON的过程也被称为序列化Java对象到JSON。

## 反序列化

核心方法：
readValue(xxx,Class对象)

示例：
```java
public class Car {
    private String brand = null;
    private int doors = 0;
 
    public String getBrand() { return this.brand; }
    public void   setBrand(String brand){ this.brand = brand;}
 
    public int  getDoors() { return this.doors; }
    public void setDoors (int doors) { this.doors = doors; }
}
...........................................................
ObjectMapper objectMapper = new ObjectMapper();
String carJson = "{ \"brand\" : \"Mercedes\", \"doors\" : 5 }";
try {
    Car car = objectMapper.readValue(carJson, Car.class);
    System.out.println("car brand = " + car.getBrand());
    System.out.println("car doors = " + car.getDoors());
} catch (IOException e) {
    e.printStackTrace();
}
```

1. 从JSON字符串读取Java对象
2. 从JSON Reader对象读取Java对象
3. 从JSON文件读取Java对象
4. 从URL获取JSON数据读取Java对象
5. 从Java InputStream获取JSON数据读取Java对象
6. 从字节数组获取JSON数据读取Java对象
7. 从JSON数组字符串读取Java对象数组
```java
String jsonArray = "[{\"brand\":\"ford\"}, {\"brand\":\"Fiat\"}]";
ObjectMapper objectMapper = new ObjectMapper();
Car[] cars2 = objectMapper.readValue(jsonArray, Car[].class);
```
8. 从JSON数组字符串读取Java List对象
```java
String jsonArray = "[{\"brand\":\"ford\"}, {\"brand\":\"Fiat\"}]";
ObjectMapper objectMapper = new ObjectMapper();
List<Car> cars1 = objectMapper.readValue(jsonArray, new TypeReference<List<Car>>(){});
```
 · Jackson通过反射来生成Java对象, 但是模板会擦除类型, 所以这里用TypeReference进行包装

9. 从JSON字符串读取Java Map对象
```java
String jsonObject = "{\"brand\":\"ford\", \"doors\":5}";
ObjectMapper objectMapper = new ObjectMapper();
Map<String, Object> jsonMap = objectMapper.readValue(jsonObject, new TypeReference<Map<String,Object>>(){});
```

特殊情况
1. 忽略Java对象没有的JSON属性
有时候你要读取的JSON数据的属性要多于你的Java对象的属性, 默认情况下Jackson这时会抛出异常, 含义是无法在Java对象中找到未知属性XXX
但是, 我们有时候又需要允许JSON属性多于要产生的Java对象的属性. 比如, 你想从一个REST服务获取JSON数据, 但是它包含的内容远多于你所需要的. 这是, 通过配置Jackson的Feature使能可以让你忽略那些多余的属性
```java
objectMapper.configure(
    DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
```
 · 也可以用ObjectMapper.enabled()/disabled()方法进行配置

2. JSON属性值为NULL且对应Java原生类型产生的异常
Java中的基本数据类型的值不能是null。你可以配置
```java
ObjectMapper objectMapper = new ObjectMapper();
 
objectMapper.configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);
```

## 序列化

核心方法:
 · writeValue()
 · writeValueAsString()
 · writeValueAsBytes()

示例：
```java
ObjectMapper objectMapper = new ObjectMapper();
 
Car car = new Car();
car.brand = "BMW";
car.doors = 4;
 
objectMapper.writeValue(new FileOutputStream("data/output-2.json"), car);
```
这里首先创建了一个ObjectMapper实例和一个Car实例, 然后调用ObjectMapper的writeValue()方法把Car实例转换为JSON后输出到FileOutputStream。

writeValueAsString() 和writeValueAsBytes()也可以从对象生成JSON, 并且返回一个String或Byte数组的JSON。
```java
ObjectMapper objectMapper = new ObjectMapper();
 
Car car = new Car();
car.brand = "BMW";
car.doors = 4;
 
String json = objectMapper.writeValueAsString(car);
System.out.println(json);
```

自定义序列化 TODO

## Jackson的日期格式化

默认情况下, Jackson会把一个java.util.Date对象序列化为一个long型值, 也就是从1970-01-1到现在的毫秒数, 当然, Jackson也支持把日期格式化为字符串.
使用SimpleDateFormat格式化日期
```java
SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
objectMapper2.setDateFormat(dateFormat);
 
String output2 = objectMapper2.writeValueAsString(transaction);
System.out.println(output2);
```
## Jacson的树模型

Jackson内置了一个树模型(tree model)可以用来表示一个JSON对象. 这个树模型非常有用, 比如你不知道收到的JSON数据的结构, 或者你不想新建一个Java类来表示这个JSON数据, 或者你想在使用或者转发JSON数据前对它进行操作.
Jackson的树模型由JsonNode类实现. 你可以用ObjectMapper实例把JSON解析为JsonNode模型, 就像反序列化出一个自定义类对象一样.
方式一：
```java
String carJson = "{ \"brand\" : \"Mercedes\", \"doors\" : 5 }";
ObjectMapper objectMapper = new ObjectMapper();
try {
    JsonNode jsonNode = objectMapper.readValue(carJson, JsonNode.class);
} catch (IOException e) {
    e.printStackTrace();
}
```
方式二：
```java
String carJson = "{ \"brand\" : \"Mercedes\", \"doors\" : 5 }";
ObjectMapper objectMapper = new ObjectMapper();
try {
    JsonNode jsonNode = objectMapper.readTree(carJson);
} catch (IOException e) {
    e.printStackTrace();
}
```

## JsonNode类

JsonNode提供了非常灵活和动态访问的方式, 可以像访问Java对象那样导航浏览JSON,如果把JSON解析为一个JsonNode实例(或一个JsonNode实例树), 就可以浏览JsonNode树模型, 如下例中用JsonNode访问JSON中的属性,数组,对象等等:
```java
String carJson =
        "{ \"brand\" : \"Mercedes\", \"doors\" : 5," +
        "  \"owners\" : [\"John\", \"Jack\", \"Jill\"]," +
        "  \"nestedObject\" : { \"field\" : \"value\" } }";
ObjectMapper objectMapper = new ObjectMapper();
try {
    JsonNode jsonNode = objectMapper.readValue(carJson, JsonNode.class);
 
    JsonNode brandNode = jsonNode.get("brand");
    String brand = brandNode.asText();
    System.out.println("brand = " + brand);
 
    JsonNode doorsNode = jsonNode.get("doors");
    int doors = doorsNode.asInt();
    System.out.println("doors = " + doors);
 
    JsonNode array = jsonNode.get("owners");
    JsonNode jsonNode = array.get(0);
    String john = jsonNode.asText();
    System.out.println("john  = " + john);
 
    JsonNode child = jsonNode.get("nestedObject");
    JsonNode childField = child.get("field");
    String field = childField.asText();
    System.out.println("field = " + field);
 
} catch (IOException e) {
    e.printStackTrace();
}
```
上面的JSON中包含了一个名为owner的数组属性和一个名为nestedObject的对象属性,不管是访问一个属性, 还是数组, 还是内嵌的对象, 都可以用JsonNode的get()方法. 为get()传入一个字符串就可以访问一个JsonNode实例的一个属性, 传入一个索引就是访问JsonNode实例代表的数组, 索引代表了你要访问的数组元素位置.