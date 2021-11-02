---
title: 过滤器和拦截器
tag:
    - 过滤器
    - 拦截器
sidebar: true
categories: 过滤器 拦截器 Springboot
date: 2021-9-29 23:01:00
---

## 图解

![过滤器拦截器图解](/myblog/images/springboot/Filter/IntertrepterAndFilter.jpg)

## 区别

1. 触发时机不一样，过滤器在请求进入容器后且进入Servlet之前进行预处理的，请求结束返回也是，是在Servlet处理完后且返回给前端之前。
2. 拦截器作为Spring容器中的Bean，它可以获取IOC容器中的各种bean，可以注入依赖，调用业务逻辑。 过滤器只需依赖Servlet API，不需要依赖Spring。
3. 过滤器的实现是基于回调函数。而拦截器(代理模式)的实现基于反射。
4. 过滤器是依赖于Servlet容器，属于Servlet规范的一部分，而拦截器则是独立存在的，可以在任何情况下使用。
5. 过滤器的执行由Servlet容器回调完成，而拦截器通常通过动态代理(反射)的方式来进行的。
6. Filter的生命周期由Servlet容器管理，而拦截器则可以通过IOC容器来管理，拦截器可以通过注入等方式来获取其他Bean的实例，使用更加方便。

::: tip
过滤器可以修改request，而拦截器不可以。(可以筛选出你需要的东西，如request中你需要的那部分)
过滤器需要在Servlet容器中实现，拦截器适用于各种环境。
拦截器可以注入依赖，而过滤器不能。
过滤器只能在请求的前后使用，二拦截器可以详细到每个方法。

:::

## 流程图

![过滤器拦截器流程图](/myblog/images/springboot/Filter/FilterAndIntercepterFlatChart.jpg)

过滤器(Filter):可以拿到原始的http请求，但是无法获取你请求的控制器和请求的控制器中的方法的信息。

拦截器(Interceptor):可以拿到你请求的控制器和方法，却拿不到请求方法的参数。

切片(Aspect):可以拿到方法的参数，但是却拿不到http请求和响应的对象。


![过滤器拦截器信息获取](/myblog/images/springboot/Filter/FilterAndIntercepterGetInfo.jpg)


## 实战

### 过滤器

两种方式:
    1. 使用Springboot提供的FilterRegistrationBean注册Filter
    2. 使用原生Servlet注解定义Filter
    两种方式的本质都是一样的，都是去FilterRegistrationBean注册自定义Filter

方式一:
    1. 实现Filter接口
    2. 注册自定义Filter实现类到FilterRegistrationBean

方式二:
    1. 在自定义Filter实现类上加注解```@WebFilter```
    2. 在启动类中加注解```@ServletComponetScan```,指定扫描的包。

### 拦截器

1. 可以通过继承```HandlerInterceptorAdapter```类也可以通过实现```HandlerInterceptor```接口。
2. 需要配置类继承```WebMVCConfigurerAdapter```类，引入自定义拦截器。

preHandle是请求执行前执行的，postHandler是请求结束执行的，但只有preHandle方法返回true的时候才会执行，afterCompletion是视图渲染完成后才执行，同样需要preHandle返回true，该方法通常用于清理资源等工作。
继承了WebMVCConfigurerAdapter，重写addInterceptors这个方法，进行拦截器的配置，主要配置项就两个，一个是指定拦截器，第二个是指定拦截的URL。

## 应用场景

拦截器是在DispatcherServlet这个servlet中执行的，因此所有的请求最先进入Filter，最后离开Filter。其顺序如下:

Filter->Interceptor.preHandle->Handler->Interceptor.postHandle->Interceptor.afterCompletion->Filter

### 拦截器应用场景

拦截器本质上是面向切面编程（AOP），符合横切关注点的功能都可以放在拦截器中来实现，主要的应用场景包括：

 - 登录验证，判断用户是否登录。
 - 权限验证，判断用户是否有权限访问资源，如校验token
 - 日志记录，记录请求操作日志（用户ip，访问时间等），以便统计请求访问量。
 - 处理cookie、本地化、国际化、主题等。
 - 性能监控，监控请求处理时长等。
 - 通用行为：读取cookie得到用户信息并将用户对象放入请求，从而方便后续流程使用，还有如提取Locale、Theme信息等，只要是多个处理器都需要的即可使用拦截器实现）

### 过滤器应用场景

 - 过滤敏感词汇（防止sql注入）
 - 设置字符编码
 - URL级别的权限访问控制
 - 压缩响应信息

![Java三大利器——过滤器、拦截器、监听器的对比](/myblog/images/springboot/Filter/Java_Three_weapon.jpg)

## 补充

OncePerRequestFilter是Springboot中对javax.servlet.filter原生接口的实现。实际上是一个实现了Filter接口的抽象类，Spring对Filter进行了一些封装处理。它能确保在一次请求中只通过一次filter，而不需要重复执行。
OncePerRequestFilter是在一次外部请求中只过滤一次。对于服务器内部之间的forward等请求，不会再次执行过滤方法。实现Filter接口，也会在一次请求中只过滤一次(servlet2.4及以后就不会多次过滤了), 实际上，OncePerRequestFilter是为了兼容不同的web 容器，也就是说其实不是所有的容器都过滤一次。Servlet版本不同，执行的过程也不同。 一般推荐使用此方式进行Filter过滤。