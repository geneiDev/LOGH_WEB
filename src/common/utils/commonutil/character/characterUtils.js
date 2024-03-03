import global from '@/common/utils/global.js';
const META_CHARACTER = {
  baseKeys : [
    'RN',               //KEY
    'CHA_CODE',         //REL_KEY
    'CHA_USEYN',        //사용여부
    'CHA_STD_NICK',     //표시명
    'CHA_STD_NAME',     //KOR_NAME
    'CHA_ENG_NAME',     //ENG_NAME
    'CHA_JAP_NAME',     //ENG_NAME
  ],
  personalKeys : [
    'CHA_BIRTH',        //탄생년도
    'CHA_NATION',       //소속국가
    'CHA_MORAL',        //정치 선호도
    'CHA_FRIEND',       //개인 진화도
    'CHA_AMBITION',     //야망
    'CHA_JOB',          //직업
    'CHA_MIL_EXP',      //군공
    'CHA_SOC_EXP',      //명성
  ],
  statsKeys : [
    'CHA_ST_CMD',       //지휘
    'CHA_ST_CSM',       //통솔
    'CHA_ST_ATT',       //공격
    'CHA_ST_DEF',       //방어
    'CHA_ST_FST',       //기동
    'CHA_ST_MNG',       //운영
    'CHA_ST_AFG',       //공전
    'CHA_ST_GFG',       //육전
    'CHA_ST_INF',       //정보
    'CHA_ST_MMP',       //전투공작
    'CHA_ST_NMP',       //전투공작 회복치
    'CHA_ST_MSP',       //정치공작
    'CHA_ST_NSP',       //정치공작 회복치
  ]
}
const characterUtils = {
  fnGetChaKeys() {
    const resultSet = META_CHARACTER.baseKeys.concat(META_CHARACTER.personalKeys).concat(META_CHARACTER.statsKeys);
    return resultSet;
  },
  fnGetBaseKeys() {
    return META_CHARACTER.baseKeys;
  },
  fnGetPersonalKeys() {
    return META_CHARACTER.personalKeys;
  },
  fnGetStatsKey() {
    return META_CHARACTER.statsKeys;
  },
  getAge(charBirth) {
    console.info(global);
    console.info(charBirth);
    let age;
    return age;
  }
}
export default characterUtils