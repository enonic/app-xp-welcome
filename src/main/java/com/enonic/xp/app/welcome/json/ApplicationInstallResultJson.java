package com.enonic.xp.app.welcome.json;

public class ApplicationInstallResultJson
{
    private ApplicationJson application;

    private String failure;

    public String getFailure()
    {
        return failure;
    }

    public void setFailure( final String failure )
    {
        this.failure = failure;
    }

    public ApplicationJson getApplication()
    {
        return application;
    }

    public void setApplication( final ApplicationJson applicationJson )
    {
        this.application = applicationJson;
    }
}
