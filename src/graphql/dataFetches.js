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
  ALL_RESOURCES,
  PRINCIPLES_BY_NUMBER,
  ALL_MENU_DATA,
  GET_ALL_NEWS_QUERY,
  GET_ALL_NEWS_BY_CATEGORY_AND_CHAPTER,
  GET_ALL_NEWS_BY_CATEGORY,
  GET_ALL_NEWS_BY_CHAPTER,
  GET_PEOPLE_BY_IDS,
  MODAL_CONTACT_PREAMBLE,
  initializeApollo,
} from './index';

export async function fetchModalPreambles() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: MODAL_CONTACT_PREAMBLE,
    });

    return data?.formEmails || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchMainMenuData() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: MAIN_MENU_QUERY,
    });

    return data?.mainMenu || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchFooterMenuData() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: FOOTER_MENU_QUERY,
    });

    return data?.footerMenu || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchAllMenuData() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: ALL_MENU_DATA,
    });

    return data || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchSteeringGroupMembersData() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: STEERING_GROUP_MEMBERS_QUERY,
    });

    return data?.steeringGroupMembers || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchChapterSlugData(resolvedUrl) {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: CHAPTER_SLUG_QUERY,
      variables: { slug: resolvedUrl },
    });

    return data?.chapters[0] || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchGetPageBySlugData(resolvedUrl) {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: GET_PAGE_BY_SLUG_QUERY,
      variables: { where: { slug: resolvedUrl } },
    });

    return data?.page || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchAllNews(resolvedUrl) {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: GET_ALL_NEWS_QUERY,
      variables: { orderBy: { createdAt: 'desc' } },
    });

    return data || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchGetNewsItemBySlugData(resolvedUrl) {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: GET_NEWS_ITEM_BY_SLUG_QUERY,
      variables: { where: { slug: resolvedUrl } },
    });

    return data?.news || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchFrontPageData() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: FRONT_PAGE_QUERY,
    });

    return data?.frontPage || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchCaseItemBySlug(resolvedUrl) {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
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
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchGetAllCases() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: CASES_ALL_DESC_QUERY,
    });

    return data?.cases || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchResourcesCategories() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: ALL_RESOURCES,
      variables: { orderBy: { createdAt: 'desc' } },
    });
    return data?.resources || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchPrinciplesSortedByNumber() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: PRINCIPLES_BY_NUMBER,
    });
    return data?.principleNumbers || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchGetNewsItemByChapter(chapter) {
  const apolloClient = initializeApollo();
  try {
    const response = await apolloClient.query({
      query: GET_ALL_NEWS_BY_CHAPTER,
      variables: {
        orderBy: [
          {
            createdAt: 'desc',
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
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchGetNewsItemByCategory(category) {
  const apolloClient = initializeApollo();
  try {
    const response = await apolloClient.query({
      query: GET_ALL_NEWS_BY_CATEGORY,
      variables: {
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        categoryTitle: `${category}`,
      },
    });

    return response.data || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchGetNewsItemByCategoryAndChapter(category, chapter) {
  const apolloClient = initializeApollo();
  try {
    const response = await apolloClient.query({
      query: GET_ALL_NEWS_BY_CATEGORY_AND_CHAPTER,
      variables: {
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        categoryTitle: `${category}`,
        relatedChapterSlug: `/chapters/${chapter.toLowerCase()}`,
      },
    });

    return response.data || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}

export async function fetchPeopleByIds(ids) {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: GET_PEOPLE_BY_IDS,
      variables: {
        where: {
          id: {
            in: ids,
          },
        },
      },
    });

    return data?.peopleList || null;
  } catch (error) {
    console.error('(graphql.jsx) Error fetching data:', error);
    throw error;
  }
}
