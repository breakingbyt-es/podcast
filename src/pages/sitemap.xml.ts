import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site, url }) => {
  const origin = site ?? url.origin;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const episodes = await getCollection('episodes');
  const pages = [`${base}/`, ...episodes.map((e) => `${base}/episodes/${e.id}/`)];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${new URL(p, origin).href}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
