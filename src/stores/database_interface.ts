import Store from "@stores/store";
import Trader from "@models/trader";
import Item from "@models/item";
import QuestPart from "@models/quest_part";
import Task from "@models/task";
import SearchItem from "@models/search_item";

class DatabaseInterface {
    tradersStore : Store<Trader> = <Store<Trader>>{};
    tasksStore : Store<Task> = <Store<Task>>{};
    itemsStore : Store<Item> = <Store<Item>>{};
    questPartsStore : Store<QuestPart> = <Store<QuestPart>>{};
    searchStore : Store<SearchItem> = <Store<SearchItem>>{};
}

let database : DatabaseInterface = new DatabaseInterface();

export { database }