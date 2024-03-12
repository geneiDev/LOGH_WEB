// import traitData from '@/common/utils/commonutil/universe/starzoneUtils.js';

import storeUtil from '@/common/store/index.js';
// import starzoneModules from '@/common/utils/commonutil/starzone/detail/starzoneList.js';

const META = {
  scenarioId : '',
  starzoneList : [],
}
const starzoneUtils = {
  async fnInitStarzoneList(scenarioId) {
    if (META.scenarioId === scenarioId && META.starzoneList.length > 0) {
      return META.starzoneList;
    }

    // Initialize
    META.scenarioId = scenarioId;
    META.starzoneList = [];
    const userData = storeUtil.getters['storeUser/getCurrentUser'];
    const langType = userData?.langType ? userData.langType : "KR";
    console.info('언어 코드 감지 : ', langType);

    try {
      const starzoneModules = await import('@/common/utils/commonutil/starzone/detail/starzoneList.js');
      const starzoneData = starzoneModules.starzoneList;

      starzoneData.map(list => {
        // Example asynchronous operation
        setTimeout(() => {
          const requireContext = require.context('./detail', false, /planet\w+\.js$/);
          const starDtlModules = requireContext.keys().reduce((acc, modulePath) => {
            const module = requireContext(modulePath);
            Object.keys(module).forEach(key => {
              if (key.endsWith('List')) {
                acc = [...acc, ...module[key]];
              }
            });
            return acc;
          }, []);
          console.info('starDtlModules', starDtlModules);
          
          META.starzoneList.push(list);
          console.info('starzone 모듈 결과 : ', META.starzoneList);
        }, 1000);
      });
    } catch (error) {
      console.error(error);
    }

    return META.starzoneList;
  },
};
export default starzoneUtils;
