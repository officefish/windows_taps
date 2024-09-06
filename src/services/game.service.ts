export const getRankNameByRank = (rank: number) => {
    switch (rank) {
        case 0:
            return 'Листовщик';
        case 1:
            return 'Любитель';
        case 2:
            return 'Продвинутый';
        case 3:
            return 'Мастер';
        case 4:
            return 'Гений';
        default:
            return 'Листовщик';
    }
}