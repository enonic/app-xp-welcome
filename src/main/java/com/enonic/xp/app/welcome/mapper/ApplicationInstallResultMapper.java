package com.enonic.xp.app.welcome.mapper;

import com.enonic.xp.app.welcome.json.ApplicationInstallResultJson;
import com.enonic.xp.app.welcome.json.ApplicationJson;
import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public class ApplicationInstallResultMapper
    implements MapSerializable
{
    private final ApplicationInstallResultJson result;

    public ApplicationInstallResultMapper( final ApplicationInstallResultJson result )
    {
        this.result = result;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        gen.value( "failure", result.getFailure() );
        final ApplicationJson app = result.getApplication();
        if ( app != null )
        {
            gen.map( "application" );
            gen.value( "applicationKey", app.getKey() );
            gen.value( "displayName", app.getDisplayName() );
            gen.value( "description", app.getDescription() );
            gen.value( "version", app.getVersion() );
            gen.value( "url", app.getUrl() );
            gen.value( "deploymentUrl", app.getWebappUrl() );
            gen.value( "adminToolsUrls", app.getAdminToolsUrls() );
            gen.value( "icon", app.getIconAsBase64() );
            gen.end();
        }
    }
}
