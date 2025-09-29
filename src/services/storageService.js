import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  getMetadata 
} from 'firebase/storage';
import { storage } from '../firebase/config';

// Upload a file to Firebase Storage
export const uploadFile = async (file, path = 'media') => {
  try {
    // Create a unique filename to avoid conflicts
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const fileRef = ref(storage, `${path}/${fileName}`);
    
    // Upload the file
    const snapshot = await uploadBytes(fileRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      success: true,
      url: downloadURL,
      fileName: fileName,
      path: `${path}/${fileName}`
    };
  } catch (error) {
    console.error('Error uploading file: ', error);
    return { success: false, error: error.message };
  }
};

// Upload multiple files
export const uploadMultipleFiles = async (files, path = 'media') => {
  try {
    const uploadPromises = files.map(file => uploadFile(file, path));
    const results = await Promise.all(uploadPromises);
    
    const successful = results.filter(result => result.success);
    const failed = results.filter(result => !result.success);
    
    return {
      success: failed.length === 0,
      successful,
      failed,
      total: results.length
    };
  } catch (error) {
    console.error('Error uploading multiple files: ', error);
    return { success: false, error: error.message };
  }
};

// Delete a file from Firebase Storage
export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting file: ', error);
    return { success: false, error: error.message };
  }
};

// Get file metadata
export const getFileMetadata = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    const metadata = await getMetadata(fileRef);
    return { success: true, metadata };
  } catch (error) {
    console.error('Error getting file metadata: ', error);
    return { success: false, error: error.message };
  }
};

// Validate file type
export const validateFileType = (file) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'audio/mp3',
    'audio/wav',
    'audio/mpeg',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  return allowedTypes.includes(file.type);
};

// Get file size in MB
export const getFileSizeMB = (file) => {
  return (file.size / (1024 * 1024)).toFixed(2);
};

// Check if file size is within limits
export const validateFileSize = (file, maxSizeMB = 10) => {
  const fileSizeMB = parseFloat(getFileSizeMB(file));
  return fileSizeMB <= maxSizeMB;
};

// Get file type category
export const getFileCategory = (file) => {
  const type = file.type;
  
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('audio/')) return 'audio';
  if (type === 'application/pdf') return 'pdf';
  if (type.startsWith('text/')) return 'text';
  if (type.includes('word') || type.includes('document')) return 'document';
  
  return 'other';
};
