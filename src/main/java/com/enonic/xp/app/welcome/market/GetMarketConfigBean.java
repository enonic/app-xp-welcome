package com.enonic.xp.app.welcome.market;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
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

    public String getMarketUrl()
    {
        final String graphqlUrl = getGraphqlUrl();
        try
        {
            URL url = new URI( graphqlUrl ).toURL();
            String urlString = url.getProtocol() + "://" + url.getHost();
            if ( url.getPort() > -1 )
            {
                urlString += ":" + url.getPort();
            }
            return urlString;
        }
        catch ( MalformedURLException | URISyntaxException e )
        {
            throw new RuntimeException( e );
        }
    }
}
