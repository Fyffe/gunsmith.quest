import Item from "./item";
import WeaponBuildVariant from "@models/weapon_build_variant";

export default interface WeaponBuild {
    weapon: Item;
    variants: WeaponBuildVariant[];
}