const initalState = {
  photoSize: 0,
  condensedPhotoSize: 0,
};

const photoSizeReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_PHOTO_SIZE':
      return {
        photoSize: payload.photoSize,
        condensedPhotoSize: payload.condensedPhotoSize,
      };
    default:
      return state;
  }
};

export default photoSizeReducer;
