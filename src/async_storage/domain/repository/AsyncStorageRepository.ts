export default interface AsyncStorageRepository {
  persist: (key: string, data: any) => Promise<void>;
  retrieve: (key: string) => Promise<any>;
}
