const ERROR_CODES = [
  { code : 'SE000',
    text : '브라우져에서 사용자 정보를 생성하는데 실패했습니다.',
    type : 'SERVER',
    priority : true,
  },
  { code : 'SE001',
    text : '로그인 서버에 접속할 수 없습니다.',
    type : 'SERVER',
    priority : false,
  },
  
]

function getErrorInfo(code) {
  try {
    const error = ERROR_CODES.find(error => error.code === code);
    return error ? { ...error } : null;
  } catch (e) {
    console.error('Error occurred while getting error info:', e);
    return null;
  }
}
export default getErrorInfo;
