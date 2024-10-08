import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState, useContext} from 'react';
import {io, Socket} from 'socket.io-client';
import {configs} from '../utils/constant';

const SocketContext = createContext({
  socket: {} as Socket,
});

const SocketProvider = ({children}: {children: any}) => {
  const [socket, setSocket] = useState<any>(null);
  useEffect(() => {
    const connectSocket = async () => {
      try {
        const token = await AsyncStorage.getItem('@token');
        const newSocket = io(configs.apiWebSocketLink, {
          transports: ['websocket'],
          withCredentials: true,
          query: {
            token: token,
            platform: 'MOBILE',
          },
        });
        newSocket.on('connect', () => {
          console.log('Connected to socket server');
        });
        setSocket(newSocket);
      } catch (error) {
        console.log(error);
      }
    };
    connectSocket();
    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export {SocketProvider, useSocket};
