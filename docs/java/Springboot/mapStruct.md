---
title: 对象拷贝
tag:
    - MapStruct
sidebar: true
categories: 对象拷贝
date: 2021-10-24 22:01:00
---

## 概述

日常工作中，在参数传递时，需要把入参的DTO转换为PO存入数据库，在返回前端时，又需要将PO转化为VO。

## 深拷贝与浅拷贝
java在方法传递参数时，是将变量复制一份，然后传入方法体去执行。
首先在java中有两种数据类型，即基本数据类型和引用数据类型。基本数据类型入参，属于值传递，即会开辟一个内存空间，复制源值到此空间给函数，引用类型属于引用传递，入参时会开辟一个新的内存空间，将原来的引用地址放到这个新的内存空间传递给函数（其实本质上也是一种值传递）。

浅拷贝：只是增加了一个指针指向已存在的内存地址
深拷贝：深拷贝（deepCopy）是增加了一个指针并且申请了一个新的内存，使这个增加的指针指向这个新的内存

浅拷贝：仅仅是指向被复制的内存地址，如果原地址发生改变，那么浅复制出来的对象也会相应的改变。
深拷贝：在计算机中开辟一块新的内存地址用于存放复制的对象。

浅拷贝：
①对于数据类型是基本数据类型的成员变量，浅拷贝会直接进行值传递，也就是将该属性值复制一份给新的对象。因为是两份不同的数据，所以对其中一个对象的该成员变量值进行修改，不会影响另一个对象拷贝得到的数据。
②对于数据类型是引用数据类型的成员变量，比如说成员变量是某个数组、某个类的对象等，那么浅拷贝会进行引用传递，也就是只是将该成员变量的引用值（内存地址）复制一份给新的对象。因为实际上两个对象的该成员变量都指向同一个实例。在这种情况下，在一个对象中修改该成员变量会影响到另一个对象的该成员变量值。

深拷贝：深拷贝对引用数据类型的成员变量的对象图中所有的对象都开辟了内存空间；而浅拷贝只是传递地址指向，新的对象并没有对引用数据类型创建内存空间。


常用的工具大概有以下几种：
1. Apache BeanUtils 
2. Spring BeanUtils
3. cglib BeanCopier
4. Hutool BeanUtil
5. Mapstruct
6. Dozer

### BeanUtils

只能同属性映射，或者在属性相同的情况下，允许被映射的对象属性少；但当遇到被映射的属性数据类型被修改或者被映射的字段名被修改，则会导致映射失败。 使用的是浅拷贝
强制避免使用apache BeanUtils进行拷贝，建议使用Spring BeanUtils或下面要介绍的BeanCopier。主要原因还是在于Spring并没有与 apache一样对反射做了过多校验，另外Spring BeanUtils内部使用了缓存，加快转换的速度。

### MapStruct

spring和apache，hutool使用的都是反射，cglib是基于字节码文件的操作，都是在都代码运行期间动态执行的，但是Mapstruct不同，它在编译期间就生成了 Bean属性复制的代码，运行期间就无需使用反射或者字节码技术，所以具有很高的性能。 使用的是深拷贝。
1. 引入依赖 
```java
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct-jdk8</artifactId>
    <version>1.3.0.Final</version>
</dependency>
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct-processor</artifactId>
    <version>1.3.0.Final</version>
</dependency>
```
2. 写接口实现:
```java
@Mapper
public interface ConvertMapper {
    OrderDTO po2Dto(OrderPO orderPO);
}
```
3. 使用
```java
ConvertMapper mapper = Mappers.getMapper(ConvertMapper.class);
OrderDTO orderDTO=mapper.po2Dto(orderPO);
```
::: tip
@Mapper 注解的 componentModel 属性
default: 这是默认的情况，mapstruct 不使用任何组件类型, 可以通过Mappers.getMapper(Class)方式获取自动生成的实例对象。
cdi: the generated mapper is an application-scoped CDI bean and can be retrieved via @Inject
spring: 生成的实现类上面会自动添加一个@Component注解，可以通过Spring的 @Autowired方式进行注入
jsr330: 生成的实现类上会添加@javax.inject.Named 和@Singleton注解，可以通过 @Inject注解获取



可以实现双向转换，功能跟BeanUtils一样，在属性数量不一致时，只能多的转少的。

### 复杂情况
1. 当映射的属性类型不一致时
自动进行类型转换的情况下：
1、基本类型及其他们对应的包装类型。
此时 mapstruct 会自动进行拆装箱。不需要人为的处理
2、基本类型的包装类型和string类型之间

```java
    @Mappings({
            @Mapping(target = "createTime", expression = "java(com.java.mmzsblog.util.DateTransform.strToDate(source.getCreateTime()))"),
    })
    UserVO3 toConvertVO3(User source);

    User fromConvertEntity3(UserVO3 userVO3);
```

2. 名字不一致的情况
```java
@Mappings({
            @Mapping(source = "id", target = "userId"),
            @Mapping(source = "name", target = "userName")
    })
```

3. 枚举类型 属性和名字不一样

```java
@Mapping(source = "userTypeEnum", target = "type")
```




