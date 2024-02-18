import React, { useContext, useEffect, useState } from "react";
import { MTRContext } from "@/app/mtr/contexts/mtrcontexts";
import { stopskey } from "@/app/mtr/stopskey";

export default function GetMTRETA() {
  const { mtrlinevalue, mtrstopvalue } = useContext(MTRContext);
  const mtrstopid = stopskey[mtrstopvalue];
  const [dataresponse, setdataresponse] = useState({ data: {} });

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${mtrlinevalue}&sta=${mtrstopid}`
      );
      let data = await response.json();
      setdataresponse(data);
      console.log(data);
    }
    fetchData();
  }, [mtrlinevalue, mtrstopvalue]);

  let linestop = `${mtrlinevalue}-${mtrstopid}`;
  let information = dataresponse.data && dataresponse.data[linestop];
  let UPArray=[]
  let DownArray=[]
  if (information && information.UP) {
    for (let i = 0; i < information.UP.length; i++) {
      UPArray.push(information.UP[i].seq);
      UPArray.push(information.UP[i].time);
    }
  }
  
  if (information && information.DOWN) {
    for (let i = 0; i < information.DOWN.length; i++) {
      DownArray.push(information.DOWN[i].seq);
      DownArray.push(information.DOWN[i].time);
    }
  }

  return (
    <div>
      <h2>UP</h2>
      <ul>
        {UPArray.map((item, index) => (
          index % 2 === 0 ? (
            <li key={index}>Train {item}</li>
          ) : (
            <li key={index}>{new Date(item).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</li>
          )
        ))}
      </ul>

      <h2>DOWN</h2>
      <ul>
        {DownArray.map((item, index) => (
          index % 2 === 0 ? (
            <li key={index}>Train {item}</li>
          ) : (
            <li key={index}>{new Date(item).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</li>
          )
        ))}
      </ul>
    </div>
  );
}