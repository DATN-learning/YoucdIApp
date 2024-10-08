import React, {FC} from 'react';
import Pdf from 'react-native-pdf';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import {IPDFViewerProps} from './type';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
const PDFViewer: FC<IPDFViewerProps> = props => {
  const pdfRef = React.useRef<Pdf>(null);
  const [translateX] = React.useState(new Animated.Value(-Dimensions.get('window').width));
  const [isShowMenu, setShowMenu] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const translateMenu = () => {
    Animated.spring(translateX, {
      toValue: !isShowMenu ? 0 : -Dimensions.get('window').width,
      useNativeDriver: true,
    }).start();
  };
  const handleShowMenu = () => {
    setShowMenu(!isShowMenu);
    translateMenu();
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      pdfRef?.current?.setPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      pdfRef?.current?.setPage(currentPage - 1);
    }
  };
  const sharePDF = async () => {
    try {
      const result = await Share.share({
        message: props.url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert("Can't share this file");
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#9e80f2'}}>
      <Pdf
        ref={pdfRef}
        trustAllCerts={false}
        enablePaging={true}
        onLoadProgress={progressData => {
          console.log(progressData);
        }}
        source={{
          uri: props.url,
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
          setTotalPage(numberOfPages);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
          setCurrentPage(page);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
        style={{flex: 1, width: '100%', backgroundColor: '#fff'}}
        horizontal={true}
      />
      <TouchableOpacity
        onPress={handleShowMenu}
        style={[
          styles.button,
          {
            backgroundColor: '#9e80f2',
            padding: isShowMenu ? 10 : 0,
          },
        ]}>
        <Entypo
          name={isShowMenu ? 'chevron-right' : 'chevron-left'}
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.menuContainer,
          {
            transform: [{translateX}],
          },
        ]}>
        <TouchableOpacity style={[styles.menuItem]} onPress={handlePrevPage}>
          <Feather name="chevrons-left" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem]} onPress={handleNextPage}>
          <Feather name="chevrons-right" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem]} onPress={() => {}}>
          <Octicons name="screen-full" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem]} onPress={sharePDF}>
          <Octicons name="repo-push" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem]} onPress={() => {}}>
          <Octicons name="bookmark" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem]} onPress={() => {}}>
          <Octicons name="download" size={30} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
export default PDFViewer;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 999,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    right: 0,
    backgroundColor: '#9e80f2',
    zIndex: 400,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    marginHorizontal: 10,
  },
});
