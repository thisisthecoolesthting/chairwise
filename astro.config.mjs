import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Ricky's policy: no Amazon on content sites. While true, the plugin below only
// strips (unwraps /products/* and Amazon links, drops Amazon-hosted images) and
// never injects. Mirrors src/data/site-flags.ts.
const DISABLE_AMAZON = true;
const ASSOCIATE_TAG = process.env.PUBLIC_ASSOCIATE_TAG || 'chairwise-20';

const amazonHostRe = /(^|\/\/|\.)(amazon\.[a-z.]+|amzn\.to|media-amazon\.com|images-amazon\.com)(\/|$|\?)/i;
const isAmazonHref = (h) => amazonHostRe.test(h) || /[?&]tag=[a-z0-9-]+-2\d/i.test(h);

// Augments in-body /products/<asin>- links with an Amazon affiliate CTA
// (legacy), or, with DISABLE_AMAZON, unwraps them to plain text.
function rehypeAugmentProductLinks() {
  const productHrefRe = /^\/products\/([a-z0-9]+)-/i;
  function walk(node) {
    if (!node || !Array.isArray(node.children)) return;
    const out = [];
    for (const child of node.children) {
      if (DISABLE_AMAZON && child && child.type === 'element') {
        const href = child.properties && typeof child.properties.href === 'string' ? child.properties.href : '';
        const src = child.properties && typeof child.properties.src === 'string' ? child.properties.src : '';
        if (child.tagName === 'a' && (/^(https?:\/\/(www\.)?chairwise\.app)?\/products(\/|$)/i.test(href) || isAmazonHref(href))) {
          walk(child);
          out.push(...(child.children || []));
          continue;
        }
        if (child.tagName === 'img' && isAmazonHref(src)) continue;
      }
      if (
        !DISABLE_AMAZON &&
        child &&
        child.type === 'element' &&
        child.tagName === 'a' &&
        child.properties &&
        typeof child.properties.href === 'string'
      ) {
        const m = child.properties.href.match(productHrefRe);
        if (m) {
          const asin = m[1].toUpperCase();
          const amazonHref =
            'https://www.amazon.com/dp/' + asin + '?tag=' + ASSOCIATE_TAG + '&linkCode=ll1';
          out.push({
            type: 'element',
            tagName: 'span',
            properties: { className: ['product-link-pair'] },
            children: [
              child,
              {
                type: 'element',
                tagName: 'a',
                properties: {
                  href: amazonHref,
                  rel: 'nofollow sponsored noopener',
                  target: '_blank',
                  className: ['amazon-cta-inline'],
                },
                children: [{ type: 'text', value: 'Check on Amazon →' }],
              },
            ],
          });
          continue;
        }
      }
      walk(child);
      out.push(child);
    }
    node.children = out;
  }
  return (tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://chairwise.app',
  trailingSlash: 'never',
  integrations: [tailwind()],
  build: { format: 'directory' },
  markdown: {
    rehypePlugins: [rehypeAugmentProductLinks],
    shikiConfig: { theme: 'github-light' },
  },
});
