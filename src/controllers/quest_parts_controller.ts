import { NextFunction, Request, Response } from "express";
import { database } from "@stores/database_interface";

export const getPartsList = (req: Request, res: Response, next: NextFunction) => {
    try {
        let wrapper : any = {};
        wrapper.parts = database.questPartsStore.getAllItemIds();

        res.set("Cache-Control", "max-age=28800, immutable")
        res.json(wrapper);
    } catch(err) {
        next(err);
    }
};

export const getPart = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);

        if(Number.isNaN(id)) {
            res.status(400).json({ message: "Parameter id has to be an integer"})

            return;
        }

        const part = database.questPartsStore.getItem(id);

        if(!part) {
            res.status(404).json({ message: "Quest part not found" });

            return;
        }

        res.set("Cache-Control", "max-age=28800, immutable")
        res.json(part);
    } catch(err) {
        next(err);
    }
};