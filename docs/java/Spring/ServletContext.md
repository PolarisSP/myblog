---
title: ServletContext
tags: 
  - JavaWeb
  - ServletContext
  - Spring
sidebar: true
categories: JavaWeb
date: 2021-10-10 20:29:00
---


## 概述

说起ServletContext，一些人会产生误解，以为一个servlet对应一个ServletContext。其实不是这样的，事实是一个web应用对应一个ServletContext，所以ServletContext的作用范围是整个应用，明确这点很重要，这是基础中的基础。

为什么不起名叫WebContext或者ApplicationContext或者WebApplicationContext？这样见名知意多好。后来我想这也可能是有历史原因的：最初的客户端-服务端的架构模型非常简单，服务端运行着一些servlet用来处理客户端的请求。那个时候服务器很轻量级，运行一个应用，应用就由一堆servlet组成。所以这样简单的服务器也被称作servlet容器，主要作用就是运行servlet的。那么提供给应用的上下文就叫做ServletContext。

一个web应用对应一个ServletContext实例，这个实例是应用部署启动后，servlet容器为应用创建的。ServletContext实例包含了所有servlet共享的资源信息。通过提供一组方法给servlet使用，用来和servlet容器通讯，比如获取文件的MIME类型、分发请求、记录日志等。

这里需要注意一点，如果你的应用是分布式部署的，那么每台服务器实例上部署的应用实例都各自拥有一个ServletContext实例。

![ServletContext](/myblog/images/spring/ServletContext.webp)

## 源码分析

```java
public interface ServletContext {
    public String getContextPath();

    public ServletContext getContext(String uripath);

    public int getMajorVersion();
    public int getMinorVersion();
    public int getEffectiveMajorVersion();
    public int getEffectiveMinorVersion();
    
    public String getServerInfo();
    public String getServletContextName();

    public String getMimeType(String file);
    
    public void log(String msg);
    public void log(String message, Throwable throwable);

    public Set<String> getResourcePaths(String path);
 
    public URL getResource(String path) throws MalformedURLException;
    public InputStream getResourceAsStream(String path);
    
    public RequestDispatcher getRequestDispatcher(String path);
    public RequestDispatcher getNamedDispatcher(String name);

    public String getRealPath(String path);

    public String getInitParameter(String name);
    public Enumeration<String> getInitParameterNames();
    public boolean setInitParameter(String name, String value);

    public Object getAttribute(String name);
    public Enumeration<String> getAttributeNames();
    public void setAttribute(String name, Object object);
    public void removeAttribute(String name);

    // 省略servlet3.0及3.1规范定义的方法
}
```
1.1 getContextPath

方法返回web应用的上下文路径。就是我们部署的应用的根目录名称。拿Tomcat举例，我们在webapps部署了应用demo。那么方法返 回"/demo"。如果是部署在ROOT下，那么方法返回空字符串""。这里的路径可以再server.xml里面修改，比如我们的demo应用路径修改 为"/test"：

1.2 getContext

方法入参为uriPath（String），是一个资源定位符的路径。返回一个ServletContext实例。我们说过一个web应用对应一个ServletContext实例，那么这个方法根据资源的路径返回其servlet上下文。

比如说我们当前应用是demo，这个时候我们要访问servlet容器中的另外一个应用test中的资源index.jsp，假使资源的路径为/test/index.jsp。那么我们就可用通过调用getContext("/test/index.jsp")去获取test应用的上下文。如果在servlet容器中找不到该资源或者该资源限制了外部的访问，那么方法返回null。（这个方法一般配合RequestDispatcher使用，实现请求转发）。

1.3 getResource和getResourceAsStream

getResource将指定路径的资源封装成URL实例并返回，getResourceAsStream获取指定路径资源的输入流InputStream并返回。关于URL和InputStream的解释和使用，不在本篇博文的关注点。
这里和上面一样，资源的路径以"/"开头，这个路径是相对于应用上下文根目录或者相对于/WEB-INF/lib目录下的各个JAR包里面的/META-INF/resources目录。在搜索资源的时候，servlet容器先是从应用上下文根目录下搜索再从JAR文件搜索，对于JAR文件的搜索顺序（哪个JAR先，哪个JAR后），servlet规范没有规定。


## ServletContext

主要的相关设置存在有web.xml中。
ServletContext是容器和应用沟通的桥梁，从一定程度上讲ServletContext就是servlet规范的体现。

ContextLoaderListener实现了ServletContextListener这个接口,在web.xml配置这个监听器，启动容器时，就会自动执行它实现的contextInitialized()方法。在ServletContextListener中的核心逻辑便是初始化WebApplicationContext实例并存放至ServletContext中。

## Servlet的初始化

web.xml中的Servlet是如何初始化的呢？

1. Servlet容器启动，为应用创建一个全局上下文环境：ServletContext对象
2. 容器通过web.xml中的ContextLoaderListener监听器来创建一个WebApplicationContext上下文环境对象（IOC容器）加载context-param中指定的配置文件信息到WebApplicationContext对象中，该对象在ServletContext中是以键值对的形式保存的。
3. 容器初始化web.xml中配置的servlet，为其初始化自己的上下文信息servletContext，并加载其设置的配置信息到该上下文中。将WebApplicationContext设置为它的父容器。
4. 此后的所有servlet的初始化都按照3步中方式创建，初始化自己的上下文环境，将WebApplicationContext设置为自己的父上下文环境。

![ServletContext和WebApplicationContext](/myblog/images/spring/ServletContextAndEveryContext.png)

通过上面的图很清楚的了解到：

1. ServletContext是全局环境：里面包含了其他的上下文环境对象通过键值对的形式保存。
2. WebApplicationContext是所有Servlet的父环境：**也就是当Spring在执行getBean时，如果在自己的context（上下文环境）中找不到，那么就会去父类中的context寻找。（反过来就不行！）**,这也解释了为什么我们可以在DispatcherServlet中获取到由ContextLoaderListener对应的ApplicationContext中的bean。
