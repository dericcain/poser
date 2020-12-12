import faker from 'faker';
import { set } from 'lodash';

export const createJson = (attrs) =>
  attrs.reduce((f, c) => {
    const [namespace, method] = c.type.split('.');
    const data = faker?.[namespace]?.[method]();
    set(f, c.name, data);
    return f;
  }, {});
