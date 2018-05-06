export const sortPollsByProperty = (polls, prop, order = 'desc') => {
  if (order === 'desc') {
    return polls.sort((a, b) => {
      if (prop === 'date') {
        return Date.parse(b[prop]) - Date.parse(a[prop]);
      }

      return b[prop] - a[prop];
    });
  } else if (order === 'asc') {
    return polls.sort((a, b) => {
      if (prop === 'date') {
        return Date.parse(a[prop]) - Date.parse(b[prop]);
      }

      return a[prop] - b[prop];
    });
  }
};
