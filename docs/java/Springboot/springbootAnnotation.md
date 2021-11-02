---
title: Springboot注解
tag:
 - Springboot
 - 注解
sidebar: true
categories: Springboot
date: 2021-10-10 19:01:00
---

## @AutoWired

此注解常见于属性上，当其在方法上时，Spring容器在加载完成以后，就会去容器中寻找该方法参数中需要的入参，并将值赋给它，然后自动执行一次方法。

## @ConditionalOnBean(Bean.class)

此注解表示，如果容器中有此Bean，则注入该Bean。

## @ConfigurationProperties

一般作用在配置类上，使用此注解可以注入配置文件中的配置，只需要配置项的最后一个名字与配置类中的属性名一直即可自动注入。

## @ConditionalOnProperty

在spring boot中有时候需要控制配置类是否生效,可以使用@ConditionalOnProperty注解来控制@Configuration是否生效.
```java
@Configuration
@ConditionalOnProperty(prefix = "filter",name = "loginFilter",havingValue = "true")
public class FilterConfig {
	//prefix为配置文件中的前缀,
	//name为配置的名字
	//havingValue是与配置的值对比值,当两个值相同返回true,配置类生效.
    @Bean
    public FilterRegistrationBean getFilterRegistration() {
        FilterRegistrationBean filterRegistration  = new FilterRegistrationBean(new LoginFilter());
        filterRegistration.addUrlPatterns("/*");
        return filterRegistration;
    }
}
```