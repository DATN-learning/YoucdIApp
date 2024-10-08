import AsyncStorage from '@react-native-async-storage/async-storage';

const setTokenAsyncStorage = async (token: string) => {
  try {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('@token', token);
  } catch (error) {
    console.log(error);
  }
};
const getTokenAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};
const removeTokenAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem('@token');
  } catch (error) {
    console.log(error);
  }
};
export {setTokenAsyncStorage, getTokenAsyncStorage,removeTokenAsyncStorage};
