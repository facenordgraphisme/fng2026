import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';

// Configuration
const projectId = 'k4x2bvj1';
const dataset = 'production';
const apiVersion = '2024-03-20';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('SANITY_API_TOKEN is missing');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function uploadAsset(source: string | Buffer, filename: string) {
  console.log(`Uploading asset: ${filename}...`);
  try {
    const asset = await (client.assets as any).upload('image', source, {
      filename,
      contentType: filename.endsWith('.svg') ? 'image/svg+xml' : undefined,
    });
    return asset._id;
  } catch (err) {
    console.error(`Failed to upload asset ${filename}:`, err);
    return null;
  }
}

async function fetchImage(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.error(`Error fetching image ${url}:`, err);
    return null;
  }
}

function parseInline(html: string, nextKey: () => string) {
    const children: any[] = [];
    const markDefs: any[] = [];
    
    // Split by tags to preserve text order and formatting
    const parts = html.split(/(<a[^>]*>[\s\S]*?<\/a>|<strong[^>]*>[\s\S]*?<\/strong>|<b[^>]*>[\s\S]*?<\/b>|<em[^>]*>[\s\S]*?<\/em>|<i[^>]*>[\s\S]*?<\/i>)/g);
    
    for (const part of parts) {
      if (!part) continue;
      
      if (part.startsWith('<a')) {
        const hrefMatch = part.match(/href="([^"]+)"/);
        const href = hrefMatch ? hrefMatch[1] : '';
        const inner = part.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
        const key = nextKey();
        markDefs.push({ _type: 'link', _key: key, href });
        children.push({ _type: 'span', _key: nextKey(), text: inner, marks: [key] });
      } else if (part.startsWith('<strong') || part.startsWith('<b')) {
        const inner = part.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
        children.push({ _type: 'span', _key: nextKey(), text: inner, marks: ['strong'] });
      } else if (part.startsWith('<em') || part.startsWith('<i')) {
        const inner = part.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
        children.push({ _type: 'span', _key: nextKey(), text: inner, marks: ['em'] });
      } else {
        children.push({ _type: 'span', _key: nextKey(), text: part.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' '), marks: [] });
      }
    }
    
    if (children.length === 0 && html) {
        children.push({ _type: 'span', _key: nextKey(), text: html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' '), marks: [] });
    }

    return { children, markDefs };
}

