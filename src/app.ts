import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import questPartsRoutes from "./routes/parts";
import itemsRoutes from "./routes/items";
import searchRoutes from "./routes/search";
import config from "@config/config";
import { createStores } from "@stores/database";
import path from "path";

(async() => {
    try {
        await createStores();

        const app = express();
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            limit: config.rateLimit,
            message: "Too many requests, please try again later"
        });

        app.use(helmet({
            crossOriginResourcePolicy: false
        }));
        app.use(cors());
        app.use(limiter);
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        let publicPath = path.resolve(path.join(config.publicPath));

        app.use("/static", express.static(publicPath));

        app.use("/api/quest_parts", questPartsRoutes);
        app.use("/api/items", itemsRoutes);
        app.use("/api/search", searchRoutes);

        app.listen(config.port, () => {
            console.log(`Server started on port ${config.port}`);
        });
    } catch(err) {
        console.log(err);
    }
})();

