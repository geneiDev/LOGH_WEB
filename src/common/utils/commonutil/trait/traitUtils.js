// import traitData from '@/common/utils/commonutil/trait/traitData.js';

const META_TRAIT = {
  LIST : [
    
  ],
  
}
const traitUtils = {
  getTraitList() {
    const requireContext = require.context('./detail', false, /\.js$/);
    const traitModules = requireContext.keys().map(requireContext);
    traitModules.map(list => {
      const traits = list.traitList;
      traits.map(row =>  {
        console.info(row)
      })
      META_TRAIT.LIST = META_TRAIT.LIST.concat(traits)
    })
    console.info(META_TRAIT.LIST)
  },
  getTraitInfo(id) {
    console.info(id, META_TRAIT)
  },
}
export default traitUtils