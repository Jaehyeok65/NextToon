"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WebtoonPage() {

    const [webtoon, setWebtoon] = useState<any>();


    useEffect(() => {
        
        const getWebtoon = async() => {
            
            const res = await axios.get("https://korea-webtoon-api.herokuapp.com");
            setWebtoon(res.data);
        }

        getWebtoon();
        
    }, [])

    console.log(webtoon);

    return (
        <>
        {webtoon?.webtoons.map((item : any, index : number) => (
            <div key ={item._id}>
                <img src={item.img} alt={item.title} width={'200px'} height={'100px'}/>
                <div>{item.title}</div>
                <div>{item.author}</div>
            </div>
        ))}
        </>
    )
}