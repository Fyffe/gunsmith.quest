import fs from "fs/promises";

export default abstract class Store<T> {
    version: number = 0;

    protected items: Map<string | number, T> = new Map<string | number, T>();

    abstract loadItems() : void;

    loadJsonData = async(path: string): Promise<string> => {
        return await fs.readFile(path, "utf-8");
    }

    addItem = (id: string | number, item: T) => {
        this.items.set(id, item);
    }

    addItems = (newItems : Map<string | number, T>) => {
        newItems.forEach((item: T, key: string | number)=> {
            this.items.set(key, item);
        });
    }

    getItem = (id: string | number) : T | null => {
        const item = this.items.get(id);
        return item ? item : null;
    }

    getAllItemIds = () : any[] => {
        return Array.from(this.items.keys());
    }

    getAllItems = () : T[] => {
        return Array.from(this.items.values());
    }
}