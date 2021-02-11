import * as plugin from '../lib/plugin.js';
import babel from '@babel/core';

import path from 'path';
import url from 'url';
import tap from 'tap';
import fs from 'fs/promises';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const simple = `${__dirname}/../fixtures/modules/simple/main.js`;
const map = `${__dirname}/../fixtures/simple.map.json`;
const err = `${__dirname}/../fixtures/faulty.map.json`;


/*
 * When running tests on Windows, the output code get some extra \r on each line.
 * Remove these so snapshots work on all OSes.
 */
const clean = str => str.split('\r').join('');

tap.test('plugin() - simple module - should replace lit-element with CDN URL', async (t) => {
    await plugin.load({
        imports: {
            'lit-element': 'https://cdn.eik.dev/lit-element/v2'
        }
    });

    const file = await fs.readFile(simple, { encoding: 'utf8' });
    const { code } = babel.transform(file, {
        plugins: [plugin.plugin()]
    });

    t.matchSnapshot(clean(code), 'basic example');

    plugin.clear();
    t.end();
});

tap.test('plugin() - import map maps non bare imports - should replace import statement with CDN URL', async (t) => {
    await plugin.load({
        imports: {
            'lit-element': 'https://cdn.eik.dev/lit-element/v2',
            './utils/dom.js': 'https://cdn.eik.dev/something/v666'
        }
    });

    const file = await fs.readFile(simple, { encoding: 'utf8' });
    const { code } = babel.transform(file, {
        plugins: [plugin.plugin()]
    });

    t.matchSnapshot(clean(code), 'non bare imports');

    plugin.clear();
    t.end();
});

tap.test('plugin() - import map maps address to a relative path - should replace import statement with relative path', async (t) => {
    await plugin.load({
        imports: {
            'lit-element': './lit-element/v2',
        }
    });

    const file = await fs.readFile(simple, { encoding: 'utf8' });
    const { code } = babel.transform(file, {
        plugins: [plugin.plugin()]
    });

    t.matchSnapshot(clean(code), 'non bare imports');

    plugin.clear();
    t.end();
});

tap.test('plugin() - import specifier is a interior package path - should replace with CDN URL', async (t) => {
    await plugin.load({
        imports: {
            'lit-element': 'https://cdn.eik.dev/lit-element/v2',
            'lit-html/lit-html': 'https://cdn.eik.dev/lit-html/v2',
            'lit-html': 'https://cdn.eik.dev/lit-html/v1',
        }
    });

    const file = await fs.readFile(simple, { encoding: 'utf8' });
    const { code } = babel.transform(file, {
        plugins: [plugin.plugin()]
    });

    t.matchSnapshot(clean(code), 'interior package path');

    plugin.clear();
    t.end();
});

tap.test('plugin() - array of import map maps - should replace import statements with CDN URLs', async (t) => {
    await plugin.load([{
        imports: {
            'lit-element': 'https://cdn.eik.dev/lit-element/v2'
        }
    },
    {
        imports: {
            './utils/dom.js': 'https://cdn.eik.dev/something/v666'
        }
    }]);

    const file = await fs.readFile(simple, { encoding: 'utf8' });
    const { code } = babel.transform(file, {
        plugins: [plugin.plugin()]
    });

    t.matchSnapshot(clean(code), 'array of maps');

    plugin.clear();
    t.end();
});

tap.test('plugin() - input is a filepath to a map file - should load map and replace import statements with CDN URLs', async (t) => {
   await plugin.load(map);

    const file = await fs.readFile(simple, { encoding: 'utf8' });
    const { code } = babel.transform(file, {
        plugins: [plugin.plugin()]
    });

    t.matchSnapshot(clean(code), 'non bare imports');

    plugin.clear();
    t.end();
});

tap.test('plugin() - input is a filepath to a map file and an inline map - should load map and replace import statements with CDN URLs', async (t) => {
    await plugin.load([
        map,
        {
            imports: {
                './utils/dom.js': 'https://cdn.eik.dev/something/v666'
            }
        }
    ]);

    const file = await fs.readFile(simple, { encoding: 'utf8' });
    const { code } = babel.transform(file, {
        plugins: [plugin.plugin()]
    });

    t.matchSnapshot(clean(code), 'non bare imports');

    plugin.clear();
    t.end();
});

tap.test('plugin() - input is a filepath to a non existing map file - should throw', async (t) => {
    t.rejects(plugin.load('./foo.map.json'), /ENOENT: no such file or directory, open 'foo.map.json'/);
    t.end();
});

tap.test('plugin() - input is a filepath to a faulty map file - should throw', async (t) => {
    t.rejects(plugin.load(err), /Unexpected end of JSON input/);
    t.end();
});
