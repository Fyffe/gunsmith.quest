import WeaponBuild from "./weapon_build";

export default interface QuestPart {
    version: number;
    id: number;
    builds: WeaponBuild[];
}