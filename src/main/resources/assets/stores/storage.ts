import merge from 'lodash.merge';
import {MapStore} from 'nanostores';

import {normalize} from '../common/utils/text';

function putData<T>(storage: Storage, key: string, data: T): void {
  const value = JSON.stringify(data || {});
  storage.setItem(key, value);
}

function getData<T>(storage: Storage, key: string): T | Record<string, never> {
  const value = storage.getItem(key);
  return value ? JSON.parse(value) as T : {};
}

function syncWithStorage<T extends object>(storage: Storage, store: MapStore<T>, storeName: string): () => void {
    const storeKey = `enonic-welcome-${normalize(storeName)}`;

    const storeData = store.get();
    const localData = getData<T>(storage, storeKey);
    const mergedData = merge(storeData, localData);

    store.set(mergedData);

    return store.subscribe((data: T) => putData(storage, storeKey, data));
  }

export function syncWithLocalStorage<T extends object>(store: MapStore<T>, storeName: string): () => void {
  return syncWithStorage<T>(localStorage, store, storeName);
}

export function syncWithSessionStorage<T extends object>(store: MapStore<T>, storeName: string): () => void {
    return syncWithStorage<T>(sessionStorage, store, storeName);
  }
