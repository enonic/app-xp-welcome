package com.enonic.xp.sdk.json;

import com.enonic.xp.project.Project;
import com.google.common.base.Preconditions;

public final class ProjectJson
{
    private final String name;

    private final String displayName;

    private final String description;

    private final String parent;

    private final String iconAsBase64;

    public ProjectJson( final Builder builder )
    {
        Preconditions.checkArgument( builder.project != null, "Project cannot be null." );
        Preconditions.checkArgument( builder.project.getName() != null, "Project name cannot be null." );

        this.name = builder.project.getName().toString();
        this.displayName = builder.project.getDisplayName();
        this.description = builder.project.getDescription();
        this.parent = builder.project.getParent() != null ? builder.project.getParent().toString() : null;
        this.iconAsBase64 = builder.iconAsBase64;
    }

    public String getName()
    {
        return name;
    }

    public String getDisplayName()
    {
        return displayName;
    }

    public String getDescription()
    {
        return description;
    }

    public String getParent()
    {
        return parent;
    }

    public String getIconAsBase64()
    {
        return iconAsBase64;
    }

    public static Builder create()
    {
        return new Builder();
    }

    public static class Builder
    {
        Project project;

        String iconAsBase64;

        public Builder project( final Project project )
        {
            this.project = project;
            return this;
        }

        public Builder iconAsBase64( final String iconAsBase64 )
        {
            this.iconAsBase64 = iconAsBase64;
            return this;
        }

        public ProjectJson build()
        {
            return new ProjectJson( this );
        }
    }
}
