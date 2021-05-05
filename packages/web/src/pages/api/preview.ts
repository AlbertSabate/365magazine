import { NextApiHandler } from 'next';
import { getPostBySlug, getRecipeBySlug } from '../../lib/apollo';
import { Article } from '../../schema/article';


const handler: NextApiHandler = async (req, res) => {
  const { secret, slug } = req.query;

  function invalidRequest(message: string) {
    res.status(401).json({ message });
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.NEXT_PREVIEW_TOKEN || !slug) {
    return invalidRequest('Invalid token');
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  if (Array.isArray(slug)) {
    return invalidRequest('Invalid slug');
  }

  let article: Article = await getPostBySlug(slug, true);
  if (!article) {
    article = await getRecipeBySlug(slug, true);
  }

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!article) {
    return invalidRequest('Invalid slug');
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(`${article.slug.current}?id=${article._id}`);
};

export default handler;
