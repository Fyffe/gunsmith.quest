import Store from "./store";
import Item from "@models/item";
import path from "path";
import {database} from "@stores/database_interface";
import ItemTrader from "@models/item_trader";
import config from "@config/config";

const ITEMS_PATH : string = path.resolve(path.join(config.gameDataPath, "items.json"));

export default class ItemsStore extends Store<Item> {

    async loadItems(): Promise<boolean> {
        const json: string = await this.loadJsonData(ITEMS_PATH);
        const jsonData: any = JSON.parse(json);

        this.version = jsonData.version;

        jsonData.items.forEach((item: any) => {
            let itemTraders : ItemTrader[] = [];

            item.traders.forEach((trader: any) => {
                let itemTrader : ItemTrader = <ItemTrader>{
                    trader: database.tradersStore.getItem(trader.slug),
                    loyalty: trader.loyalty,
                    task: trader.task,
                    isBarter: trader.isBarter
                };

                itemTraders.push(itemTrader);
            })

            let newItem : Item = <Item>{
                slug: item.slug,
                name: item.name,
                icon: typeof item.icon != "undefined" && item.icon ? item.icon : this.getDefaultIconUrl(item.slug),
                link: item.link,
                traders: itemTraders
            };

            this.addItem(item.slug, newItem);
        });

        return true;
    }

    getDefaultIconUrl(itemSlug: string): string {
        return `${config.iconDefaultPath}${itemSlug}${config.iconDefaultType}`;
    }
}