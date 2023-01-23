import { useState, useEffect } from "react";

export interface Regiao {
    id: number;
    sigla: string;
    nome: string;
}

export interface BrazilianStatesInterface {
    id: number;
    sigla: string;
    nome: string;
    regiao: Regiao;
}

const useBrazilianStates = ()=> {
    const [states, setStates] = useState<BrazilianStatesInterface[]>([])

    useEffect(()=> {
        const getStates = async()=> {
            const response = await fetch('https://brasilapi.com.br/api/ibge/uf/v1')
            const json = await response.json()
             setStates(json)
        }
        getStates()
    }, [])

    return {states}
}

export default useBrazilianStates