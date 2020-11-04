export const updatePhotoSize = (normalSize, condensedSize) => dispatch => {
  dispatch({
    type: 'UPDATE_PHOTO_SIZE',
    payload: {
      photoSize: normalSize,
      condensedPhotoSize: condensedSize,
    },
  });
};
