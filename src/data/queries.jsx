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
    query FooterMenu{
        footerMenu{
            navigation
        }
    }
`;

export const STEERING_GROUP_MEMBERS_QUERY = gql`
    query SteeringGroupMembers {
        steeringGroupMembers{
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
                heroPreamble{
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
  }`;