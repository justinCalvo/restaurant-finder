const initalState = {
  notified: false,
};

const notificationReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_NOTIFICATION':
      return {
        notified: payload.notified,
      };
    default:
      return state;
  }
};

export default notificationReducer;
