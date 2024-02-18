'use client'
import React, { useContext } from "react";
import allLinesData from "./stopdictionary";
import { MTRContext } from ".//contexts/mtrcontexts";

export default function MTRInput({children}){
    const {mtrlinevalue, setmtrlinevalue, mtrstopvalue, setmtrstopvalue} = useContext(MTRContext)
    function HandleSubmit(e){
        setmtrlinevalue(e.target.value)
    }
    let stopName = mtrlinevalue ? allLinesData[mtrlinevalue]?.LineName || "Line not found" : "";
    let stopslist = mtrlinevalue ? allLinesData[mtrlinevalue]?.stops || {} : {};
    let stopsArray = Object.keys(stopslist).map(key => stopslist[key]);

    return(
        <div>
        <form>
            <label id='mtrline'>MTR Lines</label>
            <br></br>
            Selected Stop:{mtrstopvalue}
            <br></br>
        <select id="mtrline" name="mtrline" onChange={HandleSubmit}>
            <option value="AEL" >Airport Express</option>
            <option value="TCL" >Tung Chung Line</option>
            <option value="TML" >Tuen Ma Line</option>
            <option value="TKL" >Tseung Kwan O Line</option>
            <option value="EAL" >East Rail Line</option>
            <option value="SIL" >South Island Line</option>
            <option value="TWL" >Tsuen Wan Line</option>
            <option value="ISL" >Island Line</option>
            <option value="KTL" >Kwun Tong Line</option>
        </select>
        </form>
        <h1>The selectd MTR line is: {stopName}</h1>
        <br></br>
        <br></br>
        <h2>Please click on the "GET ETA" button to change selected stop and get Estimated Time of Arrival</h2>
        <h3>Stop List</h3>
        <ul>
        {stopsArray.map(stop => (
         <div key={stop}>
            <li>{stop}</li>
            <li><button onClick={() => setmtrstopvalue(stop)}>Get ETA</button></li>
        </div>
        ))}
        </ul>
        {children}
        </div>
    )
}
