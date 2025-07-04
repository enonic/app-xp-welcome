package com.enonic.xp.sdk.market;

import java.net.URI;
import java.net.URISyntaxException;
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
        String marketUrl = null;
        if ( marketConfigSupplier.get() != null )
        {
            marketUrl = marketConfigSupplier.get().getGraphqlUrl();
        }

        return marketUrl != null ? marketUrl : MarketConfig.DEFAULT_GRAPHQL_URL;
    }

    public String getMarketUrl()
    {
        final String graphqlUrl = getGraphqlUrl();
        try
        {
            URI url = new URI( graphqlUrl );
            String urlString = url.getScheme() + "://" + url.getHost();
            if ( url.getPort() > -1 )
            {
                urlString += ":" + url.getPort();
            }
            return urlString;
        }
        catch ( URISyntaxException e )
        {
            throw new RuntimeException( e );
        }
    }
}
