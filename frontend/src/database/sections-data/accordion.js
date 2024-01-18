export const accordionSection = {
    id: "4153c1f1-ef46-4a47-b5db-eb8cd2c0580f",
    title: "Sektions titel",
    fields: [
        {
            heading: "Heading 1",
            bodyText: [
                {
                    type: "paragaph",
                    children: [
                        {
                            text: "Body text 1. "
                        },
                        {
                            bold: true,
                            text: "Med lite bold. "
                        },
                        {
                            text: "Och italic.",
                            italic: true
                        }
                    ]
                }
            ]
        },
        {
            heading: "Heading 2",
            bodyText: [
                {
                    type: "paragaph",
                    children: [
                        {
                            text: "Mer text..."
                        }
                    ]
                }
            ]
        }
    ],
    sectionType: "ACCORDION"
};

export default accordionSection