import React, {FunctionComponent} from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
  Modal,
  Image,
} from 'react-native';
import styles from './styles';
import {Props} from './types';
//?component

//?types

const BottomPopup: FunctionComponent<Props> = props => {
  
  const {
    visible,
    setVisible,
    children,
    title,
    titleStyle,
    containerStyle,
    iconMinus,
    animationType,
    maxHeight,
  } = props;

  const renderOutsideTocuhable = (onTocuh: any) => {
    const view = <View style={{flex: 1}} />;
    if (!onTocuh) return view;
    return (
      <TouchableNativeFeedback onPress={onTocuh} style={{flex: 1}}>
        {view}
      </TouchableNativeFeedback>
    );
  };

  const renderContainer = (children: React.ReactNode) => {
    return (
      <View
        style={[
          containerStyle,
          styles.renderContainer,
          {
            maxHeight: maxHeight ? maxHeight : '80%',
          },
        ]}>
        <TouchableOpacity
          style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: 5,
          }}
          onPress={() => setVisible(false)}>
          {iconMinus ? iconMinus : null}
        </TouchableOpacity>
        {title && (
          <View style={styles.titleContainer}>
            <Text style={[titleStyle, styles.title]}>{title}</Text>
          </View>
        )}
        {children}
      </View>
    );
  };

  return (
    <Modal
      animationType={animationType ? animationType : 'slide'}
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={styles.bottomPopupModalContainer}>
        {renderOutsideTocuhable(() => setVisible(false))}
        {renderContainer(children)}
      </View>
    </Modal>
  );
};

export default BottomPopup;
