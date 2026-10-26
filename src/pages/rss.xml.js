import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import home from '../data/spawn-home.json';

export async function GET(context) {
  const pillars = await getCollection('pillars', ({ data }) => data.status === 'published');
  const articles = await getCollection('articles', ({ data }) => data.status === 'published');

  const items = [
    ...pillars.map((p) => ({
      title: p.data.title,
      link: `/pillars/${p.slug}/`,
      pubDate: p.data.publishedAt,
      description: p.data.excerpt,
    })),
    ...articles.map((a) => ({
      title: a.data.title,
      link: `/articles/${a.slug}/`,
      pubDate: a.data.publishedAt,
      description: a.data.excerpt,
    })),
  ].sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate));

  const b = home.brand;
  const d = (home.defaultMetaDescription && String(home.defaultMetaDescription)) || b.taglineShort || b.fullName;
  return rss({
    title: b.fullName,
    description: d,
    site: context.site,
    items,
  });
}
