import { getPosts, getFeaturedPost, getHistoricalPosts, searchPosts, createPost, updatePost as updatePostFirestore, deletePost as deletePostFirestore } from '../services/firestoreService';

// Clean blog posts data (fallback for development)
let staticPosts = [
  // No static posts - all data comes from Firestore
];

// Create a welcome post for when there are no posts
const createWelcomePost = () => ({
  id: 'welcome',
  title: 'Welcome to Your Blog',
  summary: 'This is your first post. Sign in and create content in the Admin panel!',
  content: 'Welcome to your new blog! This is a placeholder post that appears when you have no content yet. Sign in to the Admin panel to create your first real post.',
  category: 'Deep Research',
  image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
  date: new Date().toISOString(),
  isFeatured: true,
  tags: ['welcome', 'getting-started']
});

// Function to get the featured post (from Firestore)
export const getFeaturedPostFromFirestore = async () => {
  try {
    const result = await getFeaturedPost();
    if (result.success) {
      return result.data;
    } else {
      console.warn('No posts in Firestore, using static data');
      const featuredPosts = staticPosts.filter(post => post.isFeatured);
      if (featuredPosts.length > 0) {
        return featuredPosts[0];
      }
      return staticPosts.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    }
  } catch (error) {
    console.error('Error getting featured post from Firestore:', error);
    const featuredPosts = staticPosts.filter(post => post.isFeatured);
    if (featuredPosts.length > 0) {
      return featuredPosts[0];
    }
    return staticPosts.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  }
};

// Function to get historical posts (from Firestore)
export const getHistoricalPostsFromFirestore = async () => {
  try {
    const result = await getHistoricalPosts();
    if (result.success) {
      return result.data;
    } else {
      console.warn('No posts in Firestore, using static data');
      const featuredPost = getFeaturedPostLegacy();
      return staticPosts
        .filter(post => post.id !== featuredPost.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  } catch (error) {
    console.error('Error getting historical posts from Firestore:', error);
    const featuredPost = getFeaturedPostLegacy();
    return staticPosts
      .filter(post => post.id !== featuredPost.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};

// Legacy function for backward compatibility
export const getFeaturedPostLegacy = () => {
  const featuredPosts = staticPosts.filter(post => post.isFeatured);
  if (featuredPosts.length > 0) {
    return featuredPosts[0];
  }
  // If no posts at all, return welcome post
  if (staticPosts.length === 0) {
    return createWelcomePost();
  }
  // If no featured post, return the most recent post
  return staticPosts.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};

// Legacy function for backward compatibility
export const getHistoricalPostsLegacy = () => {
  const featuredPost = getFeaturedPostLegacy();
  // If no static posts, return empty array (welcome post is featured)
  if (staticPosts.length === 0) {
    return [];
  }
  return staticPosts
    .filter(post => post.id !== featuredPost.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Function to add a new post (to Firestore)
export const addPostToFirestore = async (newPost) => {
  try {
    const result = await createPost(newPost);
    if (result.success) {
      return { success: true, id: result.id };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('Error adding post to Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Legacy function for backward compatibility
export const addPost = (newPost) => {
  const post = {
    ...newPost,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  
  // Add to the beginning of the array (most recent first)
  staticPosts.unshift(post);
  
  // If this is marked as featured, unmark all others
  if (post.isFeatured) {
    staticPosts.forEach(p => {
      if (p.id !== post.id) {
        p.isFeatured = false;
      }
    });
  }
  
  return post;
};

// Function to get all posts (from Firestore)
export const getAllPostsFromFirestore = async () => {
  try {
    const result = await getPosts();
    if (result.success) {
      return result.data;
    } else {
      console.warn('No posts in Firestore, using static data');
      return [...staticPosts];
    }
  } catch (error) {
    console.error('Error getting posts from Firestore:', error);
    return [...staticPosts];
  }
};

// Function to search posts (from Firestore)
export const searchPostsFromFirestore = async (query) => {
  try {
    const result = await searchPosts(query);
    if (result.success) {
      return result.data;
    } else {
      console.warn('Error searching Firestore, using static data');
      const searchTerm = query.toLowerCase();
      return staticPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.summary.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm)
      );
    }
  } catch (error) {
    console.error('Error searching posts from Firestore:', error);
    const searchTerm = query.toLowerCase();
    return staticPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.summary.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm)
    );
  }
};

// Legacy function for backward compatibility
export const getAllPosts = () => {
  return [...staticPosts];
};

// Legacy function for backward compatibility
export const getPostsByCategory = (category) => {
  return staticPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
};

// Legacy function for backward compatibility
export const searchPostsLegacy = (query) => {
  const searchTerm = query.toLowerCase();
  return staticPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.summary.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.category.toLowerCase().includes(searchTerm)
  );
};

// Function to update a post (in Firestore)
export const updatePost = async (postId, updateData) => {
  try {
    const result = await updatePostFirestore(postId, updateData);
    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('Error updating post in Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Function to delete a post (from Firestore)
export const deletePost = async (postId) => {
  try {
    const result = await deletePostFirestore(postId);
    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('Error deleting post from Firestore:', error);
    return { success: false, error: error.message };
  }
};

export { staticPosts as posts };