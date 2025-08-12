import { db, storage } from '@/lib/firebase';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export interface UploadImageResult {
  id: string;
  downloadURL: string;
  fileName: string;
  uploadTime: any;
}

export interface BannerUploadData {
  key: string;
  order: number;
  image: string;
  uploadedFile: File | null;
}

export const uploadImageToFirebase = async (data: BannerUploadData) => {
  const { key, order, uploadedFile } = data;

  try {
    let downloadURL = '';
    if (uploadedFile) {
      const storagePath = `banners/${key}`;
      const storageRef = ref(storage, storagePath);
      const snapshot = await uploadBytes(storageRef, uploadedFile);
      downloadURL = await getDownloadURL(snapshot.ref);
    }

    // 根據是否有新上傳來決定要更新的欄位
    const imageData: {
      order: number;
      uploadTime: any;
      createdAt: string;
      downloadURL?: string;
    } = {
      order,
      uploadTime: serverTimestamp(),
      createdAt: new Date().toISOString()
    };

    // 只有在有新上傳時才加入 downloadURL
    if (uploadedFile) {
      imageData.downloadURL = downloadURL;
    }

    let docRef;
    let docId: string;

    if (key) {
      // 如果有 key，使用 setDoc 更新現有文檔
      docRef = doc(db, 'banners', key);
      await setDoc(docRef, imageData, { merge: true });
      docId = key;
    } else {
      docRef = await addDoc(collection(db, 'banners'), imageData);
      docId = docRef.id;
    }

    const result: UploadImageResult = {
      id: docId,
      downloadURL,
      fileName: key,
      uploadTime: imageData.uploadTime
    };
    return result;
  } catch (error) {
    console.error('圖片上傳失敗:', error);
    throw new Error(`圖片上傳失敗: ${error instanceof Error ? error.message : '未知錯誤'}`);
  }
};

/**
 * 批量上傳圖片
 * @param files - 要上傳的檔案陣列
 * @param options - 上傳選項
 * @returns Promise<UploadImageResult[]>
 */
export const uploadMultipleImages = async (data: BannerUploadData[]) => {
  try {
    const uploadPromises = data.map((d) => {
      return uploadImageToFirebase(d);
    });
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('上傳失敗:', error);
    throw new Error('上傳失敗');
  }
};
