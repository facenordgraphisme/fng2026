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

async function publish() {
  const filePath = path.join(process.cwd(), 'briefs', 'balises-title-meta-pme.html');
  const html = fs.readFileSync(filePath, 'utf-8');

  // Basic extraction
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const seoTitle = titleMatch ? titleMatch[1].split(' | ')[0] : 'Balises title et méta description : guide PME Hautes-Alpes';
  
  const descMatch = html.match(/<meta name="description"\s+content="(.*?)"/);
  const seoDescription = descMatch ? descMatch[1] : '';

  const h1Match = html.match(/<h1>(.*?)<\/h1>/);
  const title = h1Match ? h1Match[1] : seoTitle;

  const slug = 'balises-title-meta-description-pme-hautes-alpes';

  const ogImageMatch = html.match(/<meta property="og:image" content="(.*?)"/);
  const mainImageUrl = ogImageMatch ? ogImageMatch[1] : 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?fm=jpg&q=80&w=1200&h=630&fit=crop';

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

  const block = (text: string, style = 'normal', listItem?: string, level?: number) => ({
    _type: 'block',
    _key: nextKey(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: nextKey(), text, marks: [] }],
    ...(listItem ? { listItem, level: level || 1 } : {}),
  });

  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
  if (!articleMatch) return;
  const content = articleMatch[1];

  const tags = content.match(/<(p|h2|h3|ul|ol|div|figure|section)[^>]*>[\s\S]*?<\/\1>/g) || [];

  for (const tag of tags) {
    if (tag.startsWith('<h2')) {
      const text = tag.replace(/<[^>]+>/g, '').trim();
      if (text === 'Questions fréquentes sur les balises title et méta descriptions') continue;
      body.push(block(text, 'h2'));
    } else if (tag.startsWith('<h3')) {
      const text = tag.replace(/<[^>]+>/g, '').trim();
      body.push(block(text, 'h3'));
    } else if (tag.startsWith('<p')) {
      if (tag.includes('article-meta')) continue;
      if (tag.includes('Article rédigé par')) continue;
      const text = tag.replace(/<[^>]+>/g, '').trim();
      if (text) body.push(block(text, 'normal'));
    } else if (tag.startsWith('<ul') || tag.startsWith('<ol')) {
      const isBullet = tag.startsWith('<ul');
      const items = tag.match(/<li>([\s\S]*?)<\/li>/g) || [];
      for (const item of items) {
        const text = item.replace(/<[^>]+>/g, '').trim();
        body.push(block(text, 'normal', isBullet ? 'bullet' : 'number'));
      }
    } else if (tag.startsWith('<div class="box-tldr"')) {
      body.push(block('Ce qu\'il faut retenir', 'h3'));
      const items = tag.match(/<li>([\s\S]*?)<\/li>/g) || [];
      for (const item of items) {
        const text = item.replace(/<[^>]+>/g, '').trim();
        body.push(block(text, 'normal', 'bullet'));
      }
    } else if (tag.startsWith('<div class="citation-capsule"') || 
               tag.startsWith('<div class="box-experience"') || 
               tag.startsWith('<div class="box-insight"') || 
               tag.startsWith('<div class="box-tip"')) {
      const text = tag.replace(/<[^>]+>/g, '').trim();
      body.push(block(text, 'blockquote'));
    } else if (tag.startsWith('<figure') || tag.startsWith('<div class="chart-wrap"')) {
      // Check for SVG first
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
            caption: capMatch ? capMatch[1] : '',
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
          caption: capMatch ? capMatch[1] : '',
        });
      }
    } else if (tag.startsWith('<section class="faq-section"')) {
      const faqItems = tag.match(/<div class="faq-item">([\s\S]*?)<\/div>/g) || [];
      const items = faqItems.map(f => {
        const qMatch = f.match(/<p class="faq-question">(.*?)<\/p>/);
        const aMatch = f.match(/<p>([\s\S]*?)<\/p>/);
        return {
          _key: nextKey(),
          question: qMatch ? qMatch[1].trim() : '',
          answer: aMatch ? aMatch[1].replace(/<[^>]+>/g, '').trim() : '',
        };
      });
      body.push({
        _type: 'faq',
        _key: nextKey(),
        title: 'Questions fréquentes sur les balises title et méta descriptions',
        items,
      });
    }
  }

  const doc = {
    _type: 'post',
    _id: 'post-balises-title-meta-pme',
    title,
    slug: { _type: 'slug', current: slug },
    publishedAt: new Date().toISOString(),
    seoTitle,
    seoDescription,
    mainImage: {
      _type: 'image',
      ...(mainImageAssetId ? { asset: { _type: 'reference', _ref: mainImageAssetId } } : { externalUrl: mainImageUrl }),
      alt: title,
    },
    body,
  };

  console.log('Publishing document with assets...');
  try {
    const result = await client.createOrReplace(doc);
    console.log('Document published successfully!', result._id);
  } catch (err) {
    console.error('Error publishing document:', err);
  }
}

publish();
