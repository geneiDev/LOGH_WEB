// import sheepData from '@/common/utils/commonutil/sheep/sheepData.js';

const META = {
  SHEEP_LIST : {},
  FLAG_SHEEP_LIST : [],
}
const sheepUtils = {
  getSheepList() {
    META.SHEEP_LIST = [];
    const requireContext = require.context('./detail', false, /\.js$/);
    const sheepModules = requireContext.keys().reduce((acc, modulePath) => {
      const module = requireContext(modulePath);
      Object.keys(module).forEach(key => {
        acc = [...acc, ...module[key]];
      });
      return acc;
    }, []);
    META.SHEEP_LIST = sheepModules;
    return META.SHEEP_LIST;
  }
};
export default sheepUtils;