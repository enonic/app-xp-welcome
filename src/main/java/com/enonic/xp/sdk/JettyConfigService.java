package com.enonic.xp.sdk;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;

@Component(immediate = true, configurationPid = "com.enonic.xp.web.jetty", service = JettyConfigService.class)
public class JettyConfigService
{
    private final JettyConfig jettyConfig;

    @Activate
    public JettyConfigService( final JettyConfig jettyConfig )
    {
        this.jettyConfig = jettyConfig;
    }

    public String getHost()
    {
        return jettyConfig.host();
    }

    public int getHttpXpPort()
    {
        return jettyConfig.http_xp_port();
    }

    public int getHttpManagementPort()
    {
        return jettyConfig.http_management_port();
    }

    public int getHttpMonitorPort()
    {
        return jettyConfig.http_monitor_port();
    }
}
