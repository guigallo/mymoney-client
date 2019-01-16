const SHOW_ALL = 'SHOW_ALL';
const show = {
  all: SHOW_ALL,
  list: 'SHOW_LIST',
  form: 'SHOW_FORM'
};

const ignore = (property, showConst) => property.show === show.all || property.show === showConst ? false : true;
const ignoreListProperties = (property) => ignore(property, show.form);
const ignoreFormProperties = (property) => ignore(property, show.list);

const createProperty = (id, label, type, sum, align, required, show = SHOW_ALL) =>
  ({ id, label, type, sum, align, required, show });

export { show, ignoreListProperties, ignoreFormProperties, createProperty }