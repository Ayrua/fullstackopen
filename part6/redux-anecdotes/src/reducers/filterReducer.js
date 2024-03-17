const filterReducer = (state = { filter: "" }, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "SET_FILTER": {
      return { ...state, filter: action.filter };
    }
    default:
      return state;
  }
};

export const changeFilter = (filter) => {
  return {
    type: "SET_FILTER",
    filter: filter,
  };
};

export default filterReducer;
