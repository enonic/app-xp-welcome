package com.enonic.xp.app.welcome.json;

import java.util.ArrayList;
import java.util.List;

import com.enonic.xp.app.Application;

public class ApplicationJson
{
    private final String key;

    private final String version;

    private final String displayName;

    private final String description;

    private final String url;

    private final String webappUrl;

    private final List<String> adminToolsUrls;

    private final String iconAsBase64;

    private ApplicationJson( final Builder builder )
    {
        this.key = builder.application.getKey().toString();
        this.version = builder.application.getVersion().toString();
        this.displayName = builder.application.getDisplayName();
        this.description = builder.description;
        this.url = builder.application.getUrl();
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

    public String getDisplayName()
    {
        return displayName;
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
        Application application;

        String webappUrl;

        List<String> adminToolsUrls;

        String description;

        String iconAsBase64;

        private Builder()
        {
            this.adminToolsUrls = new ArrayList<String>();
        }

        public Builder application( final Application application )
        {
            this.application = application;
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
