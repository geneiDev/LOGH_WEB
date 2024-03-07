import global from '@/common/utils/global.js';
import { utils as XLSXUtils, read as XLSXRead, } from 'xlsx';
const XLSX = { utils: XLSXUtils, read: XLSXRead, };

const META_CHARACTER = {
  baseKeys : [
    'RN',               //KEY
    'CHA_CODE',         //REL_KEY
    'CHA_USEYN',        //사용여부
    'CHA_STD_NICK',     //표시명
    'CHA_STD_NAME',     //KOR_NAME
    'CHA_ENG_NAME',     //ENG_NAME
    'CHA_JAP_NAME',     //ENG_NAME
    'CHA_IMGS',
  ],
  personalKeys : [
    'CHA_BIRTH',        //탄생년도
    'CHA_NATION',       //소속국가
    'CHA_IDEA',         //개인 성향
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
  fnInitInfo(list) {
    console.info(list);
  },
  fnInitDetail(list) {
    console.info(list);
  },
  fnInitTrait(list) {
    console.info(list);
  },
  fnInitJob(list) {
    console.info(list);
  },


  fnInitCharacterData(filePath) {
    console.info('datapath', filePath);
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
      const sheetNames = workbook.SheetNames;
      sheetNames.map(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.info(sheetName, jsonData);
        let functionName = ('fn-init-' + sheetName).replace(/[-_](.)/g, (_, c) => c.toUpperCase())
          .replace(/^[a-zA-Z]/, c => c.toLowerCase());
        console.info(functionName);
        if (typeof this[functionName] === 'function') {
          return;
        } else {
          console.error(`plz create function in characterUtils -> ${functionName}`)
        }
      })
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      if( jsonData && jsonData.length > 0) {
        console.info('캐릭터 정보 onload ', jsonData.length, '-> ', jsonData);
      } else {
        console.error('캐릭터 정보 onload failed');
      }
    };
    fetch(filePath)
    .then(response => response.blob()) // 파일을 Blob으로 변환합니다.
    .then(blob => reader.readAsArrayBuffer(blob)); // FileReader를 사용해 Blob을 읽습니다.
  },





  fnGetChaKeys() {
    const resultSet = META_CHARACTER.baseKeys.concat(META_CHARACTER.personalKeys).concat(META_CHARACTER.statsKeys);
    return resultSet;
  },
  fnGetBaseKeys() {
    return META_CHARACTER.baseKeys;
  },
  fnGetBaseKeysInfo(row) {
    if(!row.CHA_CODE && !row.RN) {
      return null;
    } else {
      if(!row.CHA_CODE) {
        const formatNumber = ('000000' + row.RN).slice(-6);
        row.CHA_CODE = `CH_${formatNumber}`;
      }
      if(!row.RN) {
        const charNumber = row.CHA_CODE.replace('CH_', '');
        row.RN = parseInt(charNumber, 10);
      }
    }
    /** imgFlag > M :미치하라 카츠미판 / F : 후지사키 류 / A : 구애니 / N : 신애니 / Gn : 게임  */
    const imgFlag = ['M', 'F', 'A', 'N', 'G3', 'G4', 'G5', 'G6', 'G7', 'GB'];
    /** imgType > H : 머리만 | U : 상반신 | F : 전체  */
    const imgType = ['H', 'U', 'A']
    const imgSrc = [];
    imgFlag.forEach(flag => {
      imgType.forEach(type => {
        imgSrc.push(`images/person/${flag}N_${type}.webp`);
      });
    });
    row.CHA_IMGS = imgSrc;

    const representName = (values) => {
      for (const value of values) {
        if (value) {
          return value;
        }
      }
      return null;
    };
    this.fnGetBaseKeys().map(key => {
      const charMainName = representName([
        row['CHA_STD_NAME'],
        row['CHA_STD_NICK'],
      ]);
      //빈 값 처리
      if (!row[key]) {
        //캐릭터정보 유효 여부(필수값)
        if(key === 'RN' || key === 'CHA_CODE' || !charMainName) {
          console.error('필수값 누락 : ', key);
        }
        //캐릭터가 현재 활성화되어있는지 확인. 기본은 Y임.
        if(key === 'CHA_USEYN') {
          row[key] = 'Y';
        }
        if(key === 'CHA_JAP_NAME' || key === 'CHA_ENG_NAME') {
          row[key] = charMainName;
        }
        if(key === 'CHA_STD_NICK') {
          const nicknames = charMainName.split(' ');
          const nickname = nicknames.reduce((longest, current) => (current.length > longest.length ? current : longest), '');
          row[key] = nickname;
        }
      }
    })
    return row;
  },
  fnGetPersonalKeys() {
    return META_CHARACTER.personalKeys;
  },
  fnGetPersonalKeysInfo(row) {
    // personalKeys : [
    //   'CHA_BIRTH',        //탄생년도
    //   'CHA_NATION',       //소속국가
    //   'CHA_MORAL',        //정치 선호도
    //   'CHA_FRIEND',       //개인 진화도
    //   'CHA_AMBITION',     //야망
    //   'CHA_JOB',          //직업
    //   'CHA_MIL_EXP',      //군공
    //   'CHA_SOC_EXP',      //명성
    // ],
    
    META_CHARACTER.personalKeys.forEach(function(key) {
      // if(key === 'CHA_IDEA') {
      //   console.info('히히')
      // }
      if(!row[key]) {
        // row.key = 0;
        row[key] = 'null';
      }
      if(row[key]) {
        if(key === 'CHA_NATION') {
          const nationInfo = global.characterUtils.getNationInfo(row.CHA_NATION);
          row.CHA_NATION_NAME = (nationInfo?.name) ? nationInfo.name : '';
        }
      }
    })



    META_CHARACTER.personalKeys

    return row;
  },
  fnGetStatsKey() {
    return META_CHARACTER.statsKeys;
  },
  fnGetStatsKeyInfo(row) {
    META_CHARACTER.statsKeys.forEach(function(key) {
      if(!row[key]) {
        row[key] = 0;
      }
    }) 
    return row;
  },
  fnGetCharacterInfo(row) {
    this.fnGetBaseKeysInfo(row);
    this.fnGetPersonalKeysInfo(row);
    this.fnGetStatsKeyInfo(row);
    return row;
  },
  fnGetAge(scenBirth, charBirth) {
    const baseDate = new Date(scenBirth);
    const birthDate = new Date(charBirth);
    let age = baseDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = baseDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && baseDate.getDate() < birthDate.getDate())) {
        age--;
    }
    if(age < 0 || age > 150) {
      return '-';
    }
    return `${age.toString()}세`;
  },
  getNationInfo(CHA_NATION) {
    return global.nationUtils.getNationInfo(CHA_NATION);
  },
}
export default characterUtils