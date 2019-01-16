export const enqueueSnackbar = notification => {
  const { message, options } = notification;
  const key = new Date().getTime() + Math.random();
  return ({
    type: 'ENQUEUE_SNACKBAR',
    notification: { key, message, options },
  });
}

export const removeSnackbar = key => ({ type: 'REMOVE_SNACKBAR', key, });