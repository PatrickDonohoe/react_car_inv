import { useState, useEffect} from 'react';
import { server_calls } from '../api/server';
import { CarProps } from '../types/carProps';

export const useGetData = () => {
    const [ carData, setData ] = useState<CarProps[]>([])
    
    async function handleDataFetch() {
        const result = await server_calls.get();
        setData(result)
    }

    useEffect( () => {
        handleDataFetch();
    }, [])
    
  return { carData, getData: handleDataFetch }
}


