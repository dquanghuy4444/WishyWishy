import React from 'react';
import SlideShow from '../components/SlideShow';
import TopWishesTable from '../components/TopWishesTable';

export default function RightStatistical({ topWishes , feedback }) {

    return (
        <div>
            <TopWishesTable topWishes={ topWishes }></TopWishesTable>
            <SlideShow feedback={ feedback }></SlideShow>
        </div>
    );
}
