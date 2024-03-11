// import store from '@/common/store';
import global from '@/common/utils/global.js';
// import store from '@/common/store/index.js';
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
  async fnInitCharacterData(filePath) {
    console.info('fnInitCharacterData START')
    const arrayBuffer = await this.readFileAsArrayBuffer(filePath);
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
    const sheetNames = workbook.SheetNames;
    for (const sheetName of sheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      let functionName = ('fn-init-' + sheetName).replace(/[-_](.)/g, (_, c) => c.toUpperCase()).replace(/^[a-zA-Z]/, c => c.toLowerCase());
      console.info('CALL ', functionName);
      if (functionName === 'fnInitInfo') {
        await this.fnInitInfo(jsonData);
      } else if (functionName === 'fnInitDetail') {
        await this.fnInitDetail(jsonData);
      } else if (functionName === 'fnInitTrait') {
        await this.fnInitTrait(jsonData);
      } else if (functionName === 'fnInitJob') {
        await this.fnInitJob(jsonData);
      } else {
        console.error(`create function >> ${functionName}`);
      }
    }
    console.info('fnInitCharacterData END');
    return DATA.characterList;
  },
  readFileAsArrayBuffer(filePath) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      
      fetch(filePath)
        .then(response => response.blob())
        .then(blob => reader.readAsArrayBuffer(blob))
        .catch(reject);
    });
  },
  /** @DEPTH1 */
  //SET MAIN INFO LIST
  async fnInitInfo(list) {
    await Promise.all(list.map(row => this.fnGetCharacterInfo(row)));
    DATA.characterList = list;
    console.info('fnInitInfo END');
    return true;
  },
    
  //SET DETAIL INFO LIST
  async fnInitDetail(list) {
    DATA.characterList.map(row => {
      if (row.CHA_USEYN === 'Y') {
        const matchingDetails = list.filter(item => item.RN === row.RN);
        return { ...row, TRAIT: matchingDetails };
      }
      return row;
    });
    console.info('fnInitDetail END');
  },
  
  //SET MAIN INFO LIST -> ROW
  async fnGetCharacterInfo(row) {
    // 동시에 호출되도록 Promise.all 사용
    await Promise.all([
      this.fnGetBaseKeysInfo(row),
      this.fnGetPersonalKeysInfo(row),
      this.fnGetStatsKeyInfo(row),
    ]);
    return row;
  },
  //SET MAIN INFO LIST -> ROW -> BASE_KEY
  async fnGetBaseKeysInfo(row) {
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
    META_CHARACTER.baseKeys.map(key => {
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
    // const imgFlag = ['M', 'F', 'A', 'N', 'G3', 'G4', 'G5', 'G6', 'G7', 'GB'];
    const imgFlag = ['N'];
    /** imgType > H : 머리만 | U : 상반신 | F : 전체  */
    const imgType = ['H']

    const imgSrc = [];

    async function checkImgExist(url) {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => {
          resolve(false); // 이미지 로딩에 실패했음을 명시적으로 resolve
        };
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
    console.info(row.RN, row.CHA_IMGS);
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
          row[key] = '-';
        }
        if(key === 'CHA_NATION') {
          row[key] = '';
        }
      }
      if(row[key]) {
        // if(key === 'CHA_BIRTH') {
        // }
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
  //SET TRAIT INFO LIST
  async fnInitTrait(list) {
    DATA.characterList.map(row => {
      if (row.CHA_USEYN === 'Y') {
        const matchingTraits = list.filter(item => item.RN === row.RN);
        // matchingTraitInfo(matchingTraits); // matchingTraitInfo 함수가 비동기로 처리되기 때문에 await 필요 없음
        if(matchingTraits.length > 0) {
          console.info('matchingTraits:', matchingTraits)
        }
        return { ...row, TRAIT: matchingTraits };
      }
      return row;
    });
    console.info('fnInitTrait END');
  },
  //SET TRAIT INFO LIST
  async fnInitJob(list) {
    DATA.characterList.map(row => {
      if (row.CHA_USEYN === 'Y') {
        const matchingJobs = list.filter(item => item.RN === row.RN);
        // matchingTraitInfo(matchingTraits); // matchingTraitInfo 함수가 비동기로 처리되기 때문에 await 필요 없음
        return { ...row, JOBS : matchingJobs };
      }
      return row;
    });
    console.info('fnInitJob END');
  },

  fnGetAge(scenBirth, charBirth) {
    const baseDate = new Date(scenBirth);
    const birthDate = new Date(charBirth);
    let age = baseDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = baseDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && baseDate.getDate() < birthDate.getDate())) {
        age--;
    }
    if(!isNaN(age) ||age < 0 || age > 150) {
      return '-';
    }
    return `${age.toString()}세`;
  },
  getNationInfo(CHA_NATION) {
    return global.nationUtils.getNationInfo(CHA_NATION);
  },
}
export default characterUtils