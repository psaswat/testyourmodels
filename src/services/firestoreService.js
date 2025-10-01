import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit,
  where,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Collection name for posts
const POSTS_COLLECTION = 'posts';

// Create a new post
export const createPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log('Post created with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating post: ', error);
    return { success: false, error: error.message };
  }
};

// Get all posts
export const getPosts = async () => {
  try {
    const q = query(
      collection(db, POSTS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: posts };
  } catch (error) {
    console.error('Error getting posts: ', error);
    return { success: false, error: error.message };
  }
};

// Get a single post by ID
export const getPost = async (postId) => {
  try {
    const docRef = doc(db, POSTS_COLLECTION, postId);
    const docSnap = await getDocs(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: 'Post not found' };
    }
  } catch (error) {
    console.error('Error getting post: ', error);
    return { success: false, error: error.message };
  }
};

// Update a post
export const updatePost = async (postId, updateData) => {
  try {
    const postRef = doc(db, POSTS_COLLECTION, postId);
    await updateDoc(postRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });
    console.log('Post updated with ID: ', postId);
    return { success: true };
  } catch (error) {
    console.error('Error updating post: ', error);
    return { success: false, error: error.message };
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    const postRef = doc(db, POSTS_COLLECTION, postId);
    await deleteDoc(postRef);
    console.log('Post deleted with ID: ', postId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting post: ', error);
    return { success: false, error: error.message };
  }
};

// Get featured posts (up to 3)
export const getFeaturedPosts = async () => {
  try {
    // First try the compound query
    const q = query(
      collection(db, POSTS_COLLECTION),
      where('isActive', '==', true),
      where('isFeatured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(3)
    );
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Firestore featured posts query result:', posts);
    return { success: true, data: posts };
  } catch (error) {
    console.error('Compound query failed, trying simple query:', error);
    try {
      // Fallback: get all posts and filter in memory
      const allPostsQuery = query(
        collection(db, POSTS_COLLECTION),
        orderBy('createdAt', 'desc')
      );
      const allPostsSnapshot = await getDocs(allPostsQuery);
      const allPosts = allPostsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      const featuredPosts = allPosts
        .filter(post => post.isActive !== false && post.isFeatured === true)
        .slice(0, 3);
      
      console.log('Fallback featured posts result:', featuredPosts);
      return { success: true, data: featuredPosts };
    } catch (fallbackError) {
      console.error('Fallback query also failed:', fallbackError);
      return { success: false, error: fallbackError.message };
    }
  }
};

// Get featured post (legacy - for backward compatibility)
export const getFeaturedPost = async () => {
  try {
    const result = await getFeaturedPosts();
    if (result.success && result.data.length > 0) {
      return { success: true, data: result.data[0] };
    } else {
      return { success: false, error: 'No featured posts found' };
    }
  } catch (error) {
    console.error('Error getting featured post: ', error);
    return { success: false, error: error.message };
  }
};

// Get historical posts (all except featured)
export const getHistoricalPosts = async () => {
  try {
    const q = query(
      collection(db, POSTS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Return all posts that are not featured
    const historicalPosts = posts.filter(post => !post.isFeatured);
    return { success: true, data: historicalPosts };
  } catch (error) {
    console.error('Error getting historical posts: ', error);
    return { success: false, error: error.message };
  }
};

// Real-time listener for posts
export const subscribeToPosts = (callback) => {
  const q = query(
    collection(db, POSTS_COLLECTION),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(posts);
  });
};

// Search posts
export const searchPosts = async (searchTerm) => {
  try {
    const q = query(
      collection(db, POSTS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const allPosts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Filter posts based on search term
    const filteredPosts = allPosts.filter(post => 
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return { success: true, data: filteredPosts };
  } catch (error) {
    console.error('Error searching posts: ', error);
    return { success: false, error: error.message };
  }
};
