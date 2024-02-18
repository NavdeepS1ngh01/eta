'use client'
import React from "react";
import { useContext } from 'react';
import { BusContext } from "./contexts/busconxtext";
import Link from "next/link";


export default function GetBusInfo({children}){
    const { busno, setbusno, outbound, setOutbound } = useContext(BusContext);

    function Handleinput(e){
        e.preventDefault()
    }
    function handleCheckboxChange(direction) {
        setOutbound(outbound === direction ? '' : direction);
    }
    return(
        <div className='text-2xl font-serif'>
            <h1 className='indexpageheading text-3xl font-bold ' >Estimated Time of Arrival System</h1>
            <div className="flex justify-center items-center">
            <Link href='/' className='text-3xl buspageheading buspagehomelink font-serif border-solid border-4 border-black'>Home Page</Link>
            </div>
            <br></br><br></br>
            <form onSubmit={Handleinput}>
                <label className='mr-4'>Bus Number</label>
                <input type="text" name='busnumberinput' onChange={(e) => setbusno(e.target.value)}></input>
                <input
                    className='mr-4 ml-4'
                    type="checkbox"
                    id="outbound"
                    name="outbound"
                    value="outbound"
                    checked={outbound === 'outbound'}
                    onChange={() => handleCheckboxChange('outbound')}
                />
                <label htmlFor="outbound"> Outbound </label>
                <input
                    className='mr-4 ml-4'
                    type="checkbox"
                    id="inbound"
                    name="inbound"
                    value="inbound"
                    checked={outbound === 'inbound'}
                    onChange={() => handleCheckboxChange('inbound')}
                />
                <label htmlFor="inbound"> Inbound </label>
            </form>
            <br></br>
            <h1 className='text-center'>The input is <span className='hover:bg-backgorundhover font-semibold'>{busno}</span>.</h1>
            <br></br>
            <h2 className='text-center'>The direction is <span className='hover:bg-backgorundhover font-semibold'>{outbound}</span></h2>
            {children}
        </div>
    )
}
