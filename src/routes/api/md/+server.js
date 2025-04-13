// API endpoint to fetch markdown posts
// src/routes/api/md/+server.js

import { json } from '@sveltejs/kit';

const getPosts = async () => {
	let posts = [];

	// Fetch posts from a markdown source
	// Use import.meta.glob to dynamically import markdown files
	// This will return an object where the keys are the file paths
	// and the values are the imported modules
	const paths = import.meta.glob('$lib/markdown/*.md', { eager: true });

	console.log(paths);

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata;
			const post = { ...metadata, slug };

      console.log(post.slug);
      console.log(post.metadata);
      console.log(post.default);

			post.published && posts.push(post);
		}
	}

	// const posts = [
	// 	{
	// 		slug: 'hello-world',
	// 		title: 'Hello World',
	// 		description: 'This is the content of the hello world post.'
	// 	},
	// 	{
	// 		slug: 'another-post',
	// 		title: 'Another Post',
	// 		description: 'This is the content of another post.'
	// 	}
	// ];

	return posts;
};

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
