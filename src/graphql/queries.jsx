import { gql } from '@apollo/client';

export const CONTACT_US_PREAMBLE = gql`
  query FormEmails {
    formEmails {
      contactUsPreamble {
        document
      }
    }
  }
`;

export const MODAL_CONTACT_PREAMBLE = gql`
  query FormEmails {
    formEmails {
      joinSlackPreamble {
        document
      }
      shareStoryPreamble {
        document
      }
    }
  }
`;

export const MAIN_MENU_QUERY = gql`
  query MainMenu {
    mainMenu {
      navigation
      ctaAnchorText
      ctaUrl
    }
  }
`;

export const FOOTER_MENU_QUERY = gql`
  query FooterMenu {
    footerMenu {
      navigation
    }
  }
`;

export const ALL_MENU_DATA = gql`
  query Query {
    footerBanner {
      preamble {
        document
      }
      title
    }
    mainMenu {
      ctaAnchorText
      ctaUrl
      navigation
    }
    footerJoinUs {
      url1
      icon1
      url2
      icon2
      url3
      icon3
      url4
      icon4
    }
    footerMenu {
      navigation
    }
  }
`;

export const STEERING_GROUP_MEMBERS_QUERY = gql`
  query SteeringGroupMembers {
    steeringGroupMembers {
      fullName
      role
      company
      city
      country
      socialMediaUrl1
      socialMediaIcon1
      socialMediaUrl2
      socialMediaIcon2
      image
    }
  }
`;

export const CHAPTER_SLUG_QUERY = gql`
  query Query($slug: String!) {
    chapters(where: { slug: { equals: $slug } }) {
      slug
      chapterLanguage
      status
      title
      publicTitle
      heroImage
      sections
      preamble {
        document
      }
      translatedChapters {
        slug
        chapterLanguage
        status
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG_QUERY = gql`
  query Page($where: PageWhereUniqueInput!) {
    page(where: $where) {
      title
      slug
      heroPreamble {
        document
      }
      ctaOneAnchorText
      ctaOneUrl
      ctaTwoUrlAnchorText
      ctaTwoUrl
      status
      sections
    }
  }
`;

export const GET_ALL_NEWS_QUERY = gql`
  query NewsItems($orderBy: [NewsOrderByInput!]!) {
    newsItems(orderBy: $orderBy) {
      id
      title
      slug
      status
      image
      sections
      newsCategory {
        categoryTitle
      }
      relatedChapters {
        publicTitle
        title
      }
      resources {
        id
        title
        resourceType {
          type
        }
        image
        url
      }
      createdAt
    }
    newsCategories {
      categoryTitle
    }
  }
`;

export const GET_NEWS_ITEM_BY_SLUG_QUERY = gql`
  query News($where: NewsWhereUniqueInput!) {
    news(where: $where) {
      id
      createdAt
      title
      slug
      newsCategory {
        categoryTitle
      }
      image
      sections
      resources {
        id
        title
        resourceType {
          type
        }
        image
        url
      }
      status
    }
  }
`;

export const FRONT_PAGE_QUERY = gql`
  query Frontpage {
    frontPage {
      heroTitle
      heroPreamble {
        document
      }
      heroVideo
      ctaOneAnchorText
      ctaOneUrl
      ctaTwoUrlAnchorText
      ctaTwoUrl
      sections
    }
  }
`;

export const CASE_ITEM_BY_SLUG_QUERY = gql`
  query Cases($where: CaseWhereInput!) {
    cases(where: $where) {
      id
      status
      title
      linkType
      url
      preamble {
        document
      }
      sections
      caseImage
      quote
      resources {
        id
        title
        resourceType {
          type
        }
        image
        url
      }
      createdAt
    }
  }
`;

export const CASES_ALL_DESC_QUERY = gql`
  query Cases {
    cases(orderBy: { createdAt: desc }) {
      id
      status
      title
      linkType
      url
      preamble {
        document
      }
      sections
      caseImage
      quote
      resources {
        id
        title
        resourceType {
          type
        }
        image
        url
      }
      createdAt
    }
  }
