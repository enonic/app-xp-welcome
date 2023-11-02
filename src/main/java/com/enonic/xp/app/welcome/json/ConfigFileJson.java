package com.enonic.xp.app.welcome.json;

import java.nio.file.Path;

public class ConfigFileJson
{
    private final String folder;

    private final String name;

    private final String path;

    public ConfigFileJson( final Path file )
    {
        this.folder = file.getParent().toAbsolutePath().toString();
        this.name = file.getFileName().toString();
        this.path = file.toAbsolutePath().toString();
    }

    public String getFolder()
    {
        return folder;
    }

    public String getName()
    {
        return name;
    }

    public String getPath()
    {
        return path;
    }
}
