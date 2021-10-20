
export const LOADING = "LOADING";

export const loadingAction = (state) => {
    return {
      type: LOADING,
      state
    };
  };