// action types and creators for profiles
export const SAVE_PROFILE = "SAVE_PROFILE";
export const REMOVE_PROFILE = "REMOVE_PROFILE";

export const saveProfileAction = (profile) => {
  return {
    type: SAVE_PROFILE,
    profile,
  };
};

export const removeProfileAction = () => {
  return {
    type: REMOVE_PROFILE,
  };
};
