export const enqueueSnackbar = notification => {
  const { message, options } = notification;
  return ({
    type: 'ENQUEUE_SNACKBAR',
    notification: {
      key: new Date().getTime() + Math.random(),
      message,
      options
    },
  });
}

export const removeSnackbar = key => ({ type: 'REMOVE_SNACKBAR', key, });