'use client'
import React from "react";
import MTRInput from "./inputpage";
import { useState } from "react";
import { MTRContext } from ".//contexts/mtrcontexts";
import GetMTRETA from "@/components/getmtreta";

export default function MTRInfo(){
    const [mtrlinevalue,setmtrlinevalue] = useState('')
    const[mtrstopvalue,setmtrstopvalue] = useState('')
    return(
        <div>
            <MTRContext.Provider value={{mtrlinevalue, setmtrlinevalue, mtrstopvalue, setmtrstopvalue}}>
            <MTRInput>
                <GetMTRETA/>
            </MTRInput>
            </MTRContext.Provider>
        </div>
    )
}