async function publish() {
  const fileName = 'seo-local-hautes-alpes-guide-complet.html';
  const filePath = path.join(process.cwd(), 'briefs', fileName);
  const html = fs.readFileSync(filePath, 'utf-8');

  // Metadata extraction from comments
  const metaComment = html.match(/<!--([\s\S]*?)-->/);
  const metaText = metaComment ? metaComment[1] : '';
  
  const getMeta = (key: string) => {
    const match = metaText.match(new RegExp(`${key}\\s*:\\s*(.*)`));
    return match ? match[1].trim() : '';
  };

  const title = getMeta('title') || 'SEO local dans les Hautes-Alpes : le guide complet pour artisans et PME du 05';
  const slug = getMeta('slug') || 'seo-local-hautes-alpes-artisans-pme';
  const publishedAt = getMeta('publishedAt') ? new Date(getMeta('publishedAt')).toISOString() : new Date().toISOString();
  const seoTitle = getMeta('seoTitle').split('(')[0].trim() || title;
  const seoDescription = getMeta('seoDescription').split('(')[0].trim();
  const mainImageUrl = getMeta('mainImage');
  const mainImageAlt = getMeta('mainImageAlt');

  // Upload main image
  let mainImageAssetId = null;
  if (mainImageUrl) {
    const buffer = await fetchImage(mainImageUrl);
    if (buffer) {
      mainImageAssetId = await uploadAsset(buffer, 'main-image.jpg');
    }
  }

  // Body parsing
  const body: any[] = [];
  let keyCount = 0;
  const nextKey = () => `k${++keyCount}`;

  const block = (innerHtml: string, style = 'normal', listItem?: string, level?: number) => {
    const { children, markDefs } = parseInline(innerHtml, nextKey);
    return {
        _type: 'block',
        _key: nextKey(),
        style,
        markDefs,
        children,
        ...(listItem ? { listItem, level: level || 1 } : {}),
    };
  };

  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/) || [null, html];
  const content = articleMatch[1];

  // Improved block extraction to handle nested divs in spoke-card
  const tags: string[] = [];
  let remaining = content;
  while (remaining) {
      const match = remaining.match(/<(p|h2|h3|ul|ol|figure|section|blockquote|div)[^>]*>/);
      if (!match) break;
      
      const tag = match[1];
      const startIndex = match.index!;
      remaining = remaining.substring(startIndex);
      
      let endIndex = -1;
      if (tag === 'div') {
          const openingTag = match[0];
          if (openingTag.includes('class="spoke-card"')) {
              // Spoke card has one nested div (.badge), so we need the second </div>
              const firstDivEnd = remaining.indexOf('</div>');
              endIndex = remaining.indexOf('</div>', firstDivEnd + 6) + 6;
          } else {
              // Simple div (capsule, toc, tldr, etc.)
              endIndex = remaining.indexOf('</div>') + 6;
          }
      } else {
          const closingTag = `</${tag}>`;
          endIndex = remaining.indexOf(closingTag) + closingTag.length;
      }
      
      if (endIndex > 0) {
          tags.push(remaining.substring(0, endIndex));
          remaining = remaining.substring(endIndex);
      } else {
          remaining = remaining.substring(match[0].length);
      }
  }

  for (const tag of tags) {
    if (tag.startsWith('<h2')) {
      const inner = tag.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] || '';
      body.push(block(inner, 'h2'));
    } else if (tag.startsWith('<h3')) {
      const inner = tag.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1] || '';
      body.push(block(inner, 'h3'));
    } else if (tag.startsWith('<p')) {
      if (tag.includes('article-meta')) continue;
      if (tag.includes('Par <strong>')) continue;
      const inner = tag.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] || '';
      if (inner.trim()) body.push(block(inner, 'normal'));
    } else if (tag.startsWith('<ul') || tag.startsWith('<ol')) {
      const isBullet = tag.startsWith('<ul');
      const items = tag.match(/<li>([\s\S]*?)<\/li>/g) || [];
      for (const item of items) {
        const inner = item.match(/<li>([\s\S]*?)<\/li>/)?.[1] || '';
        body.push(block(inner, 'normal', isBullet ? 'bullet' : 'number'));
      }
    } else if (tag.includes('class="tldr"') || tag.includes('class="box-tldr"')) {
      body.push(block('Ce qu\'il faut retenir', 'h3'));
      const items = tag.match(/<li>([\s\S]*?)<\/li>/g) || [];
      for (const item of items) {
        const inner = item.match(/<li>([\s\S]*?)<\/li>/)?.[1] || '';
        body.push(block(inner, 'normal', 'bullet'));
      }
    } else if (tag.includes('class="toc"')) {
        const items: any[] = [];
        const liMatches = tag.match(/<li><a href="#([^"]+)">([\s\S]*?)<\/a><\/li>/g) || [];
        for (const li of liMatches) {
            const m = li.match(/href="#([^"]+)">([\s\S]*?)<\/a>/);
            if (m) {
                items.push({ text: m[2].replace(/<[^>]+>/g, '').trim(), anchor: m[1] });
            }
        }
        body.push({ _type: 'toc', _key: nextKey(), title: 'Sommaire', items });
    } else if (tag.includes('class="spoke-card"')) {
        const badge = tag.match(/<div class="badge">([\s\S]*?)<\/div>/)?.[1] || '';
        const spokeTitle = tag.match(/<h3>([\s\S]*?)<\/h3>/)?.[1] || '';
        const spokeP = tag.match(/<p>([\s\S]*?)<\/p>/)?.[1] || '';
        const linkMatch = tag.match(/<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
        body.push({
            _type: 'spokeCard',
            _key: nextKey(),
            badge: badge.replace(/<[^>]+>/g, '').trim(),
            title: spokeTitle.replace(/<[^>]+>/g, '').trim(),
            description: spokeP.replace(/<[^>]+>/g, '').trim(),
            linkUrl: linkMatch ? linkMatch[1] : '',
            linkText: linkMatch ? linkMatch[2].replace(/<[^>]+>/g, '').replace('→', '').trim() : 'En savoir plus',
        });
    } else if (tag.includes('class="capsule"')) {
        const inner = tag.substring(tag.indexOf('>') + 1, tag.lastIndexOf('</div>')).trim();
        body.push(block(inner, 'capsule'));
    } else if (tag.includes('class="citation-capsule"')) {
        const inner = tag.substring(tag.indexOf('>') + 1, tag.lastIndexOf('</div>')).trim();
        body.push(block(inner, 'citation'));
    } else if (tag.startsWith('<blockquote')) {
      const inner = tag.replace(/<blockquote[^>]*>|<\/blockquote>/g, '').trim();
      body.push(block(inner, 'blockquote'));
    } else if (tag.startsWith('<figure') || tag.includes('class="chart-wrap"')) {
      const svgMatch = tag.match(/<svg[\s\S]*?<\/svg>/);
      const imgMatch = tag.match(/<img[^>]+src="(.*?)"[^>]*alt="(.*?)"/);
      const capMatch = tag.match(/<figcaption>(.*?)<\/figcaption>/);
      const ariaLabel = tag.match(/aria-label="(.*?)"/)?.[1] || '';

      if (svgMatch) {
        const svgContent = svgMatch[0];
        const assetId = await uploadAsset(Buffer.from(svgContent), `chart-${nextKey()}.svg`);
        if (assetId) {
          body.push({
            _type: 'image',
            _key: nextKey(),
            asset: { _type: 'reference', _ref: assetId },
            alt: ariaLabel || 'Graphique SVG',
            caption: capMatch ? capMatch[1].replace(/<[^>]+>/g, '') : '',
          });
        }
      } else if (imgMatch) {
        const imgUrl = imgMatch[1];
        const buffer = await fetchImage(imgUrl);
        let assetId = null;
        if (buffer) {
          assetId = await uploadAsset(buffer, `image-${nextKey()}.jpg`);
        }
        
        body.push({
          _type: 'image',
          _key: nextKey(),
          ...(assetId ? { asset: { _type: 'reference', _ref: assetId } } : { externalUrl: imgUrl }),
          alt: imgMatch[2],
          caption: capMatch ? capMatch[1].replace(/<[^>]+>/g, '') : '',
        });
      }
    } else if (tag.startsWith('<section class="faq-section"')) {
      const faqItems = tag.match(/<div class="faq-item">([\s\S]*?)<\/div>/g) || 
                       tag.match(/<details class="faq">([\s\S]*?)<\/details>/g) || [];
      const items = faqItems.map(f => {
        const qMatch = f.match(/<(?:p class="faq-question"|summary)[^>]*>([\s\S]*?)<\/(?:p|summary)>/);
        const aMatch = f.match(/<(?:p|div class="ans")[^>]*>([\s\S]*?)<\/(?:p|div)>/);
        return {
          _key: nextKey(),
          question: qMatch ? qMatch[1].replace(/<[^>]+>/g, '').trim() : '',
          answer: aMatch ? aMatch[1].replace(/<[^>]+>/g, '').trim() : '',
        };
      });
      body.push({
        _type: 'faq',
        _key: nextKey(),
        title: 'Questions fréquentes',
        items,
      });
    }
  }

  const doc = {
    _type: 'post',
    _id: `post-${slug}`,
    title,
    slug: { _type: 'slug', current: slug },
    publishedAt,
    seoTitle,
    seoDescription,
    mainImage: {
      _type: 'image',
      ...(mainImageAssetId ? { asset: { _type: 'reference', _ref: mainImageAssetId } } : { externalUrl: mainImageUrl }),
      alt: mainImageAlt || title,
    },
    body,
  };

  console.log('Publishing document:', doc.title);
  try {
    const result = await client.createOrReplace(doc);
    console.log('Document published successfully!', result._id);
  } catch (err) {
    console.error('Error publishing document:', err);
  }
}

publish();
