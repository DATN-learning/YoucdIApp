import React, {FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
  BackHandler,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
// ? import screens
import HomeScreen from '../../screens/LearnSpace/HomeScreen';
import QAndAStack from '../QAndA/QAndA';
import PersonalScreen from '../../screens/LearnSpace/PersonalScreen';
import TournamentsScreen from '../../screens/LearnSpace/TournamentsScreen';
import Icon, {Icons} from '../../components/Icon';

export type LearnNavigationParamList = {
  Home: undefined;
  QAndAStack: undefined;
  Tournaments: undefined;
  Individual: undefined;
};
const TabArr = [
  {
    routeName: 'Home',
    screen: HomeScreen,
    label: 'Nhà',
    activeIcon: 'home',
    inactiveIcon: 'home',
    typeIcon: Icons.Octicons,
    tabBarColor: '#9e80f2',
  },
  {
    routeName: 'QAndA',
    screen: QAndAStack,
    label: 'Hỏi đáp',
    activeIcon: 'wechat',
    inactiveIcon: 'wechat',
    typeIcon: Icons.AntDesign,
    tabBarColor: '#54ec3c',
  },
  {
    routeName: 'Tournaments',
    screen: TournamentsScreen,
    label: 'Giải đấu',
    activeIcon: 'CodeSandbox',
    inactiveIcon: 'CodeSandbox',
    typeIcon: Icons.AntDesign,
    tabBarColor: '#d0e422',
  },
  {
    routeName: 'Individual',
    screen: PersonalScreen,
    label: 'Cá nhân',
    activeIcon: 'user',
    inactiveIcon: 'user',
    typeIcon: Icons.AntDesign,
    tabBarColor: '#ee2a2a',
  },
];

const {width} = Dimensions.get('window');
const MARGIN = 16;
const TAB_BAR_WIDTH = width - MARGIN * 2;
const TAB_WIDTH = TAB_BAR_WIDTH / TabArr.length;

function MyTabBar({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const [translateX] = React.useState(new Animated.Value(0));

  const translateTab = (index: number) => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    translateTab(state.index);
  }, [state.index]);

  return (
    <View style={styles.tabBarContainer}>
      <Animated.View style={[styles.slidingTabContainer, {}]}>
        <Animated.View
          style={[
            styles.slidingTab,
            {
              transform: [{translateX}],
              backgroundColor: TabArr[state.index].tabBarColor,
            },
          ]}
        />
      </Animated.View>

      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const tabBarIcon = options.tabBarIcon;
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <TabIcon
              index={state.index}
              isFocused={isFocused}
              tabIcon={tabBarIcon}
              label={label}
              tabColor={options.tabColor}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabIcon = ({
  isFocused,
  tabIcon,
  label,
  index,
  tabColor,
}: {
  isFocused: boolean;
  tabIcon: any;
  label: string;
  index: number;
  tabColor: string;
}) => {
  const [translateY] = React.useState(new Animated.Value(0));

  const translateIcon = (val: number) => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    if (isFocused) {
      translateIcon(-14);
    } else {
      translateIcon(0);
    }
  }, [isFocused]);
  return (
    <>
      <Animated.View
        style={{
          transform: [{translateY}],
        }}>
        <Icon
          name={isFocused ? tabIcon.activeIcon : tabIcon.inactiveIcon}
          type={tabIcon.typeIcon}
          size={24}
          color={isFocused ? '#ffffff' : tabColor}
        />
      </Animated.View>
      <Text style={{color: isFocused ? tabColor : '#222'}}>{label}</Text>
    </>
  );
};

const Tab = createBottomTabNavigator<LearnNavigationParamList>();

const LearnNavigation: FC = () => {
  const navigation = useNavigation();
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        Alert.alert('Thoát?', 'Bạn Muốn Thoát Ứng Dụng?', [
          {text: 'Hủy', style: 'cancel', onPress: () => {}},
          {
            text: 'Thoát',
            style: 'destructive',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
      }),
    [navigation],
  );
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      {TabArr.map((item: any, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.routeName}
            component={item.screen}
            options={{
              tabBarLabel: item.label,
              tabBarColor: item.tabBarColor,
              tabColor: item.tabBarColor,
              tabBarIcon: {
                activeIcon: item.activeIcon,
                inactiveIcon: item.inactiveIcon,
                typeIcon: item.typeIcon,
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default LearnNavigation;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    width: TAB_BAR_WIDTH,
    height: 60,
    position: 'absolute',
    alignSelf: 'center',
    bottom: MARGIN,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  slidingTabContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  slidingTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#673ab7',
    bottom: 25,
    borderWidth: 4,
    borderColor: 'white',
  },
});
