This is a [Next.js] project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Important information

 - Please change the value of NEXT_PUBLIC_BASE_URL in the .env.local file to the customer's actual URL

 

## Known Issues

- **Data setup for Resources:** [query PrincipleNumbers should get all resource data, including image so that principle[slug] can fetch all, also decide how to organixe the groups in resources groups]

- **Data setup required for Footer:** [Including group-title for links and content in the Banner (with null values for Banner by Chapters-pages)]

- **Data setup required for Our Community page:** [Including steering group data direct from Page]

- **Font Awesome Icons in People Card:** [Ensure that we aren't receiving "fas" icons from the backend; only "fab" (free brand icons) should be functional]

- **Link in People Card:** [Ensure that the URLs are consistently prefixed with 'https://' for correctness, as it should be the standard format for all URLs]
 