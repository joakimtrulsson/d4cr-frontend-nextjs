import React from 'react';
import NavBar from '../themes/components/navbar';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import '../themes/sources/scss/app.scss'

export default function Chapters({ data }) {

console.log("chapters: ", data)

    return (
        <div>
            <NavBar data={data} />
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
            <h1>chapters page</h1>
        </div>
    );
}

export async function getServerSideProps() {

    try {
        
        const { data } = await client.query({
            query: gql`
                query MainMenu {
                    mainMenu {
                        navigation
                        ctaAnchorText
                        ctaUrl
                    }
                }
            `,
        });
        
        return { props: { data: data.mainMenu } };
    } catch (error) {
        console.error("(chapters.js) Error fetching data:", error);
        return {
            notFound: true,
        };
    }
}
