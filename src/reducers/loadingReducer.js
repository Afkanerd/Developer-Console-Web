import { LOADING } from "actions/shared";

// loading reducer
const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case LOADING:
      return action.state
    default:
      return state
  }
}

export default loadingReducer;
