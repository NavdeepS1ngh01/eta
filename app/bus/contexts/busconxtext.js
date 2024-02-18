'use client'
import { createContext } from 'react';

export const BusContext = createContext({
    busno: '',
    setbusno: () => {},
    outbound:'',
    setOutbound:() => {}
});