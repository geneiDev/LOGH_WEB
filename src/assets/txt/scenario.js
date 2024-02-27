// scenario.js
export const scenarioMeta = [
  {
    flag : 'T',
    idx : 1,
    date : '296. 04. 01',
    title: '튜토리얼 I',
    subtitle: '베텔기우스 전역',
    pts : 1000,
    useYn : true,
    preview : [
      '서기 2801년, 우주력 1년.\n 알데바란 성계 제2행성 테오리아를 수도로 은하연방이 건국되었다.',
      '인류는 2세기에 걸쳐 황금기를 누리며 인구, 과학, 문화를 기하급수적으로 발전시키고 더 먼 우주로 영토를 확장시킨다.',
      '그러나, 이 때부터 연방사회에 있었던 사회적 문제들이 본격적으로 터져나오기 시작했다.',
      '권태, 태만, 피로, 소극 등 부정적인 감정이 연방을 지배했고 인류사회는 이른바 \'중세적 정체(停滯)\'를 맞이하게 되었다. ',
      '새로운 발명과 발견은 명맥이 끊겼고, 민주주의는 자정능력을 잃어 중우정치로 타락했다.',
      '그 결과 변경 성역 개발 계획은 폐기되었으며, 식민지는 버려졌다.',
      '사회와 문화는 퇴폐 일로를 걸었고, 사람들은 타락하여 마약, 폭력에 빠져들었다.',
      '범죄율은 나날이 증가했고 검거율은 줄어들었으며 사람들은 도덕을 비웃고 생명을 경시했다.',
      '이렇게 연방은 서서히 썩어들어가고 있었다...',
      '마치 질식할 것만 같은 사회 분위기...',
      '지쳐가던 사람들은 모든 사회문제를 통쾌하게 해결하고 자신들이 힘겹게 지고 있던 고통을 대신 떠안아줄 \'영웅\'의 등장을 갈망하게 되었다.',
      '그리고 우주력 296년. 해적들이 들끓던 베텔기우스 지역을 평정한 \'영웅\'이 등장한다.'
    ],
    previewImg : [
      // src\assets\images\common\scenario\01\GalacticFederation.webp
      'assets/images/common/event/scenario/01/GalacticFederation.webp',
      'assets/images/common/event/scenario/01/PlvsVltra.webp',
      'assets/images/common/event/scenario/01/GalacticFederation.webp',
      'assets/images/common/event/scenario/01/GalacticFederation.webp',
      'assets/images/common/event/scenario/01/GalacticFederation.webp',
      'assets/images/common/event/scenario/01/GalacticFederation.webp',
      'assets/images/common/event/scenario/01/GalacticFederation.webp',
      'assets/images/common/event/scenario/01/GalacticFederation.webp',
      'assets/images/common/event/scenario/01/GalacticFederation.webp'
    ],
    subInfo : [

    ],
    mission: [
      { idx : 1,
        title :'해적함대를 남김없이 소탕하세요.',
        disc : ['이 시나리오는 오로지 루돌프로만 진행이 가능합니다.',
                '시나리오의 시작 시점에 루돌프는 해적의 잔당과 전투를 치르고 있습니다.',
                '전투를 성공적으로 이끄세요.',
                '살아남은 해적이 적을 수록 이후 목표에 도움이 됩니다.',
              ],
        achieveId : ['1-1']
      }
    ],
    missonAchieve: [
      { id : '1-1', 
        desc: ''
      }
    ],
    rewards: [

    ],
  },
  {
    flag : 'T',
    idx : 5,
    date : '310. 09. 05',
    title: '튜토리얼 - 정치 II',
    subtitle: '루돌프의 즉위',
    pts : 1000,
    useYn : false,
    desc : '우주력 640년, 제국력 331년. 2월\n'
          +'은하제국군은 변경지역을 순찰하던 도중 새로운 세력과 조우하게 된다.\n'
          +'순찰 함대는 크게 당황하여 제대로 된 대응도 못한 채 전멸하게 되었다는 교신만 남긴 채 사라지고 만다.\n'
          +'200여년전 탈출한 수십만명의 공화주의자들로 추정되는 이 세력을 토벌하기 위해 은하제국의 20대 황제인 프리드리히 3세는 원정군을 준비하는데...\n'
          +'640년 07월 14일. 다곤 성역 회전이 벌어질 때까지의 내정과 정치에 대한 시스템을 배워본다.\n'
  },
  {
    flag : 'T',
    idx : 6,
    date : '528. 01. 01',
    title: '튜토리얼 - 정치 III',
    subtitle: '',
    pts : 1000,
    useYn : false,
    desc : '우주력 527년, . 2월\n'
          +'자유행성동맹이 건국된지 1년이 지났다.\n'
  },
  {
    flag : 'T',
    idx : 7,
    date : '640. 07. 14',
    title: '튜토리얼 - 내정 I',
    subtitle: '다곤 성역 회전',
    pts : 1000,
    useYn : true,
    desc : '우주력 640년, 제국력 331년. 2월\n'
          +'은하제국군은 변경지역을 순찰하던 도중 새로운 세력과 조우하게 된다.\n'
          +'순찰 함대는 크게 당황하여 제대로 된 대응도 못한 채 전멸하게 되었다는 교신만 남긴 채 사라지고 만다.\n'
          +'200여년전 탈출한 수십만명의 공화주의자들로 추정되는 이 세력을 토벌하기 위해 은하제국의 20대 황제인 프리드리히 3세는 원정군을 준비하는데...\n'
          +'640년 07월 14일. 다곤 성역 회전이 벌어질 때까지의 내정과 정치에 대한 시스템을 배워본다.\n'
  },
  {
    flag : 'T',
    idx : 9,
    date : '668. 09. 01',
    title: '튜토리얼 - 내정 II',
    subtitle: '코르넬리우스 1세의 친정',
    pts : 1000,
    desc : '우주력 668년, 제국력 359년. 9월\n'
          +'전 인류를 통일하기 위한 코르넬리우스 1세의 친정도 어느 새 4개월차에 접어들고 있었다.\n'
          +'무려 58명의 원수가 동원된 친정에서 황제는 20명의 제국 원수를 잃었으나,\n'
          +'두차례의 회전을 승리하며 동맹의 수도인 하이네센을 위협하는 위치까지 도착하게 된다.\n'
          +'수도 하이네센을 포위/함락시키기 위한 준비를 하던 제국군.\n'
          +'이때, 황제에게 급보가 도착한다.\n'
          +'은하제국 수도 오딘에서 궁정 쿠데타 발생.\n'
  },
  {
    flag : 'T',
    idx : 2,
    date : '738. 03. 03',
    title: '튜토리얼 - 전투 I',
    subtitle: '파이어저드 성역 회전',
    desc : '우주력 738년, 제국력 429년. 3월\n'
          
  },
  {
    flag : 'T',
    idx : 3,
    date : '788. 05. 01',
    title: '튜토리얼 - 전투 II',
    subtitle: '엘 파실 전투',
    desc : ''
  },
  {
    flag : 'S',
    idx : 1,
    date : '792. 05. 06',
    title: '황금의 날개',
    subtitle: '제 5차 이제르론 공방전',
    desc : '제2차 티아마트 회전에서 대참패한 은하제국은 제국령과 동맹령을 연결하는 사실상 유일한 통로인 이제르론 회랑에 요새를 건설하였다.<br>'
          +'자유행성동맹 입장에서는 저 이제르론 요새를 넘지 못하면 제국령으로 침입할 수가 없었다.<br>'
          +'하지만 이제르론 요새는 함포사격으로는 피해를 줄 수 없는 두터운 장갑을 갖추고 있었고, 여기에 1만 척 이상의 주둔함대와 강력한 요새주포 토르 하머까지 있었기에 앞선 네 차례의 공세는 동맹군이 일방적으로 박살나는 것으로 마무리되었다.<br>'
          +'동맹 입장에서는 이 불명예스러운 기록을 늘리고 싶지 않았고, 이에 대병력을 동원하여 이제르론 공략 작전에 착수하였다.<br>'
  },
  {
    flag : 'S',
    idx : 2,
    date : '794. 03. 21',
    title: '천억의 별, 천억의 빛',
    subtitle: '반플리트 성역 회전',
    desc : ''
  },
  {
    flag : 'S',
    idx : 3,
    date : '794. 12. 01',
    title: '천억의 별, 천억의 빛 II',
    subtitle: '제 6차 이제르론 공방전',
    desc : ''
  },
  {
    flag : 'S',
    idx : 4,
    date : '795. 02. 06',
    title: '별을 부수는 자',
    subtitle: '제 3차 티아마트 회전',
    desc : ''
  },
  {
    flag : 'S',
    idx : 5,
    date : '795. 09. 04',
    title: '나아갈 별들의 대양',
    subtitle: '레그니처 조우전',
    desc : ''
  },
  {
    flag : 'S',
    idx : 6,
    date : '795. 09. 13',
    title: '나아갈 별들의 대양 II',
    subtitle: '제4차 티아마트 회전',
    desc : ''
  },
  {
    flag : 'S',
    idx : 7,
    date : '796. 02. 01',
    title: '영원한 밤 속에서',
    subtitle: '아스타테 회전',
    desc : ''
  },
];