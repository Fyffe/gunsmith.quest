import { Request, Response, NextFunction } from "express";
import { database } from "@stores/database_interface";

export const getSearchItems = (req: Request, res: Response, next: NextFunction) => {
    try {
        let wrapper : any = {};
        wrapper.items = database.searchStore.getAllItems();

        res.set("Cache-Control", "max-age=28800, immutable")
        res.json(wrapper);
    } catch(err) {
        next(err);
    }
};