import Store from "./store";
import QuestPart from "@models/quest_part"
import Item from "@models/item";
import SearchItem from "@models/search_item";
import WeaponBuild from "@models/weapon_build";
import WeaponBuildVariant from "@models/weapon_build_variant";
import ItemOption from "@models/item_option";
import { database } from "@stores/database_interface";

export default class SearchStore extends Store<SearchItem> {
    async loadItems(): Promise<boolean> {
        let searchItems: Map<string, SearchItem> = new Map<string, SearchItem>();
        let questParts = database.questPartsStore.getAllItems();
        let items = database.itemsStore.getAllItems();

        items.forEach((item: Item) => {
            let searchItem: SearchItem = {
                slug: item.slug,
                name: item.name,
                icon: item.icon,
                questParts: []
            };

            searchItems.set(item.slug, searchItem);
        });

        questParts.forEach((questPart: QuestPart)=> {
            questPart.builds.forEach((weaponBuild: WeaponBuild) => {
                try {
                    if(weaponBuild.weapon) {
                        let weaponSearch = searchItems.get(weaponBuild.weapon.slug);

                        if (weaponSearch && weaponSearch.questParts.indexOf(questPart.id) < 0) {
                            weaponSearch.questParts.push(questPart.id);
                        }
                    }

                    weaponBuild.variants.forEach((weaponBuildVariant: WeaponBuildVariant) => {
                        weaponBuildVariant.parts.forEach((itemOption: ItemOption) => {
                            itemOption.items.forEach((items: Item[]) => {
                                items.forEach((item: Item) => {
                                    if(item) {
                                        let itemSearch = searchItems.get(item.slug);

                                        if (itemSearch && itemSearch.questParts.indexOf(questPart.id) < 0) {
                                            itemSearch.questParts.push(questPart.id);
                                        }
                                    }
                                })
                            });
                        });
                    });
                } catch(err) {
                    console.log(err);
                }
            });
        });

        this.addItems(searchItems);

        return true;
    }
}