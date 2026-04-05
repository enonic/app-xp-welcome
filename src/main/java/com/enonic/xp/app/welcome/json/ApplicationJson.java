package com.enonic.xp.app.welcome.json;

import java.util.ArrayList;
import java.util.List;

public class ApplicationJson
{
    private final String key;

    private final String version;

    private final String title;

    private final String description;

    private final String url;

    private final String webappUrl;

    private final List<String> adminToolsUrls;

    private final String iconAsBase64;

    private ApplicationJson( final Builder builder )
    {
        this.key = builder.key;
        this.version = builder.version;
        this.title = builder.title;
        this.description = builder.description;
        this.url = builder.url;
        this.webappUrl = builder.webappUrl;
        this.adminToolsUrls = builder.adminToolsUrls;
        this.iconAsBase64 = builder.iconAsBase64;
    }

    public String getKey()
    {
        return key;
    }

    public String getVersion()
    {
        return version;
    }

    public String getTitle()
    {
        return title;
    }

    public String getDescription()
    {
        return description;
    }

    public String getUrl()
    {
        return url;
    }

    public String getIconAsBase64()
    {
        return iconAsBase64;
    }

    public String getWebappUrl()
    {
        return webappUrl;
    }

    public List<String> getAdminToolsUrls()
    {
        return adminToolsUrls;
    }

    public static Builder create()
    {
        return new Builder();
    }

    public static class Builder
    {
        String key;

        String version;

        String title;

        String url;

        String webappUrl;

        List<String> adminToolsUrls;

        String description;

        String iconAsBase64;

        private Builder()
        {
            this.adminToolsUrls = new ArrayList<String>();
        }

        public Builder key( final String key )
        {
            this.key = key;
            return this;
        }

        public Builder version( final String version )
        {
            this.version = version;
            return this;
        }

        public Builder title( final String title )
        {
            this.title = title;
            return this;
        }

        public Builder url( final String url )
        {
            this.url = url;
            return this;
        }

        public Builder webappUrl( final String webappUrl )
        {
            this.webappUrl = webappUrl;
            return this;
        }

        public Builder addAdminToolsUrl( final String adminToolsUrl )
        {
            this.adminToolsUrls.add( adminToolsUrl );
            return this;
        }

        public Builder description( final String description )
        {
            this.description = description;
            return this;
        }

        public Builder iconAsBase64( final String iconAsBase64 )
        {
            this.iconAsBase64 = iconAsBase64;
            return this;
        }

        public ApplicationJson build()
        {
            return new ApplicationJson( this );
        }
    }
}
