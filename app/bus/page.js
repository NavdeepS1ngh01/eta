'use client'
import React from "react";
import GetBusInfo from "./inputpage";
import { useState } from "react";
import BusStop from "@/components/getstopid";
import { BusContext } from "./contexts/busconxtext";


export default function Home(){
    const [busno, setbusno] = useState("");
    const [outbound, setOutbound] = useState("");
    return(
        <div>
            <BusContext.Provider value={{busno,setbusno, outbound, setOutbound}}>
                <GetBusInfo>
                    <BusStop/>
                </GetBusInfo>
            </BusContext.Provider>
        </div>
    )
}