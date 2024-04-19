import client from "./apollo-client";
import {
  MAIN_MENU_QUERY,
  FOOTER_MENU_QUERY,
  CHAPTER_SLUG_QUERY,
  STEERING_GROUP_MEMBERS_QUERY,
  GET_PAGE_BY_SLUG_QUERY,
  GET_NEWS_ITEM_BY_SLUG_QUERY,
  FRONT_PAGE_QUERY,
  CASE_ITEM_BY_SLUG_QUERY,
  CASES_ALL_DESC_QUERY,
  RESOURCES,
  PRINCIPLES_BY_NUMBER,
  ALL_MENU_DATA,
  GET_ALL_NEWS_QUERY,
  GET_ALL_NEWS_BY_CATEGORY_AND_CHAPTER,
  GET_ALL_NEWS_BY_CATEGORY,
  GET_ALL_NEWS_BY_CHAPTER,
} from "./data/queries";

export async function fetchMainMenuData() {
  try {
    const { data } = await client.query({
      query: MAIN_MENU_QUERY,
    });

    return data?.mainMenu || null;
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

    return data?.footerMenu || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchAllMenuData() {
  try {
    const { data } = await client.query({
      query: ALL_MENU_DATA,
    });

    return data || null;
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

    return data?.steeringGroupMembers || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchChapterSlugData(resolvedUrl) {
  try {
    const { data } = await client.query({
      query: CHAPTER_SLUG_QUERY,
      variables: { slug: resolvedUrl },
    });

    return data?.chapters[0] || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchGetPageBySlugData(resolvedUrl) {
  try {
    const { data } = await client.query({
      query: GET_PAGE_BY_SLUG_QUERY,
      variables: { where: { slug: resolvedUrl } },
    });

    return data?.page || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchAllNews(resolvedUrl) {
  try {
    const { data } = await client.query({
      query: GET_ALL_NEWS_QUERY,
      variables: { orderBy: { createdAt: "desc" } },
    });

    return data || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchGetNewsItemBySlugData(resolvedUrl) {
  try {
    const { data } = await client.query({
      query: GET_NEWS_ITEM_BY_SLUG_QUERY,
      variables: { where: { slug: resolvedUrl } },
    });

    return data?.news || null;
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

    return data?.frontPage || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchCaseItemBySlug(resolvedUrl) {
  try {
    console.log(resolvedUrl);
    const { data } = await client.query({
      query: CASE_ITEM_BY_SLUG_QUERY,
      variables: {
        where: {
          url: {
            equals: `${resolvedUrl}`,
          },
        },
      },
    });

    return data?.cases || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchGetAllCases() {
  try {
    const { data } = await client.query({
      query: CASES_ALL_DESC_QUERY,
    });

    return data?.cases || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchResourcesCategories() {
  try {
    const { data } = await client.query({
      query: RESOURCES,
      variables: { orderBy: { createdAt: "desc" } },
    });
    return data?.resources || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchPrinciplesSortedByNumber() {
  try {
    const { data } = await client.query({
      query: PRINCIPLES_BY_NUMBER,
    });
    return data?.principleNumbers || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchGetNewsItemByChapter(chapter) {
  try {
    const response = await client.query({
      query: GET_ALL_NEWS_BY_CHAPTER,
      variables: {
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          relatedChapters: {
            some: {
              slug: {
                equals: `${chapter.toLowerCase()}`,
              },
            },
          },
        },
      },
    });
    
    return response.data || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchGetNewsItemByCategory(category) {
  try {
    const response = await client.query({
      query: GET_ALL_NEWS_BY_CATEGORY,
      variables: {
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        categoryTitle: `${category}`,
      },
    });
  
    return response.data || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

export async function fetchGetNewsItemByCategoryAndChapter(category, chapter) {
  console.log(chapter)
  try {
    const response = await client.query({
      query: GET_ALL_NEWS_BY_CATEGORY_AND_CHAPTER,
      variables: {
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        categoryTitle: `${category}`,
        relatedChapterSlug: `${chapter.toLowerCase()}`
      },
    });

    return response.data || null;
  } catch (error) {
    console.error("(graphql.jsx) Error fetching data:", error);
    throw error;
  }
}

