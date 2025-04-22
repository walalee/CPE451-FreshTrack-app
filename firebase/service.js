import { db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import uuid from 'react-native-uuid';

export const addFoodItem = async (food, imageFile) => {
  const imageRef = ref(storage, `images/${uuid.v4()}`);
  await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(imageRef);

  await addDoc(collection(db, 'foods'), {
    ...food,
    imageUrl
  });
};
