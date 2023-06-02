package com.enonic.xp.app.welcome.json;

import com.enonic.xp.project.Project;
import com.google.common.base.Preconditions;

public final class ProjectJson
{
    private final String name;

    private final String displayName;

    private final String description;

    private final String parent;

    public ProjectJson( final Project project )
    {
        Preconditions.checkArgument( project != null, "Project cannot be null." );
        Preconditions.checkArgument( project.getName() != null, "Project name cannot be null." );

        this.name = project.getName().toString();
        this.displayName = project.getDisplayName();
        this.description = project.getDescription();
        this.parent = project.getParent() != null ? project.getParent().toString() : null;
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
}
