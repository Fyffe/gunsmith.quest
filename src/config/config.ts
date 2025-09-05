import dotenv from "dotenv";

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    publicPath: string;
    gameDataPath: string;
    rateLimit: number;
    iconDefaultPath: string;
    iconDefaultType: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    publicPath: process.env.PUBLIC_PATH || "./public/",
    gameDataPath: process.env.DATA_PATH || "./data/game/",
    rateLimit: Number(process.env.RATE_LIMIT) || 100,
    iconDefaultPath: process.env.ICON_DEFAULT_PATH || "https://gunsmith.quest/static/",
    iconDefaultType: process.env.ICON_DEFAULT_TYPE || ".png"
};

export default config;
