import ValuationConstant from '../constants/valuation.constants';

const initialState = {
  formStage: ValuationConstant.STEP_1,
  data: {
    sellUrl: '',
    category: '',
    name: '',
    month: '',
    year: '',
    country: '',
    state: '',
    industry: '',
  },
};

export function Valuation(state = initialState, { type, payload }) {
  switch (type) {
    case ValuationConstant.RESET:
      return initialState;
    case ValuationConstant.STEP_1:
      return {
        formStage: ValuationConstant.STEP_2,
        data: {
          ...state.data,
          sellUrl: payload,
        },
      };
    case ValuationConstant.STEP_2:
      return {
        formStage: ValuationConstant.STEP_3,
        data: {
          ...state.data,
          category: payload,
        },
      };
    case ValuationConstant.RESET_STEP_1:
      return initialState;
    case ValuationConstant.RESET_STEP_2:
      return {
        formStage: ValuationConstant.STEP_2,
        data: {
          ...state.data,
          category: '',
        },
      };
    case ValuationConstant.RESET_STEP_3:
      return {
        formStage: ValuationConstant.STEP_3,
        data: {
          ...state.data,
          name: '',
          month: '',
          year: '',
          country: '',
          state: '',
          industry: '',
        },
      };
    default: {
      return state;
    }
  }
}
