const defaultState = { notifications: [] };

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ENQUEUE_SNACKBAR': return { notifications: state.notifications.concat(action.notification) };
    case 'REMOVE_SNACKBAR': return { notifications: state.notifications.filter(notification => notification.key !== action.key ) };
    default: return state;
  }
};
