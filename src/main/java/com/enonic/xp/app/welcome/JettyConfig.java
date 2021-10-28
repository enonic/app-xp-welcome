package com.enonic.xp.app.welcome;

public @interface JettyConfig
{
    /**
     * Host name.
     */
    String host();

    /**
     * Http xp port.
     */
    int http_xp_port() default 8080;

    /**
     * Http management port.
     */
    int http_management_port() default 4848;

    /**
     * Http monitor port.
     */
    int http_monitor_port() default 2609;
}
