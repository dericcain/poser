import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import set from 'lodash/set';
import { customAlphabet } from 'nanoid';
import { Integrations } from '@sentry/tracing';

export const createJsonWithoutFakeData = (attrs) =>
  attrs.reduce((f, c) => {
    set(f, c.name, c.type);
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

export const init = () => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    const integrations: any[] = [new Integrations.BrowserTracing()];
    if (process.env.NEXT_IS_SERVER === 'true' && process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR) {
      // For Node.js, rewrite Error.stack to use relative paths, so that source
      // maps starting with ~/_next map to files in Error.stack with path
      // app:///_next
      integrations.push(
        new RewriteFrames({
          iteratee: (frame) => {
            frame.filename = frame.filename.replace(
              process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
              'app:///',
            );
            frame.filename = frame.filename.replace('.next', '_next');
            return frame;
          },
        }),
      );
    }

    Sentry.init({
      enabled: true,
      integrations,
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      release: process.env.NEXT_PUBLIC_COMMIT_SHA,
    });
  }
};
