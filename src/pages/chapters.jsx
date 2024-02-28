import React from 'react';
import Navbar from '../components/navbar'
import { fetchMainMenuData } from '../graphql'
import '../themes/sources/scss/app.scss'

export default function Chapters({ data }) {

    return (    
        <div>
            <Navbar data={data} />
            <h1>chapters page</h1>
        </div>
    );
}

export async function getStaticProps() {
    try {
        const data = await fetchMainMenuData();
        return { props: { data } };
    } catch (error) {
        console.error("(pages/chapters.jsx) Error fetching data:", error);
        return { notFound: true };
    }
}