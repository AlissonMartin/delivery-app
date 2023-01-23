import { useEffect, useState } from "react";

export interface citiesInterface {
    nome: string;
    codigo_ibge: string;
}

const useCities = (UF:string)=> {
    const [cities, setCities] = useState<citiesInterface[]>([])

    useEffect(()=> {
        if (!UF) {
            return
        }
        const getCities = async ()=> {
            const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${UF}?providers=dados-abertos-br,gov,wikipedia`)
            const json = await response.json()
            setCities(json)
        }
        getCities()
    }, [UF])

    return {cities}
}

export default useCities