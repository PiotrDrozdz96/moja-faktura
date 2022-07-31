import YourData from '../types/yourData';

const storagePrefix = 'invoice-';

type StorageDataMap = {
  yourData: YourData;
};

type StorageKey = keyof StorageDataMap;

const jsonDataKeys: StorageKey[] = ['yourData'];

class Storage {
  async getItem<K extends StorageKey>(key: K): Promise<StorageDataMap[K] | null> {
    const value = await OfficeRuntime.storage.getItem(`${storagePrefix}${key}`);
    if (value && jsonDataKeys.includes(key)) {
      return JSON.parse(value);
    }
    return value as null;
  }

  async setItem<K extends StorageKey>(key: K, value: StorageDataMap[K]): Promise<void> {
    return OfficeRuntime.storage.setItem(
      `${storagePrefix}${key}`,
      jsonDataKeys.includes(key) ? JSON.stringify(value) : (value as unknown as string)
    );
  }

  async removeItem(key: StorageKey): Promise<void> {
    return OfficeRuntime.storage.removeItem(`${storagePrefix}${key}`);
  }
}

const storage = new Storage();

export default storage;
