import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import ChatBot from '../components/ChatBot';

const ChatContainerView = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px 20px;
`;

interface ChatContainerProps {}

const ChatContainer: React.FC<ChatContainerProps> = props => {
  return (
    <ChatContainerView>
      <ChatBot />
    </ChatContainerView>
  );
};

export default ChatContainer;
