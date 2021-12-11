---
title: 泛型
tag: 
- 泛型
date: 2021-9-26 22:25:18
sidebar: true
categories: 泛型 java基础
---

## 介绍

泛型，抽象化参数类型。泛型只有在运行时才知道具体的类型。Java中的泛型，只存在于源码阶段，编译过后的Class文件并不存在泛型，虚拟机并不知道泛型的存在，所以说Java中的泛型是一种伪泛型，这种参数类型只存在于源码阶段在编译后并不存在的机制我们叫做泛型擦除。

## 泛型擦除

在编译完成以后，泛型会被擦除掉，变成Object类型。

## Java编译器的类型转换和类型检查

编译器会自动帮助我们添加类型转换的代码。
由于类型擦除可能导致一些异常问题，编译器需要做类型检查来尽量确保程序运行时不会抛出异常，所以可以看到在编写代码时，如果集合中的元素不满足泛型类型，就会报错。

## 通配符

上边界限定通配符，利用```<? extends Object>```形式的通配符可以实现泛型的向上转型。如此处，保证Object及其子类

下边界限定通配符,利用```<? super Object>``` 形式的通配符可以实现泛型的向下转型。如此处，保证Object及其父类。

无边界通配符 如 ```List<?>```，也就是没有任何限定。表示持有某种特定类型的List，但不知道具体是哪种类型。且不可以添加对象。