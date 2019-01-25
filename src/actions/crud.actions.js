export const deleteObj = (id, type) => {
  console.log(id);
  console.log(type);
  console.log('delete na action');
  const toReducer = { type, id };
  console.log(toReducer)
  return toReducer
};