"use client";

import React from 'react';
import CardSkeleton from './CardSkeleton';



const Skeleton = () => {

    return(
        <React.Fragment>
            { Array.from({length : 8}).map((_,index : number) => (
                <CardSkeleton key={index}/>
            ))}
        </React.Fragment>
    );
}


export default React.memo(Skeleton);