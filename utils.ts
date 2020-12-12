import faker from 'faker';
import { set } from 'lodash';

export const createJson = (attrs) =>
  attrs.reduce((f, c) => {
    const [namespace, method] = c.type.split('.');
    const data = faker?.[namespace]?.[method]();
    set(f, c.name, data);
    return f;
  }, {});

export const makeKebab = (str: string) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((s) => s.toLowerCase())
    .join('-');
