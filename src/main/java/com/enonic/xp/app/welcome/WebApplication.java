package com.enonic.xp.app.welcome;

import com.enonic.xp.app.Application;

public class WebApplication
{
    private final String key;

    private final String version;

    private final String displayName;

    private final String url;

    private final String deploymentUrl;

    private final String iconAsBase64;

    private WebApplication( final Builder builder )
    {
        this.key = builder.application.getKey().toString();
        this.version = builder.application.getVersion().toString();
        this.displayName = builder.application.getDisplayName();
        this.url = builder.application.getUrl();
        this.deploymentUrl = builder.developmentUrl;
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

    public String getUrl()
    {
        return url;
    }

    public String getIconAsBase64()
    {
        return iconAsBase64;
    }

    public String getDeploymentUrl()
    {
        return deploymentUrl;
    }

    public static Builder create()
    {
        return new Builder();
    }

    public static class Builder
    {
        Application application;

        String developmentUrl;

        String iconAsBase64;

        public Builder application( final Application application )
        {
            this.application = application;
            return this;
        }

        public Builder deploymentUrl( final String developmentUrl )
        {
            this.developmentUrl = developmentUrl;
            return this;
        }

        public Builder iconAsBase64( final String iconAsBase64 )
        {
            this.iconAsBase64 = iconAsBase64;
            return this;
        }

        public WebApplication build()
        {
            return new WebApplication( this );
        }
    }
}
