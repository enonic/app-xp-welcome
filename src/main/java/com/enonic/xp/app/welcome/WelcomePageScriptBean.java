package com.enonic.xp.app.welcome;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

import com.enonic.xp.app.Application;
import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.app.ApplicationService;
import com.enonic.xp.resource.Resource;
import com.enonic.xp.resource.ResourceKey;
import com.enonic.xp.resource.ResourceService;
import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;
import com.enonic.xp.web.servlet.ServletRequestHolder;
import com.enonic.xp.web.servlet.ServletRequestUrlHelper;

public class WelcomePageScriptBean
    implements ScriptBean
{
    private Supplier<ApplicationService> applicationServiceSupplier;

    private Supplier<ResourceService> resourceServiceSupplier;

    public Object getWebApps()
    {
        List<WebApplication> applications = new ArrayList<>();
        for ( Application application : applicationServiceSupplier.get().getInstalledApplications() )
        {
            if ( !application.isSystem() )
            {
                ApplicationKey applicationKey = application.getKey();
                Resource resource = resourceServiceSupplier.get().getResource( ResourceKey.from( applicationKey, "/webapp/webapp.js" ) );
                if ( resource != null && resource.exists() )
                {
                    String deploymentUrl =
                        ServletRequestUrlHelper.createUri( ServletRequestHolder.getRequest(), "/webapp/" + application.getKey() );
                    applications.add( WebApplication.create().application( application ).deploymentUrl( deploymentUrl + "/" ).build() );
                }
            }
        }
        return new WebApplicationsMapper( applications );
    }

    @Override
    public void initialize( final BeanContext beanContext )
    {
        this.applicationServiceSupplier = beanContext.getService( ApplicationService.class );
        this.resourceServiceSupplier = beanContext.getService( ResourceService.class );
    }
}
