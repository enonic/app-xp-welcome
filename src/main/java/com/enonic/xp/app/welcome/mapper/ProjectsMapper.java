package com.enonic.xp.app.welcome.mapper;

import java.util.List;

import com.enonic.xp.project.Project;
import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public class ProjectsMapper
    implements MapSerializable
{
    private final List<Project> projects;

    public ProjectsMapper( final List<Project> projects )
    {
        this.projects = projects;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        gen.array( "projects" );
        projects.forEach( project -> {
            gen.map();
            gen.value( "name", project.getName() );
            gen.value( "displayName", project.getDisplayName() );
            gen.value( "description", project.getDescription() );
            gen.value( "parent", project.getParent() );
            gen.end();
        } );
        gen.end();
    }
}
