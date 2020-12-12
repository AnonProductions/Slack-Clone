export const initialState = {
  user: JSON.parse(window.localStorage.getItem("user")) || null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      window.localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export default reducer;
