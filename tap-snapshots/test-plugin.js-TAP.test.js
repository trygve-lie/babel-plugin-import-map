/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/plugin.js TAP plugin() - array of import map maps - should replace import statements with CDN URLs > array of maps 1`] = `
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
import { firstElement } from "https://cdn.eik.dev/something/v666";
import App from './app/app.js';

const ready = () => {
  return new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('app');
      resolve(firstElement(el));
    });
  });
};

const start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};

start();
`

exports[`test/plugin.js TAP plugin() - import map maps address to a relative path - should replace import statement with relative path > non bare imports 1`] = `
import { html, css } from "./lit-element/v2";
import { firstElement } from './utils/dom.js';
import App from './app/app.js';

const ready = () => {
  return new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('app');
      resolve(firstElement(el));
    });
  });
};

const start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};

start();
`

exports[`test/plugin.js TAP plugin() - import map maps non bare imports - should replace import statement with CDN URL > non bare imports 1`] = `
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
import { firstElement } from "https://cdn.eik.dev/something/v666";
import App from './app/app.js';

const ready = () => {
  return new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('app');
      resolve(firstElement(el));
    });
  });
};

const start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};

start();
`

exports[`test/plugin.js TAP plugin() - import specifier is a interior package path - should replace with CDN URL > interior package path 1`] = `
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
import { firstElement } from './utils/dom.js';
import App from './app/app.js';

const ready = () => {
  return new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('app');
      resolve(firstElement(el));
    });
  });
};

const start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};

start();
`

exports[`test/plugin.js TAP plugin() - input is a filepath to a map file - should load map and replace import statements with CDN URLs > non bare imports 1`] = `
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
import { firstElement } from './utils/dom.js';
import App from './app/app.js';

const ready = () => {
  return new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('app');
      resolve(firstElement(el));
    });
  });
};

const start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};

start();
`

exports[`test/plugin.js TAP plugin() - input is a filepath to a map file and an inline map - should load map and replace import statements with CDN URLs > non bare imports 1`] = `
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
import { firstElement } from "https://cdn.eik.dev/something/v666";
import App from './app/app.js';

const ready = () => {
  return new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('app');
      resolve(firstElement(el));
    });
  });
};

const start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};

start();
`

exports[`test/plugin.js TAP plugin() - simple module - should replace lit-element with CDN URL > basic example 1`] = `
import { html, css } from "https://cdn.eik.dev/lit-element/v2";
import { firstElement } from './utils/dom.js';
import App from './app/app.js';

const ready = () => {
  return new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('app');
      resolve(firstElement(el));
    });
  });
};

const start = async () => {
  const el = await ready();
  const app = new App(el);
  app.render();
  app.update();
};

start();
`
