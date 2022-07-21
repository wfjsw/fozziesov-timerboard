import { defineStore } from 'pinia'
import { useNames } from './names'
import {systems} from '../systems.compact.js'
import moment from "moment";

export const useTimers = defineStore('timers', {
    state: () => {
        return { timers: [] }
    },
    getters: {
        timerCount: state => {
            return state.timers.length
        },
        humanReadable: state => {
            const names = useNames()
            return state.timers.map(e => ({
                type: e[1],
                system: systems[e[2]][0] ?? e[3],
                constellation: systems[e[2]][1] ?? '-',
                region: systems[e[2]][2] ?? '-',
                owner: names.maps[e[0]] ?? e[0],
                time: moment.unix(e[3]).utc(),
                defended: e[4],
                an: Math.floor((e[4]*100-4)/7)+1,
                dn: 14 - Math.floor((e[4]*100-4)/7),
            }))
        }
    },
    actions: {
        async update(timers) {
            const names = useNames()
            this.timers = timers // .sort((a, b) => a[4] - b[4])
            const ids = new Set()
            for (const timer of timers) {
                ids.add(timer[0]);
            }
            await names.resolve(...ids)
        },

        async diff(differences) {
            const names = useNames()
            const newIDs = new Set()
            for (const diff of differences) {
                switch (diff[0]) {
                    case 0:
                        this.timers = this.timers.slice(diff[1]);
                        break;
                    case 1:
                        this.timers[diff[1]][4] = diff[2];
                        break;
                    case 2:
                        this.timers.push(diff[1]);
                        newIDs.add(diff[1][0]);
                        break;
                    case 3:
                        this.timers.splice(diff[1], 1);
                        break;
                }
            }
            await names.resolve(...newIDs)
        }
    }
})
