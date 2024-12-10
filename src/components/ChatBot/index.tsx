import React, {useState} from 'react';
import {TextInput, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import axiosClient from '../../libs/api/axiosClient';

  const ChatbotView = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 10px 20px;
    
  `;

  const ChatText = styled.Text`
    padding: 10px 15px;
    margin-vertical: 5px;
    border-radius: 5px;
    max-width: 80%;
  `;

  const UserMessage = styled(ChatText)`
    background-color: #e0f7fa;
    align-self: flex-end;
  `;

  const BotMessage = styled(ChatText)`
    background-color: #f1f1f1;
    align-self: flex-start;
  `;
  const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    border-top-width: 1px;
    border-top-color: #e0e0e0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 100px;
    background-color: #fff; 
  `;

  const InputField = styled(TextInput)`
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-right: 10px;
    height: 45px;
  `;

  const SendButton = styled(TouchableOpacity)`
    background-color: #4caf50;
    padding-horizontal: 15px;
    padding-vertical: 10px;
    border-radius: 5px;
    height: 45px;
    justify-content: center;
    align-items: center;
  `;

  const SendButtonText = styled.Text`
    color: #fff;
    font-weight: bold;
  `;

  const ChatbotList = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px 20px;
  margin-bottom: 100px;
`;

  const ChatBot = () => {
    const [messages, setMessages] = useState<{role: 'user' | 'bot'; content: string}[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSendMessage = async () => {
      if (!inputMessage.trim()) return;
  
      setMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
      setInputMessage('');
      setLoading(true);
  
      try {
          const response = await axiosClient.post('/api/chat', { message: inputMessage });
          if (response.data.message) {
              console.log(response)
              setMessages(prev => [...prev, { role: 'bot', content: response.data.message }]);
          }
      } catch (error) {
          setMessages(prev => [
              ...prev,
              { role: 'bot', content: 'Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn.' },
          ]);
      } finally {
          setLoading(false);
      }
  };
  
    return (
      <ChatbotView>
        <ChatbotList>
          <FlatList
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) =>
              item.role === 'user' ? (
                <UserMessage>{item.content}</UserMessage>
              ) : (
                <BotMessage>{item.content}</BotMessage>
              )
            }
            contentContainerStyle={{paddingBottom: 80}}
          />
        </ChatbotList>
        
        <InputContainer>
          <InputField
            placeholder="Nhập tin nhắn của bạn..."
            value={inputMessage}
            onChangeText={setInputMessage}
            onSubmitEditing={handleSendMessage}
          />
          <SendButton onPress={handleSendMessage} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <SendButtonText>Gửi</SendButtonText>
            )}
          </SendButton>
        </InputContainer>
      </ChatbotView>
    );
  };

  export default ChatBot;
