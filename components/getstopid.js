/**import React from "react";
import { useContext } from "react";
import { BusContext } from "@/app/bus/contexts/busconxtext";


export default async function BusStop(){
    const { busno } = useContext(BusContext);
    let response = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/route-stop/${busno}/outbound/1`)
    let data = await response.json()
    console.log(data.data[0].stop)
    return(
        <div>
            <h1>Here is the bus stop list:</h1>
            <h3>{data.data[5].stop}</h3>

        </div>
    )
}

import React, { useContext, useEffect, useState } from "react";
import { BusContext } from "@/app/bus/contexts/busconxtext";

export default function BusStop() {
    const { busno } = useContext(BusContext);
    const [stop, setStop] = useState("");
    const [items, setItems] = useState([]);
    const [stopname, setstopname] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (busno) {
                const response = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/route-stop/${busno}/outbound/1`);
                const data = await response.json();
                const stops = data.data.map(item => item.stop);
                setItems(stops); 
                setStop(data.data[0].stop);
            }
            setstopname([]);

            for (let i=0;i<items.length;i++){
                async function fetchStopName(){
                const responsename = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/stop/${items[i]}`)
                const dataname = await responsename.json()
                const stopnames = dataname.data.name_en;
                setstopname(prevNames => [...prevNames, dataname.data.name_en])
            }
            fetchStopName()
        }
        fetchData();
    }

        //for (let i=0;i<items.length;i++){
            //console.log(items[i])
        //}
    }, [busno]);
    
    return (
        <div>
            <h1>Here is the bus stop list:</h1>
            <ul>
                {stopname.map((stop, index) => (
                    <li key={stop}>{stop}</li> // Using stop as key assuming it is unique
                ))}
            </ul>
        </div>
    );
}
**/
import React, { useContext, useEffect, useState } from "react";
import { BusContext } from "@/app/bus/contexts/busconxtext";

export default function BusStop() {
    const { busno, outbound } = useContext(BusContext);
    const [items, setItems] = useState([]);
    const [stopnames, setStopnames] = useState([]);
    const [etaInfo, setEtaInfo] = useState({});

    function formatTime(dateString) {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', options);
    }
    

    useEffect(() => {
        async function fetchData() {
            if (busno) {
                try {
                    // Fetch the list of stops for the new busno
                    const response = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/route-stop/${busno}/${outbound}/1`);
                    const data = await response.json();
                    const stops = data.data.map(item => item.stop);
                    setItems(stops);

                    // Initialize a temporary array to hold stop names
                    const stopNamesTemp = [];

                    // Fetch the names for the new stops
                    for (const stop of stops) {
                        const responsename = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/stop/${stop}`);
                        const dataname = await responsename.json();
                        stopNamesTemp.push(dataname.data.name_en);
                    }

                    // Update stop names state
                    setStopnames(stopNamesTemp);

                    // Initialize an object to hold ETA info for each stop
                    const etaInfoTemp = {};

                    // Fetch ETA for each stop
                    for (const stop of stops) {
                        const responsetime = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/eta/${stop}/${busno}/1`);
                        const datatime = await responsetime.json();
                        const outboundETAs = datatime.data
                            .filter(item => item.dir === 'O')
                            .sort((a, b) => a.eta_seq - b.eta_seq)
                            .map(item => formatTime(item.eta));
                        etaInfoTemp[stop] = outboundETAs; // Store ETAs by stop ID
                    }

                    // Update ETA info state
                    setEtaInfo(etaInfoTemp);
                    console.log(etaInfo)

                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            }
        }
        fetchData();
    }, [busno, outbound]);

    return (
        <div id='etaresultdiv'>
            <h2 class='text-center'>Origin: {stopnames[0]} ------ Destination: {stopnames[stopnames.length -1]}</h2>
            <br></br>
            <h1 class='text-center font-semibold text-2xl'>Stop List</h1>
            <table>
            <tbody>
                {stopnames.map((name, index) => (
                <tr className="border-2 border-rose-500" key={index}>
                <td className="border-2 border-rose-500">{name}</td>
                <td className="border-2 border-rose-500">ETA: {etaInfo[items[index]]?.join(', ')}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}
/**  An object with arrays of ETA information
const etaInfo = {
    "stop1": ["3:00 PM", "3:15 PM"],
    "stop2": ["3:05 PM", "3:20 PM"]
  };
  
  // An array of keys (presumably corresponding to stop IDs)
  const items = ["stop1", "stop2", "stop3"];
  
  // The index we're interested in
  const index = 1;
  
  // The expression to join the ETAs for the stop at `items[index]` into a string
  const etaString = etaInfo[items[index]]?.join(', ');
  For example, suppose we have two bus stops with IDs stop1 and stop2. Let's say the outboundETAs for stop1 are ["3:00 PM", "3:15 PM"] and for stop2 are ["3:05 PM", "3:20 PM"]. After executing the line etaInfoTemp[stop] = outboundETAs; for both stops, the etaInfoTemp object would look like this:

javascript
Copy
{
  "stop1": ["3:00 PM", "3:15 PM"],
  "stop2": ["3:05 PM", "3:20 PM"]
}
So, if you need to find the estimated arrival times for stop1, you would simply access etaInfoTemp["stop1"], which would give you ["3:00 PM", "3:15 PM"].

Explanation of .sort((a, b) => a.eta_seq - b.eta_seq)
The .sort((a, b) => a.eta_seq - b.eta_seq) is a part of the code that sorts an array of objects based on the eta_seq property of each object, which represents a sequence number (often indicating the order of ETAs). The sort method in JavaScript sorts the elements of an array in place and returns the sorted array.

The function (a, b) => a.eta_seq - b.eta_seq is a comparison function that sort uses to determine the order of the elements. It compares two objects at a time, referred to as a and b here.

If the result of a.eta_seq - b.eta_seq is less than 0, sort will place a before b.
If the result is greater than 0, sort will place b before a.
If the result is 0, sort will leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
Let's look at an example array before and after the sort:

Before:

javascript
Copy
[
  { eta_seq: 3, eta: "3:15 PM" },
  { eta_seq: 1, eta: "3:00 PM" },
  { eta_seq: 2, eta: "3:05 PM" }
]
After .sort((a, b) => a.eta_seq - b.eta_seq):

javascript
Copy
[
  { eta_seq: 1, eta: "3:00 PM" },
  { eta_seq: 2, eta: "3:05 PM" },
  { eta_seq: 3, eta: "3:15 PM" }
]
  **/