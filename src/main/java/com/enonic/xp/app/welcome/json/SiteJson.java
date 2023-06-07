package com.enonic.xp.app.welcome.json;

public class SiteJson
{
    private final String id;

    private final String name;

    private final String displayName;

    private final String projectName;

    private final String repositoryName;

    private final String path;

    private final String language;

    private final Boolean hasDraft;

    private final Boolean hasMaster;

    private SiteJson( Builder builder )
    {
        this.id = builder.id;
        this.name = builder.name;
        this.displayName = builder.displayName;
        this.projectName = builder.projectName;
        this.repositoryName = builder.repositoryName;
        this.path = builder.path;
        this.language = builder.language;
        this.hasDraft = builder.hasDraft;
        this.hasMaster = builder.hasMaster;
    }

    public String getId()
    {
        return id;
    }

    public String getName()
    {
        return name;
    }

    public String getDisplayName()
    {
        return displayName;
    }

    public String getProjectName()
    {
        return projectName;
    }

    public String getRepositoryName()
    {
        return repositoryName;
    }

    public String getPath()
    {
        return path;
    }

    public String getLanguage()
    {
        return language;
    }

    public Boolean hasDraft()
    {
        return hasDraft;
    }

    public Boolean hasMaster()
    {
        return hasMaster;
    }

    public static Builder create()
    {
        return new Builder();
    }

    public static class Builder
    {
        String id;

        String name;

        String displayName;

        String projectName;

        String repositoryName;

        String path;

        String language;

        Boolean hasDraft;

        Boolean hasMaster;

        public Builder id( final String id )
        {
            this.id = id;
            return this;
        }

        public Builder name( final String name )
        {
            this.name = name;
            return this;
        }

        public Builder displayName( final String displayName )
        {
            this.displayName = displayName;
            return this;
        }

        public Builder projectName( final String projectName )
        {
            this.projectName = projectName;
            return this;
        }

        public Builder repositoryName( final String repositoryName )
        {
            this.repositoryName = repositoryName;
            return this;
        }

        public Builder path( final String path )
        {
            this.path = path;
            return this;
        }

        public Builder language( final String language )
        {
            this.language = language;
            return this;
        }

        public Builder hasDraft( final Boolean hasDraft )
        {
            this.hasDraft = hasDraft;
            return this;
        }

        public Builder hasMaster( final Boolean hasMaster )
        {
            this.hasMaster = hasMaster;
            return this;
        }

        public SiteJson build()
        {
            return new SiteJson( this );
        }
    }
}
