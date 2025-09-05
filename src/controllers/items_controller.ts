import {NextFunction, Request, Response} from "express";
import {database} from "@stores/database_interface";
import Item from "@models/item";
import fs from "fs/promises";
import path from "path";
import config from "@config/config";

const ITEMS_PATH : string = path.resolve(path.join(config.gameDataPath, "items.json"));
const OLD_ITEMS_PATH : string = path.resolve(path.join(config.gameDataPath, "items.json.old"));

export const getItemsList = (req: Request, res: Response, next: NextFunction) => {
    try {
        let wrapper : any = {};
        wrapper.items = database.itemsStore.getAllItemIds();

        res.set("Cache-Control", "max-age=28800, immutable")
        res.json(wrapper);
    } catch(err) {
        next(err);
    }
};

export const getItem = (req: Request, res: Response, next: NextFunction) => {
    try {
        const slug = req.params.slug;

        const item = database.itemsStore.getItem(slug);

        if(!item) {
            res.status(404).json({ message: "Item not found" });

            return;
        }

        res.set("Cache-Control", "max-age=28800, immutable")
        res.json(item);
    } catch(err) {
        next(err);
    }
};

export const addItem = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let newItem: Item = {
            slug: req.body.slug,
            name: req.body.name,
            icon: req.body.icon,
            link: req.body.link,
            traders: [],
        };

        if(!newItem.slug || newItem.slug.trim() === "") {
            res.status(400).send("Slug required");

            return;
        }

        if(!newItem.name || newItem.name.trim() === "") {
            res.status(400).send("Name required");

            return;
        }

        let jsonString = await fs.readFile(ITEMS_PATH, "utf-8");
        let jsonParsed = JSON.parse(jsonString);

        let found = jsonParsed.items.find((item: any) => item.slug == newItem.slug);

        if(found) {
            res.status(409).send("Item already exists");

            return;
        }

        jsonParsed.items.push(newItem);

        let json = JSON.stringify(jsonParsed, null, 2);

        await fs.rename(ITEMS_PATH, OLD_ITEMS_PATH);
        await fs.writeFile(ITEMS_PATH, json, "utf-8");

        console.log(`Added ${newItem.slug} to items`);

        res.status(201).send("Item added");
    } catch(err) {
        console.log(`Failed to add a new item, reason: ${err}`);
        next(err);
    }
};