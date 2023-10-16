package com.enonic.xp.app.welcome;

import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;

public class StoreBean
    implements ScriptBean
{
    private static final ConcurrentMap<String, Map<String, Object>> store = new ConcurrentHashMap<>();

    @Override
    public void initialize( final BeanContext context )
    {

    }

    public void put( String key, Map<String, Object> value )
    {
        store.put( key, value );
    }

    public Map<String, Object> get( String key )
    {
        return store.get( key );
    }

    public Map<String, Object> getByUrl( String url )
    {
        return store.values().stream().filter( ( Map<String, Object> val ) -> {
            Object urlVal = val.get( "url" );
            String urlString = urlVal != null ? urlVal.toString() : null;
            return Objects.equals( url, urlString );
        } ).findFirst().orElse( null );
    }

    public void remove( String key )
    {
        store.remove( key );
    }

    public void clear()
    {
        store.clear();
    }

    public int size()
    {
        return store.size();
    }
}
