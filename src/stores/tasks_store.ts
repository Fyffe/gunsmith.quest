import Store from "./store";
import Task from "@models/task";
import path from "path";
import config from "@config/config";

const TASKS_PATH : string = path.resolve(path.join(config.gameDataPath, "tasks.json"));

export default class TasksStore extends Store<Task> {

    async loadItems(): Promise<boolean> {
        const json: string = await this.loadJsonData(TASKS_PATH);
        const jsonData: any = JSON.parse(json);

        this.version = jsonData.version;

        jsonData.tasks.forEach((value: any) => {
            this.addItem(value.slug, value as Task);
        })

        return true;
    }
}