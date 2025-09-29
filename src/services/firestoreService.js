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

// Get featured post (most recent)
export const getFeaturedPost = async () => {
  try {
    const q = query(
      collection(db, POSTS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { success: true, data: { id: doc.id, ...doc.data() } };
    } else {
      return { success: false, error: 'No posts found' };
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
    
    // Return all posts except the first one (featured)
    const historicalPosts = posts.slice(1);
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
