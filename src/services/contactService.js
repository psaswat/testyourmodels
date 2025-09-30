import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, updateDoc } from 'firebase/firestore';

const CONTACT_COLLECTION = 'contactMessages';

// Submit a new contact message
export const submitContactMessage = async (messageData) => {
  try {
    console.log('Attempting to submit contact message:', messageData);
    
    // Validate required fields
    if (!messageData.name || !messageData.email || !messageData.subject || !messageData.message) {
      throw new Error('All fields are required');
    }
    
    const docRef = await addDoc(collection(db, CONTACT_COLLECTION), {
      ...messageData,
      status: 'new', // new, read, replied
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log('Contact message submitted with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting contact message: ', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    return { 
      success: false, 
      error: error.message,
      code: error.code 
    };
  }
};

// Get all contact messages (for admin)
export const getContactMessages = async () => {
  try {
    const q = query(
      collection(db, CONTACT_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: messages };
  } catch (error) {
    console.error('Error getting contact messages: ', error);
    return { success: false, error: error.message };
  }
};

// Update message status
export const updateMessageStatus = async (messageId, status) => {
  try {
    const messageRef = doc(db, CONTACT_COLLECTION, messageId);
    await updateDoc(messageRef, {
      status: status,
      updatedAt: serverTimestamp(),
    });
    console.log(`Message ${messageId} status updated to ${status}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating message status: ', error);
    return { success: false, error: error.message };
  }
};

// Mark message as read
export const markMessageAsRead = async (messageId) => {
  return await updateMessageStatus(messageId, 'read');
};

// Get unread contact messages count
export const getUnreadMessagesCount = async () => {
  try {
    const messages = await getContactMessages();
    if (messages.success) {
      const unreadCount = messages.data.filter(msg => msg.status === 'new').length;
      return { success: true, count: unreadCount };
    }
    return { success: false, count: 0 };
  } catch (error) {
    console.error('Error getting unread messages count: ', error);
    return { success: false, count: 0 };
  }
};

