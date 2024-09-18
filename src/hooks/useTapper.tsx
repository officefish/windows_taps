import { SyntheticEvent, useCallback, useEffect } from "react";
import { apiFetch } from "@/services/api";
import { useUserStore } from "@/providers/user";
import { useGameplayTick } from "./api/useGameplayTick";
import { useTapsStore } from "@/providers/tap";

const useTapper = () => {

    const { player } = useUserStore();
    const { 
        balance, 
        energy,
        setBalance,
        setEnergy,
        regularBonus,
        networkBonus,
        regularFatique,
        networkFatique,
        isRegular,
        setRegularBonus,
        setNetworkBonus,
        setRegularFatique,
        setNetworkFatique,
        setIsRegular,
        taps,
        setTaps
    } = useTapsStore()


    const onSuccess = useCallback(async (balance: number | null, energyLatest: number) => {
        setIsRegular(true)
        setRegularBonus(networkBonus)
        setRegularFatique(networkFatique)
        setNetworkBonus(0)
        setNetworkFatique(0)

        if (balance) {
            setBalance(balance + networkBonus)
        }
        setEnergy(Math.max(energyLatest, 0))
    }, [])

    const { tick } = useGameplayTick(apiFetch, onSuccess);

    const invalidFatique = () => {
        if (
            (player?.energyLatest || 0) - regularFatique <= 0 ||
            (player?.energyLatest || 0) - networkFatique <= 0) 
            {
                return true 
            }
        return false
    }

    const touch = (touchBonus: number) => {
        let moneyBonus
        let fatique 
        if (isRegular) {
            moneyBonus = regularBonus
            moneyBonus += touchBonus
            setRegularBonus(moneyBonus)
            fatique = regularFatique + 1
            setRegularFatique(fatique)
        } else {
            moneyBonus = networkBonus
            moneyBonus += touchBonus
            setNetworkBonus(moneyBonus)
            fatique = networkFatique + 1
            setNetworkFatique(fatique)
        } 
        setBalance((player?.balance || 0) + moneyBonus)   
        setEnergy((player?.energyLatest || 0) - fatique)

        setTaps(taps + 1)
        if (taps % 50 === 0) {
            setTaps(0)
            farmInterval(moneyBonus, fatique, (player?.energyLatest || 0) - fatique)
        }
    }

    const handleTouch = (e: any) => {
        e.preventDefault()
        if (invalidFatique()) return
        touch(1)  
    }

    const handleDown = (e: SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (invalidFatique()) return
        touch(1)
    }

    const farmInterval = useCallback(
        async (
            regularBonus: number, 
            regularFatique: number,
            energy: number,
        ) => {
       
        tick({
            money: regularBonus,
            energy: regularFatique
        })

        setIsRegular(false)
        setRegularBonus(0)
        setRegularFatique(0)
        setNetworkBonus(0)
        setNetworkFatique(0)
        setEnergy(energy)
    }, [tick, setIsRegular, setNetworkBonus, setNetworkFatique])

    useEffect(() => {
        const interval = setInterval(() => farmInterval(
            regularBonus, 
            regularFatique,
            (player?.energyLatest || 0) - regularFatique
        ), 1000);
        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(interval);
      }, [regularBonus, regularFatique, player]);

    const forceTick = useCallback(() => {
        farmInterval(
            regularBonus, 
            regularFatique,
            (player?.energyLatest || 0) - regularFatique
        )
    }, [regularBonus, regularFatique, player]);

    return { handleTouch, handleDown, balance, energy, forceTick }
};

export default useTapper;