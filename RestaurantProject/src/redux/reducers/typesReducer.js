const initalState = {
  typeName: 'Restaurants',
};

const typesReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_TYPE':
      return {
        typeName: payload.typeName,
      };
    default:
      return state;
  }
};

export default typesReducer;
