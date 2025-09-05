import Store from "./store";
import Trader from "@models/trader";
import path from "path";
import config from "@config/config";

const TRADERS_PATH : string = path.resolve(path.join(config.gameDataPath, "traders.json"));

export default class TradersStore extends Store<Trader> {

    async loadItems(): Promise<boolean> {

        const json: string = await this.loadJsonData(TRADERS_PATH);
        const jsonData: any = JSON.parse(json);

        this.version = jsonData.version;

        jsonData.traders.forEach((value: any) => {
            this.addItem(value.slug, value as Trader);
        })

        return true;
    }
}