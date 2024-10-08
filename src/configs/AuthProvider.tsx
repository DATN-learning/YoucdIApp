import React from 'react';
import {createContext, useContext, useState} from 'react';
import {
  loginByEamil,
  loginByToken,
  logoutApp,
  resgisterAccount,
} from '../api/authLogin';
import {
  setTokenAsyncStorage,
  getTokenAsyncStorage,
  removeTokenAsyncStorage,
} from '../providers/storageProviders';
import {IUser} from '../models/auth';
import {Alert, Dimensions, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSocket} from './SocketProvider';
const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  user: {} as IUser,
  login: (email: string, pass: string) => {},
  logout: (email: string) => {},
  register: (
    lastName: string,
    firstName: string,
    email: string,
    pass: string,
  ) => {},
  isLoadingLogin: false,
  isLoadingRegister: false,
  orientation: 'portrait',
});

const AuthProvider = ({children}: {children: any}) => {
  const navigation = useNavigation();
  const {socket} = useSocket();
  const [user, setUser] = useState<IUser>({} as IUser);
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [orientation, setOrientation] = React.useState('portrait');
  React.useEffect(() => {
    const handleOrientationChange = () => {
      const {width, height} = Dimensions.get('window');
      if (width > height) {
        setOrientation('landscape');
      } else {
        setOrientation('portrait');
      }
    };
    Dimensions.addEventListener('change', handleOrientationChange);
    return () => {
      setOrientation('portrait');
    };
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoadingLogin(true);
    try {
      const res = await loginByEamil(email, pass);
      if (res.status === 200) {
        if (res.data.status) {
          setTokenAsyncStorage(res.data.token);
          setToken(res.data.token);
          setUser(res.data.user);
          setIsAuthenticated(true);
          setIsLoadingLogin(false);
          Alert.alert('Thông báo', 'Đăng nhập thành công');
          navigation.goBack();
          return true;
        } else {
          console.log(res.data.message);
          setIsLoadingLogin(false);
          Alert.alert('Thông báo', res.data.message);
          return false;
        }
      } else {
        console.log(res.status);
        setIsLoadingLogin(false);
        Alert.alert('Thông báo', 'Đăng nhập thất bại');
        navigation.goBack();
        return false;
      }
    } catch (e) {
      setIsLoadingLogin(false);
      console.log(e);
    }
  };

  const register = async (
    lastName: string,
    firstName: string,
    email: string,
    pass: string,
  ) => {
    try {
      setIsLoadingRegister(true);
      const res = await resgisterAccount(lastName, firstName, email, pass);
      if (res.status === 200) {
        if (res.data.status) {
          setIsLoadingRegister(false);
          Alert.alert('Thông báo', 'Đăng ký thành công');
          navigation.goBack();
          return true;
        } else {
          setIsLoadingRegister(false);
          console.log(res.data.message);
          Alert.alert('Thông báo', res.data.message);
          return false;
        }
      }
    } catch (error) {}
  };

  const logout = async (email: string) => {
    try {
      const res = await logoutApp(email);
      if (res.status === 200) {
        if (res.data.status) {
          setToken('');
          setUser({} as IUser);
          removeTokenAsyncStorage();
          setIsAuthenticated(false);
          Alert.alert('Thông báo', 'Đăng xuất thành công');
          navigation.goBack();
          return true;
        } else {
          console.log(res.data.message);
          Alert.alert('Thông báo', res.data.message);
          return false;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  React.useEffect(() => {
    autoLogin();
  }, []);

  const autoLogin = async () => {
    const token = await getTokenAsyncStorage();
    console.log(token);
    if (token) {
      try {
        const res = await loginByToken();
        if (res.status === 200) {
          if (res.data.status) {
            setToken(token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
            return true;
          } else {
            console.log(res.data.message);
            Alert.alert('Thông báo', 'Hãy đăng nhập lại nhé !');
            return false;
          }
        } else {
          console.log(res.status);
          Alert.alert('Thông báo', 'Đăng nhập thất bại');
          return false;
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated,
        isLoadingLogin,
        orientation,
        register,
        isLoadingRegister,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};
