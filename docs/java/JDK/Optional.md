---
title: Optional
tag:
    - Optional
    - JDK8
    - JDK8新特性
    - 判空
date: 2021-9-25 23:32:00
sidebar: true
categories: JDK8
---

## 介绍

Optional是jdk8引入的新特性。在此之前，程序员们对于调用方法的返回值需要判空，这种需要判断的地方是非常多的。如:
```java
if(obj != null) {
    ...
}
```
这种判空方式是十分不优雅的，看着代码就十分冗余，所以可以尝试使用Optional来包装方法的返回值，当调用方调用时，直接使用Optional的API方法进行优雅的处理。

## Optional API

### empty()

此方法是返回一个空的Optional对象

### of()

此方法传入需要包装的对象，返回一个带有包装对象的Optional对象。需要注意的是，此方法如何传入的对象为null，是会抛出异常的。

### ofNullable()

此方法传入需要包装的对象，返回一个带有包装对象的Optional对象。 需要注意的是，传入的对象可以为null，也可以不为null，这就是它与of()的区别

### isPersent()

此方法是用来判断Optional对象是否为null的，如何不为null则返回true，否则返回flase。

### ifPersent()

此方法传入一个函数接口，当Optional对象不为null时执行此方法。

### orElse()

此方法传入一个函数接口，当Optional为null时，返回此值，否则正常返回Optional对象。 

### orElseGet()

此方法传入一个函数接口，当Optional为null时，返回此值，否则正常返回Optional对象。 

::: tip
需要特别注意，orElse()中的函数无论Optinal的包装对象是否为null，都会执行，orElseGet()只有当Optional的包装对象为null时，才执行，类似于懒加载。
在日常实践中，如何传入的是需要执行的函数而不是值，则最好使用orElseGet()
:::

### orElseThrow()

此方法传入一个异常，当Optinal包装的对象为null时，则抛出指定的异常。

### get()

此方法获取Optinal中的对象。但不要直接使用他，如果Optinal为空，他就会抛出```NoSuchElementException```异常。

### filter()

此方法传入一个函数式接口，接口返回```Boolean```类型参数，用于对Optional对象进行过滤。

### map()

此方法传入一个函数式接口，用于对Optional对象进行值变换。

### flatMap()

此方法传入一个函数式接口，用于对Optional对象进行值变换。他与map()不同的是参数为stream类型的。

::: warning
Optional 一般使用在返回类型中
:::