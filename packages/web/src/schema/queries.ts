const allArticles = (pipe = '') => `*[_type in ["post", "recipe"]${pipe}]`;
const bySlug = 'slug.current == $slug';

const Queries = {
  listArticles: allArticles(),
  listArticlePaths: `
${allArticles()}{_id, 'slug': slug.current}
  `,
  getArticleBySlug: `
{
  "article": ${allArticles(`&& ${bySlug}`)} | order(_createdAt desc) | [0] {
    ...,
    "mainImage": mainImage.asset -> {...}
  }
}
  `,
};

export default Queries;
