import {systems} from './src/systems.mjs'
import fs from 'node:fs'

const strings = new Set();

for (const id in systems) {
    strings.add(systems[id][1]);
    strings.add(systems[id][2]);
}

const deduplicatedStrings = [...strings].sort();

for (const id in systems) {
    systems[id][1] = `%${deduplicatedStrings.indexOf(systems[id][1])}%`;
    systems[id][2] = `%${deduplicatedStrings.indexOf(systems[id][2])}%`;
}

let output = `
const dupNames = ${JSON.stringify(deduplicatedStrings)};

export const systems = ${JSON.stringify(systems)};
`

output = output.replace(/\"%(\w+)%\"/g, 'dupNames[$1]');

fs.writeFileSync('src/systems.compact.js', output);
