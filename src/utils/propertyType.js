const SHOW_ALL = 'SHOW_ALL';
export const show = {
  all: SHOW_ALL,
  list: 'SHOW_LIST',
  form: 'SHOW_FORM'
};

const ignore = (property, showConst) => {
  if(property.show === show.all || property.show === showConst) {
    return false;
  } else {
    return true;
  }
}

export const ignoreListProperties = (property) => {
  return ignore(property, show.form);
  /*
  if(property.show === show.all || property.show === show.form) {
    return false;
  } else {
    return true;
  }*/
};

export const ignoreFormProperties = (property) => {
  return ignore(property, show.list);
  /*
  if(property.show === show.all || property.show === show.list) {
    return false;
  } else {
    return true;
  }*/
};

export const createProperty = (id, label, type, sum, align, show = SHOW_ALL) =>
  ({ id, label, type, sum, align, show });