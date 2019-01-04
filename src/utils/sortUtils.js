export function asc(a, b, orderBy) {
  if (a[orderBy] < b[orderBy])
    return -1;
  if (a[orderBy] > b[orderBy])
    return 1;
  return 0;
}

export function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy])
    return -1;
  if (b[orderBy] > a[orderBy])
    return 1;
  return 0;
}

export function sortList(list, sort, sortBy) {
  if(sort === 'asc') {
    return list.sort((a, b) => {
      return asc(a, b, sortBy);
    })
  }

  if(sort === 'desc') {
    return list.sort((a, b) => {
      return desc(a, b, sortBy);
    })
  }
}