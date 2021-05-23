const allArticles = (pipe?: string) => `*[_type in ["post", "recipe"]${pipe ? ` ${pipe}` : ''}]`;
const bySlug = 'slug.current == $slug';

const Queries = {
  listArticles: `
${allArticles()}
{_id, _key, 'slug': slug.current, title, tagline, 'image': mainImage.asset -> url}
  `,
  listArticlePaths: `
${allArticles()}
{_id, 'slug': slug.current}
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
