import TradersStore from "@stores/traders_store";
import ItemsStore from "@stores/items_store";
import {database} from "@stores/database_interface";
import QuestPartsStore from "@stores/quest_parts_store";
import TasksStore from "@stores/tasks_store";
import SearchStore from "@stores/search_store";

const tradersStore = new TradersStore();
const tasksStore = new TasksStore();
const itemsStore = new ItemsStore();
const questPartsStore = new QuestPartsStore();
const searchStore = new SearchStore();

async function createStores() : Promise<boolean> {
    await tradersStore.loadItems();

    database.tradersStore = tradersStore;

    await tasksStore.loadItems();

    database.tasksStore = tasksStore;

    await itemsStore.loadItems();

    database.itemsStore = itemsStore;

    await questPartsStore.loadItems();

    database.questPartsStore = questPartsStore;

    await searchStore.loadItems();

    database.searchStore = searchStore;

    return true;
}

export { createStores }