import client from './apollo-client';
import {
    MAIN_MENU_QUERY,
    FOOTER_MENU_QUERY,
    CHAPTER_SLUG_QUERY,
    STEERING_GROUP_MEMBERS_QUERY,
    GET_PAGE_BY_SLUG_QUERY,
    GET_NEWS_ITEM_BY_SLUG_QUERY,
    FRONT_PAGE_QUERY,
    CASE_ITEM_BY_SLUG_QUERY
} from './data/queries';

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

export async function fetchSteeringGroupMembersData() {
    try {

        const { data } = await client.query({
            query: STEERING_GROUP_MEMBERS_QUERY,
        });

        return data?.steeringGroupMembers || null

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

export async function fetchGetPageBySlugData(resolvedUrl) {
    try {

        const { data } = await client.query({
            query: GET_PAGE_BY_SLUG_QUERY,
            variables: { where: { slug: resolvedUrl } }
        })

        return data?.page || null

    } catch (error) {
        console.error("(graphql.jsx) Error fetching data:", error);
        throw error;
    }
}

export async function fetchGetNewsItemBySlugData(resolvedUrl) {

    try {
        const { data } = await client.query({
            query: GET_NEWS_ITEM_BY_SLUG_QUERY,
            variables: { where: { slug: resolvedUrl } }
        })

        return data?.news || null

    } catch (error) {
        console.error("(graphql.jsx) Error fetching data:", error);
        throw error;
    }
}



export async function fetchFrontPageData() {
    try {

        const { data } = await client.query({
            query: FRONT_PAGE_QUERY,
        });

        return data?.frontPage || null

    } catch (error) {
        console.error("(graphql.jsx) Error fetching data:", error);
        throw error;
    }
}


export async function fetchCaseItemBySlug(resolvedUrl){
    try {
        const { data } = await client.query({
            query: CASE_ITEM_BY_SLUG_QUERY,
            variables: { where: { slug: resolvedUrl } }
        })

        return data?.case || null

    } catch (error) {
        console.error("(graphql.jsx) Error fetching data:", error);
        throw error;
    }
    
}
