import { error } from '@sveltejs/kit';

export async function load({ params }) {
	console.log(params.slug);

	// // Check if the slug is valid
	// if (!params.slug || typeof params.slug !== 'string') {
	// 	throw error(400, 'Invalid slug');
	// }
	// // Check if the slug is empty
	// if (params.slug.trim() === '') {
	// 	throw error(400, 'Slug cannot be empty');
	// }
	// // Check if the slug contains invalid characters
	// const slugPattern = /^[a-zA-Z0-9-_]+$/;
	// if (!slugPattern.test(params.slug)) {
	// 	throw error(400, 'Slug contains invalid characters');
	// }

	try {
		const post = await import(`$lib/markdown/${params.slug}.md`);

    // console.log('params.slug');
    // console.log(params.slug);
    // console.log('post.metadata.title');
    // console.log(post.metadata.title);

		return {
			content: post.default,
			metadata: post.metadata
		};
	} catch (err) {
		console.error('Error loading post:', err);
		throw error(404, `Post not found: ${params.slug}`);
	}
}
