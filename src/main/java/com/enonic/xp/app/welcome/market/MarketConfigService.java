package com.enonic.xp.app.welcome.market;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;

@Component(immediate = true, service = MarketConfigService.class, configurationPid = "com.enonic.xp.market")
public class MarketConfigService
{

    private final String graphqlUrl;

    @Activate
    public MarketConfigService( final MarketConfig marketConfig )
    {
        this.graphqlUrl = marketConfig.graphqlUrl();
    }

    public String getGraphqlUrl()
    {
        return graphqlUrl;
    }

}
