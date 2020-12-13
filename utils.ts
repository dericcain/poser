import faker from 'faker';
import { set } from 'lodash';
import { customAlphabet } from 'nanoid';

export const createJson = (attrs, useFakeData = true) =>
  attrs.reduce((f, c) => {
    if (useFakeData) {
      const [namespace, method] = c.type.split('.');
      const data = faker?.[namespace]?.[method]();
      set(f, c.name, data);
    } else {
      set(f, c.name, c.type);
    }
    return f;
  }, {});

export const makeKebab = (str: string) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((s) => s.toLowerCase())
    .join('-');

export const id = customAlphabet(
  '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  12,
);
