import Trader from "./trader";

export default interface ItemTrader {
    trader: Trader;
    loyalty: number;
    task: unknown;
    isBarter: boolean;
}