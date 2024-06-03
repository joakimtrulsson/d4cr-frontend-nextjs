// Den här filen måste refaktoreras!

import { initializeApollo, addApolloState, useApollo } from './apolloClient';
import client from './apolloClientFetch';
import createApolloClient from './createApolloClient';

import {
  fetchMainMenuData,
  fetchFooterMenuData,
  fetchAllMenuData,
  fetchSteeringGroupMembersData,
  fetchChapterSlugData,
  fetchGetPageBySlugData,
  fetchAllNews,
  fetchGetNewsItemBySlugData,
  fetchFrontPageData,
  fetchCaseItemBySlug,
  fetchGetAllCases,
  fetchResourcesCategories,
  fetchPrinciplesSortedByNumber,
  fetchGetNewsItemByChapter,
  fetchGetNewsItemByCategory,
  fetchGetNewsItemByCategoryAndChapter,
  fetchPeopleByIds,
  fetchModalPreambles,
} from './dataFetches';

import {
  CASE_ITEM_BY_SLUG_QUERY,
  CASES_ALL_DESC_QUERY,
  CHAPTER_SLUG_QUERY,
  GET_NEWS_ITEM_BY_SLUG_QUERY,
  GET_ALL_NEWS_QUERY,
  PRINCIPLES_BY_NUMBER,
  ALL_RESOURCES,
  GET_PAGE_BY_SLUG_QUERY,
  FRONT_PAGE_QUERY,
  GET_ALL_PAGES_SLUG,
  GET_ALL_CASES_SLUG,
  GET_ALL_CHAPTERS_SLUG,
  GET_ALL_NEWS_SLUG,
  GET_ALL_PRINCIPLES_SLUG,
  ALL_MENU_DATA,
  CONTACT_US_PREAMBLE,
  MODAL_CONTACT_PREAMBLE,
} from './queries';

export {
  createApolloClient,
  initializeApollo,
  addApolloState,
  useApollo,
  client,
  fetchMainMenuData,
  fetchFooterMenuData,
  fetchAllMenuData,
  fetchSteeringGroupMembersData,
  fetchChapterSlugData,
  fetchGetPageBySlugData,
  fetchAllNews,
  fetchGetNewsItemBySlugData,
  fetchFrontPageData,
  fetchCaseItemBySlug,
  fetchGetAllCases,
  fetchResourcesCategories,
  fetchPrinciplesSortedByNumber,
  fetchGetNewsItemByChapter,
  fetchGetNewsItemByCategory,
  fetchGetNewsItemByCategoryAndChapter,
  fetchPeopleByIds,
  fetchModalPreambles,
  CASE_ITEM_BY_SLUG_QUERY,
  CASES_ALL_DESC_QUERY,
  CHAPTER_SLUG_QUERY,
  GET_NEWS_ITEM_BY_SLUG_QUERY,
  GET_ALL_NEWS_QUERY,
  PRINCIPLES_BY_NUMBER,
  ALL_RESOURCES,
  GET_PAGE_BY_SLUG_QUERY,
  FRONT_PAGE_QUERY,
  GET_ALL_PAGES_SLUG,
  GET_ALL_CASES_SLUG,
  GET_ALL_CHAPTERS_SLUG,
  GET_ALL_NEWS_SLUG,
  GET_ALL_PRINCIPLES_SLUG,
  ALL_MENU_DATA,
  CONTACT_US_PREAMBLE,
  MODAL_CONTACT_PREAMBLE,
};
