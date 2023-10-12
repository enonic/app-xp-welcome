package com.enonic.xp.app.welcome.market;

import java.util.function.Supplier;

import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;

public final class GetMarketConfigBean
    implements ScriptBean
{
    private Supplier<MarketConfigService> marketConfigSupplier;

    @Override
    public void initialize( final BeanContext context )
    {
        this.marketConfigSupplier = context.getService( MarketConfigService.class );
    }

    public String getGraphqlUrl()
    {
        if ( marketConfigSupplier.get() != null )
        {
            return marketConfigSupplier.get().getGraphqlUrl();
        }

        return MarketConfig.DEFAULT_GRAPHQL_URL;
    }
}
