import { RankType } from "@/types";

export const getRankNameByRank = (rank: RankType) => {
    switch (rank) {
        case RankType.SHEETER:
            return 'Листовщик';
        case RankType.INSTALLER:
            return 'Монтажник';
        case RankType.DEALER:
            return 'Дилер';
        case RankType.MANUFACTURER:
            return 'Производитель';
        default:
            return 'Листовщик';
    }
}