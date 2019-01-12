const SHOW_ALL = 'SHOW_ALL';
export const show = {
  all: SHOW_ALL,
  list: 'SHOW_LIST',
  form: 'SHOW_FORM'
};

const ignore = (property, showConst) => {
  if(property.show === show.all || property.show === showConst)
    return false;
  else
    return true;
}

export const ignoreListProperties = (property) => ignore(property, show.form);
export const ignoreFormProperties = (property) => ignore(property, show.list);

export const createProperty = (id, label, type, sum, align, show = SHOW_ALL) =>
  ({ id, label, type, sum, align, show });