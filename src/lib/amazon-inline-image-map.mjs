/**
 * Curated m.media-amazon.com/images/I/* URLs.
 * P/ASIN paths return a 43-byte tracking GIF — do not use for <img src>.
 * Regenerate: SPINE_SYNC_SITE=<slug> python scripts/sync_amazon_inline_image_map.py
 */
export const AMAZON_INLINE_IMAGE_BY_ASIN = {
  B000WKWMWS: 'https://m.media-amazon.com/images/I/51rRWjWC7bL.jpg',
  B00C2O7C7O: 'https://m.media-amazon.com/images/I/515nKDNSU5L.jpg',
  B00HHQX0BQ: 'https://m.media-amazon.com/images/I/81RK4MPMtHL.jpg',
  B00NQ1CLTI: 'https://m.media-amazon.com/images/I/41Em5XfxbwL.jpg',
  B01N5IB20Q: 'https://m.media-amazon.com/images/I/41VtUi6pMDL.jpg',
  B07QR6Z1JB: 'https://m.media-amazon.com/images/I/51OpfxMruwL.jpg',
  B082Y7X9H5: 'https://m.media-amazon.com/images/I/41KzfM5S8ML.jpg',
};

export function amazonInlineImageUrl(asin) {
  const id = String(asin || '').trim().toUpperCase();
  if (!id) return '';
  return (
    AMAZON_INLINE_IMAGE_BY_ASIN[id] ||
    `/images/amazon-picks/${id}.jpg`
  );
}

export function rewriteAmazonInlineImgSrc(src, href) {
  let asin = '';
  const fromSrc = String(src || '').match(/\/P\/([A-Z0-9]{10})\./i);
  if (fromSrc) asin = fromSrc[1];
  if (!asin && href) {
    const fromHref = String(href).match(/\/dp\/([A-Z0-9]{10})/i);
    if (fromHref) asin = fromHref[1];
  }
  if (!asin) return src;
  return amazonInlineImageUrl(asin);
}
