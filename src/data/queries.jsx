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

export const STEERING_GROUP_MEMBERS = gql`
    query SteeringGroupMembers {
        steeringGroupMembers{
            id
            createdAt
            fullName
            role
            city
            country
            socialMediaUrl1
            socialMediaIcon1
            socialMediaUrl2
            socialMediaIcon2
        }
    }
`;