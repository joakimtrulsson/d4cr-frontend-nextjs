import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ['GET'],
    headers: ['Access-Control-Allow-Headers', 'Authorization'],
    origin: process.env.NEXT_PUBLIC_BACKEND_URL,
    optionsSuccessStatus: 200,
  });
  const contentToUpdate = req.query.path;

  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token !== process.env.NEXT_PUBLIC_STATIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.revalidate(contentToUpdate);

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
