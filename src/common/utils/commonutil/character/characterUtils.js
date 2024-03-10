import global from '@/common/utils/global.js';
import { utils as XLSXUtils, read as XLSXRead, } from 'xlsx';
const XLSX = { utils: XLSXUtils, read: XLSXRead, };

const DATA = {
  characterList : [],
}
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
    'CHA_TENDENCY',     //성향 코드
    'CHA_ACTIVE',       //적극성
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
  ],
}
const characterUtils = {
  //GET CHAR DATA FROM DB
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
        let functionName = ('fn-init-' + sheetName).replace(/[-_](.)/g, (_, c) => c.toUpperCase())
          .replace(/^[a-zA-Z]/, c => c.toLowerCase());
        if (typeof this[functionName] === 'function') {
          console.info('call ',functionName);
          this[functionName](jsonData);
        } else {
          console.error(`plz create function in characterUtils -> ${functionName}`)
        }
      })
    };
    fetch(filePath)
    .then(response => response.blob()) // 파일을 Blob으로 변환합니다.
    .then(blob => reader.readAsArrayBuffer(blob)); // FileReader를 사용해 Blob을 읽습니다.
  },
  //SET MAIN INFO LIST
  fnInitInfo(list) {
    list.map(row => {
      this.fnGetCharacterInfo(row);
    })
    DATA.characterList = list;
  },
  //SET MAIN INFO LIST -> ROW
  async fnGetCharacterInfo(row) {
    await this.fnGetBaseKeysInfo(row);
    await this.fnGetPersonalKeysInfo(row);
    await this.fnGetStatsKeyInfo(row);
    return row;
  },
  //SET MAIN INFO LIST -> ROW -> BASE_KEY
  fnGetBaseKeysInfo(row) {
    //CHA_CODE & RN
    if(!row.CHA_CODE && !row.RN) {
      const errorMsg = `KEY값을 추출할 수 없는 ROW입니다. ${JSON.stringify(row)}`
      console.info(errorMsg)
      row.ERROR = errorMsg;
      return row;
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
    //NAME SET
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
        if(key === 'CHA_JAP_NAME') {
          if(row['CHA_ENG_NAME']) {
            row[key] = row['CHA_ENG_NAME'];
          } else {
            row[key] = charMainName;
          }
        }
        if(key === 'CHA_ENG_NAME') {
          if(row['CHA_JAP_NAME']) {
            row[key] = row['CHA_JAP_NAME'];
          } else {
            row[key] = charMainName;
          }
        }
        if(key === 'CHA_STD_NICK') {
          const nicknames = charMainName.split(' ');
          const nickname = nicknames.reduce((longest, current) => (current.length > longest.length ? current : longest), '');
          row[key] = nickname;
        }
      }
    })
    //USE_YN
    if(!row.CHA_USEYN || row.CHA_USEYN === 'N') {
      row.CHA_USEYN = 'N';
      return;
    }
    //IMG_SET
    /** imgFlag > M :미치하라 카츠미판 / F : 후지사키 류 / A : 구애니 / N : 신애니 / Gn : 게임  */
    const imgFlag = ['M', 'F', 'A', 'N', 'G3', 'G4', 'G5', 'G6', 'G7', 'GB'];
    /** imgType > H : 머리만 | U : 상반신 | F : 전체  */
    const imgType = ['H', 'U', 'A']

    const imgSrc = [];
    async function checkImgExist(url) {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    }
    async function processImages() {
      for (const flag of imgFlag) {
        for (const type of imgType) {
          const imgUrl = `images/person/${row.CHA_CODE}${flag}_${type}.webp`;
          if (await checkImgExist(imgUrl)) {
            const imgData = {
              imgFlg : `${flag}${type}`,
              imgSrc : imgUrl
            }
            imgSrc.push(imgData);
          }
        }
      }
    }
    processImages();
    row.CHA_IMGS = imgSrc;
    return row;
  },
  //SET MAIN INFO LIST -> ROW -> PERSONAL_KEY
  fnGetPersonalKeysInfo(row) {
    if(row.CHA_USEYN == 'N') {
      return row;
    }
    META_CHARACTER.personalKeys.forEach(function(key) {
      if(!row[key]) {
        if(key === 'CHA_BIRTH') {
          row[key] = 0;
        }
        if(key === 'CHA_NATION') {
          row[key] = '';
        }
      }
      if(row[key]) {
        if(key === 'CHA_NATION') {
          const nationInfo = global.characterUtils.getNationInfo(row.CHA_NATION);
          row.CHA_NATION_NAME = (nationInfo?.name) ? nationInfo.name : '';
        }
      }
    })
    return row;
  },
  fnGetStatsKeyInfo(row) {
    if(row.CHA_USEYN == 'N') {
      return row;
    }
    META_CHARACTER.statsKeys.forEach(function(key) {
      if(!row[key]) {
        row[key] = 0;
      }
    })
    return row;
  },
  //SET DETAIL INFO LIST
  async fnInitDetail(list) {
    DATA.characterList.map(row => {
      if (row.CHA_USEYN === 'Y') {
        const matchingDetails = list.filter(item => item.RN === row.RN);
        return { ...row, DETAIL: matchingDetails };
      }
      return row;
    });
  },
  //SET TRAIT INFO LIST
  async fnInitTrait(list) {
    DATA.characterList.map(row => {
      if (row.CHA_USEYN === 'Y') {
        const matchingTraits = list.filter(item => item.RN === row.RN);
        // matchingTraitInfo(matchingTraits); // matchingTraitInfo 함수가 비동기로 처리되기 때문에 await 필요 없음
        row = { ...row, TRAIT: matchingTraits };
        // console.info(row.RN, matchingTraits);
        return row;
      }
      return row;
    });
    console.info('fnInitTrait ',list)
  },
  //SET TRAIT INFO LIST
  async fnInitJob(list) {
    console.info(DATA.characterList)
    console.info(list)
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