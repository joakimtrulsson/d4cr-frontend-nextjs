import client from './apollo-client';
import { MAIN_MENU_QUERY } from './data/queries';

export async function fetchMainMenuData() {
    try {
        const { data } = await client.query({
            query: MAIN_MENU_QUERY,
        });
        return data.mainMenu;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}