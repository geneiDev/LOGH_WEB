const META_NATION = {
  NAME : [
    { ID: 'EUG', kr: '지구통일정부', jp: '地球統一政府', en: 'Earth Unified Government' },
    { ID: 'SSG', kr: '시리우스 성계 정부', jp: '天狼星星系 政府', en: 'Sirius StarSystem Governmen' },
    { ID: 'BFF', kr: '흑기군', jp: '黒旗軍', en: 'Black Flag Force' },
    { ID: 'GFD', kr: '은하연방', jp: '銀河連邦', en: 'Galactic Federation' },
    { ID: 'FPA', kr: '자유행성동맹', jp: '自由惑星同盟', en: 'Free Planets Alliance' },
    { ID: 'SMC', kr: '구국군사회의', jp: '救國軍事會議', en: 'National Salvation Military Council' },
    { ID: 'EIG', kr: '엘 파실 독립정부', jp: 'エル・ファシル独立政府', en: 'El Facil Independent Government' },
    { ID: 'IRC', kr: '이제르론 공화정부', jp: 'イゼルローン共和政府', en: 'Iserlohn Republic' },
    { ID: 'TGE', kr: '은하제국', jp: '銀河帝国', en: 'The Galactic Empire' },
    { ID: 'NGE', kr: '은하제국', jp: '新銀河帝国', en: 'New Galactic Empire' },
    { ID: 'LSC', kr: '립슈타트 귀족연합', jp: 'リップシュタット連盟', en: 'Lippstadt Conspiracy' },
    { ID: 'LGG', kr: '은하제국 정통정부', jp: '銀河帝国正統政府', en: 'Legitimate Galactic Empire Government' },
    { ID: 'NLG', kr: '노이에란트 총독부', jp: '新...', en: 'Neue Land Governorate' },
    { ID: 'BSD', kr: '바라트 성계 자치령', jp: '新...', en: 'Ba`alat Starzone Dominion' },
    { ID: 'TER', kr: '지구교', jp: '地球教', en: 'Terraism' },
    { ID: 'DOP', kr: '페잔 자치령', jp: 'フェザーン自治領', en: 'Dominion of Phezzan' },
  ],
  
}
const nationUtils = {
  getNationInfo(id) {
    console.info('nationUtils.getNationInfo', id);
    const name = META_NATION.NAME.find(item => item.ID === id).kr;
    return {
      id : id,
      name : name
    };
  }
}
export default nationUtils