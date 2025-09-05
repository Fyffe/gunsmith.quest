import Store from "@stores/store";
import QuestPart from "@models/quest_part";
import pathTool from "path";
import fs from "fs/promises";
import { database } from "@stores/database_interface";
import WeaponBuild from "@models/weapon_build";
import ItemOption from "@models/item_option";
import Item from "@models/item";
import WeaponBuildVariant from "@models/weapon_build_variant";
import config from "@config/config";

const PARTS_PATH : string = pathTool.resolve(pathTool.join(config.gameDataPath, "quest_parts"));

export default class QuestPartsStore extends Store<QuestPart> {
    async loadItems(): Promise<boolean> {
        const paths : string[] = await fs.readdir(PARTS_PATH);

        for(const path of paths) {
            const json: string = await this.loadJsonData(pathTool.join(PARTS_PATH, path));
            const jsonData: any = JSON.parse(json);

            let builds : WeaponBuild[] = [];

            for(const build of jsonData.builds) {
                let buildVariants : WeaponBuildVariant[] = [];

                for(const partsSet of build.parts) {
                    let partsSets : ItemOption[] = [];

                    for(const partOption of partsSet) {
                        let partOptions : Item[] = [];

                        if(Array.isArray(partOption)) {
                            for(const part of partOption) {
                                const item = database.itemsStore.getItem(part);

                                if(item) {
                                    partOptions.push(item);
                                }
                            }
                        } else {
                            const item = database.itemsStore.getItem(partOption);

                            if(item) {
                                partOptions.push(item);
                            }
                        }

                        partsSets.push(<ItemOption>{items: partOptions});
                    }

                    buildVariants.push(<WeaponBuildVariant>{parts: partsSets});
                }

                let newBuild : WeaponBuild = <WeaponBuild>{
                    weapon: database.itemsStore.getItem(build.weapon),
                    variants: buildVariants
                };

                builds.push(newBuild);
            }

            let questPart : QuestPart = <QuestPart>{
                version: jsonData.version,
                id: jsonData.id,
                builds: builds
            };

            this.addItem(jsonData.id, questPart);
        }

        return true;
    }

}