import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function Home(){
    return(
        <div>
            <title>Home Page</title>
            <h1 class='indexpageheading text-3xl font-bold ' >Estimated Time of Arrival System</h1>
            <div className='flex items-center justify-evenly'>
                <div className='flex items-center'> 
                    <Link href='/bus' className='indexlinks font-serif border-solid border-4 border-black '>Get Bus ETA</Link>
                    <Image src='/bus.png' height={50} width={100}/>
                </div>
                <Link href='/mtr' className='indexlinks font-serif border-solid border-4 border-black'>Get MTR ETA</Link>
            </div>
        </div>
    )
}