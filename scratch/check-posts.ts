import { createClient } from 'next-sanity';

const projectId = 'k4x2bvj1';
const dataset = 'production';
const apiVersion = '2024-03-20';
const token = process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function listPosts() {
  const posts = await client.fetch('*[_type == "post"]{title, slug}');
  console.log(JSON.stringify(posts, null, 2));
}

listPosts();
