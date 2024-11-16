export const apiRouters = {
  loginByGmail: '/api/auth/login',
  registerAccount:'/api/auth/resgister',
  loginByToken: '/api/auth/checktoken',
  getClassRoom: '/api/classroom',
  getChapterSubject: '/api/classroom/getChapterSubject',
  getChapterExercises: '/api/classroom/getChapterExercises',
  getLessionById: '/api/classroom/getLessionById',
  logout: '/api/auth/logout',
  createPostQuestion: '/api/manapost/createPostQuestion',
  getPostByClassAndSub: '/api/manapost/getPostQuestion',
  getPostById: '/api/manapost/getPostQuestionById',
  getCommentByPost: 'api/manapost/getCommentPost',
  createCommentPost: 'api/manapost/createCommentPost',
  createDeviceToken: 'api/tokennotification',

  //
  submitChapterAnswer: 'api/question/submitedChapterAnswer'
};
