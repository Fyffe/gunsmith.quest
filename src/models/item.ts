import ItemTrader from "./item_trader";

export default interface Item {
    slug: string;
    name: string;
    icon: string;
    traders: ItemTrader[];
    link: string;
}