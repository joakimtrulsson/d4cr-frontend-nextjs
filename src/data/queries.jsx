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