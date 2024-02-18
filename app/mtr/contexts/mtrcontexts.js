'use client'
import { createContext } from 'react';

export const MTRContext = createContext({
    mtrlinevalue: '',
    setmtrlinevalue: () => {},
    mtrstopvalue:'',
    setmtrstopvalue:() => {}
});