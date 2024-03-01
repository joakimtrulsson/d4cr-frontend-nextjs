import client from './apollo-client';
import { MAIN_MENU_QUERY, FOOTER_MENU_QUERY, CHAPTER_SLUG_QUERY } from './data/queries';

export async function fetchMainMenuData() {
    try {

        const { data } = await client.query({
            query: MAIN_MENU_QUERY,
        });

        return data?.mainMenu || null

    } catch (error) {
        console.error("(graphql.jsx) Error fetching data:", error);
        throw error;
    }
}

export async function fetchFooterMenuData() {
    try {

        const { data } = await client.query({
            query: FOOTER_MENU_QUERY,
        });

        return data?.footerMenu || null

    } catch (error) {
        console.error("(graphql.jsx) Error fetching data:", error);
        throw error;
    }
}

export async function fetchChapterSlugData(resolvedUrl) {
    try {

        const { data } = await client.query({
            query: CHAPTER_SLUG_QUERY,
            variables: { slug: resolvedUrl }
        })

        return data?.chapters[0] || null

    } catch (error) {
        console.error("(graphql.jsx) Error fetching data:", error);
        throw error;
    }
}