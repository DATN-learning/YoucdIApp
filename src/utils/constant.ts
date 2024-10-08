
const url='http://192.168.1.125'

export const configs = {
  apiLink: `${url}:8000`,
  apiWebSocketLink: `${url}:3000`,
};

const LinkImage = [
  `${configs.apiLink}${'/images/bg_login_1.png'}`,
];

export const AppColors = {
  purple: '#9e80f2',
  purpleLight: '#bba7f1',
};

export const GIFJSON = {
  Loading: require('../assets/jsons/loadinglottie.json'),
  Galaxy: require('../assets/jsons/4441-galaxy-orbit-animation.json'),
  Studying: require('../assets/jsons/60169-study-online.json'),
  Loading2: require('../assets/jsons/97943-loading.json'),
  Start: require('../assets/jsons/124164-start-button-hovering.json'),
  Loading3: require('../assets/jsons/99387-loading.json'),
  Countdown1: require('../assets/jsons/countdown1.json'),
};
export const IMAGE = {
  BgLogin1: require('../assets/images/bg_login_1.png'),
};
export const IMAGE_API = {
  BgLogin1: LinkImage[0],
  BgLogin2: LinkImage[0],
};

export const IMAGE_BG_LOGIN =
  LinkImage[Math.floor(Math.random() * LinkImage.length)];
