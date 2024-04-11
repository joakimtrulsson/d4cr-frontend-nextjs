import { gql } from '@apollo/client';

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

export const STEERING_GROUP_MEMBERS_QUERY = gql`
  query SteeringGroupMembers {
    steeringGroupMembers {
      fullName
      role
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

export const GET_NEWS_ITEM_BY_SLUG_QUERY = gql`
  query News($where: NewsWhereUniqueInput!) {
    news(where: $where) {
      title
      slug
      newsCategory {
        categoryTitle
      }
      image
      sections
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
  query Case($where: CaseWhereUniqueInput!) {
    case(where: $where) {
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

      principles
      resources
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
      principles
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

export const RESOURCES = gql`
  query Resources($orderBy: [ResourceOrderByInput!]!) {
    resources(orderBy: $orderBy) {
      id
      createdAt
      title
      url
      image
      resourceType {
        icon
        type
      }
      createdAt
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
        principleCategory {
          title
        }
      }
    }
  }
`;
