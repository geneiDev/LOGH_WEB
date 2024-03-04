// trait.js
const requireContext = require.context('./detail', false, /\.js$/);
const traitModules = requireContext.keys().map(requireContext);
export const traitMeta = traitModules;