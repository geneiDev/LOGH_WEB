// global.js -- src\common\utils\global.js
import CONST from '@/common/utils/commonutil/store/const';
import errorHandler from '@/common/utils/errorHandler/errorHandler.js';

import nationUtils from '@/common/utils/commonutil/nation/nationUtils.js';
import characterUtils from '@/common/utils/commonutil/character/characterUtils.js';
import traitUtils from '@/common/utils/commonutil/trait/traitUtils.js';
import sheepUtils from '@/common/utils/commonutil/sheep/sheepUtils.js';
import scenarioUtils from '@/common/utils/commonutil/scenario/scenarioUtils.js';
import starzoneUtils from '@/common/utils/commonutil/starzone/starzoneUtils.js';

export default {nationUtils, characterUtils, scenarioUtils, traitUtils, starzoneUtils, sheepUtils, CONST, errorHandler}