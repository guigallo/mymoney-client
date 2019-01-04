export const listUsers = (list) => {
  return { type: 'LIST', list, sort: 'asc', sortBy: 'name', key: new Date().getTime() }
}