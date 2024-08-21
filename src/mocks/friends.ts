import { IUser } from "@/types";

export const mockFriends: IUser[] = [

    {
        id: 0,
        name: "Алексей Кочнев",
        avatar: "https://i.pravatar.cc/300",
        active: true,
        balance: 100,
        energy: 30,
        currentEnergy: 10,
        photoUrl: "https://i.pravatar.cc/300",
        energyPerSecond: 4,
        level: 2,
        bonus: 4
    },
    {
        id: 1,
        name: "Антон Гаврилов",
        avatar: "https://i.pravatar.cc/301",
        active: true,
        balance: 200,
        energy: 30,
        currentEnergy: 10,
        photoUrl: "https://i.pravatar.cc/301",
        energyPerSecond: 9,
        level: 1,
        bonus: 6
    },
    {
        id: 3,
        name: "Егор Летов",
        avatar: "https://i.pravatar.cc/302",
        active: false,
        balance: 200,
        energy: 30,
        currentEnergy: 10,
        photoUrl: "https://i.pravatar.cc/302",
        energyPerSecond: 9,
        level: 1,
        bonus: 6
    },
    {
        id: 4,
        name: "Елена Прекрасная",
        avatar: "https://i.pravatar.cc/303",
        active: false,
        balance: 600,
        energy: 30,
        currentEnergy: 10,
        photoUrl: "https://i.pravatar.cc/303",
        energyPerSecond: 9,
        level: 1,
        bonus: 6
    }

];