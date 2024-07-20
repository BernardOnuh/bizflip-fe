import valuationConstants from '../constants/valuation.constants';

const ValuationActions = {
  resetAll,
  resetStageOne,
  resetStageTwo,
  setStageOne,
  setStageTwo,
  setStageThree,
};

function setStageOne(sellUrl) {
  return { type: valuationConstants.STEP_1, payload: sellUrl };
}

function resetStageOne() {
  return { type: valuationConstants.RESET_STEP_1 };
}

function setStageTwo(category) {
  return { type: valuationConstants.STEP_2, payload: category };
}

function resetStageTwo() {
  return { type: valuationConstants.RESET_STEP_2 };
}

function setStageThree(payload) {
  return { type: valuationConstants.STEP_3, payload };
}

function resetAll() {
  return { type: valuationConstants.RESET };
}

export default ValuationActions;
