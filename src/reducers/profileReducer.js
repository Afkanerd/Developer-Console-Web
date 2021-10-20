import { SAVE_PROFILE, REMOVE_PROFILE} from "actions/profile";

// profile reducer
const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_PROFILE:
      return action.profile;
    case REMOVE_PROFILE:
      return {};
    default:
      return state;
  }
};

export default profileReducer;
