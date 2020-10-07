const initalState = {
  counter: 4,
};

const counterReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_COUNT':
      return {
        counter: payload.counter,
      };
    default:
      return state;
  }
};

export default counterReducer;
