package com.enonic.xp.app.welcome;

import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class StoreBean
{
    private static final ConcurrentMap<String, Map<String, Object>> store = new ConcurrentHashMap<>();

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
        return store.values().stream().filter( val -> Objects.equals( url, val.get( "url" ) ) ).findAny().orElse( null );
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