`;

export const ALL_RESOURCES = gql`
  query Resources($orderBy: [ResourceOrderByInput!]!) {
    resources(orderBy: $orderBy) {
      id
      createdAt
      title
      url
      image
      resourceType {
        type
      }
      resourceCategory {
        title
      }
    }
    resourceTypes {
      type
    }
    resourceCategories {
      title
    }
  }
`;

export const PRINCIPLES_BY_NUMBER = gql`
  query PrincipleNumbers {
    principleNumbers(
      orderBy: { number: asc }
      where: { principles: { status: { equals: "published" } } }
    ) {
      number
      principles {
        id
        status
        title
        subHeader
        slug
        image
        quote
        quoteAuthor
        subPrinciples
        resources {
          id
          title
          resourceType {
            type
          }
          image
          url
        }
        principleCategory {
          title
        }
      }
    }
  }
`;

export const GET_ALL_NEWS_BY_CHAPTER = gql`
  query NewsItems($orderBy: [NewsOrderByInput!]!, $where: NewsWhereInput!) {
    newsItems(orderBy: $orderBy, where: $where) {
      id
      title
      slug
      image
      createdAt
      newsCategory {
        categoryTitle
      }
      resources {
        url
        title
        resourceType {
          type
          icon
        }
        image
        createdAt
      }
      sections
    }
  }
`;

export const GET_ALL_NEWS_BY_CATEGORY = gql`
  query NewsItems($orderBy: [NewsOrderByInput!]!, $categoryTitle: String!) {
    newsItems(
      orderBy: $orderBy
      where: { newsCategory: { categoryTitle: { equals: $categoryTitle } } }
    ) {
      id
      title
      slug
      status
      image
      sections
      newsCategory {
        categoryTitle
      }
      relatedChapters {
        title
        publicTitle
      }
      resourcesTitle
      resourcesPreamble
      resources {
        id
        title
        resourceType {
          type
        }
        image
        url
      }
      createdAt
    }
  }
`;

export const GET_ALL_NEWS_BY_CATEGORY_AND_CHAPTER = gql`
  query NewsItems(
    $orderBy: [NewsOrderByInput!]!
    $categoryTitle: String!
    $relatedChapterSlug: String
  ) {
    newsItems(
      orderBy: $orderBy
      where: {
        newsCategory: { categoryTitle: { equals: $categoryTitle } }
        relatedChapters: { some: { slug: { equals: $relatedChapterSlug } } }
      }
    ) {
      id
      title
      slug
      status
      image
      sections
      newsCategory {
        categoryTitle
      }
      relatedChapters {
        title
        publicTitle
        slug
      }
      resourcesTitle
      resourcesPreamble
      resources {
        id
        title
        resourceType {
          type
        }
        image
        url
      }
      createdAt
    }
  }
`;

export const GET_PEOPLE_BY_IDS = gql`
  query PeopleList($where: PeopleWhereInput!) {
    peopleList(where: $where) {
      id
      fullName
      image
      city
      country
      role
      company
      socialMediaIcon1
      socialMediaUrl1
      socialMediaIcon2
      socialMediaUrl2
    }
  }
`;

export const GET_ALL_PAGES_SLUG = gql`
  query Pages {
    pages {
      slug
    }
  }
`;

export const GET_ALL_CASES_SLUG = gql`
  query Cases {
    cases {
      url
    }
  }
`;

export const GET_ALL_CHAPTERS_SLUG = gql`
  query Chapters {
    chapters {
      slug
    }
  }
`;

export const GET_ALL_NEWS_SLUG = gql`
  query NewsItems {
    newsItems {
      slug
    }
  }
`;

export const GET_ALL_PRINCIPLES_SLUG = gql`
  query Principles {
    principles {
      slug
    }
  }
`;
