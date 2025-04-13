export async function load({ fetch }) {
  // Fetch the posts from the API endpoint
  const res = await fetch('/api/md');
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const posts = await res.json();

  return {
    posts
  };
}