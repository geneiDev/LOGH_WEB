// import traitData from '@/common/utils/commonutil/trait/traitData.js';

const META_TRAIT = {
  INFO : {  
    code : '',
    ico : '',
    type : '',
    name : '',
    desc : '',
    effect : '',
  },
  LIST : [],
}
const traitUtils = {
  getTraitList(langType) {
    META_TRAIT.LIST = [];
    if(!langType) {
      langType = '';
    }
    const requireContext = require.context('./detail', false, /\.js$/);
    const traitModules = requireContext.keys().map(requireContext);
    traitModules.map(list => {
      const traits = list.traitList;
      META_TRAIT.LIST = META_TRAIT.LIST.concat(traits)
    })
    return META_TRAIT.LIST;
  },
  getTraitInfo(id) {
    console.info(id, META_TRAIT)
    
  },
}
export default traitUtils