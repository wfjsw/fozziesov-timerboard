import { defineStore } from 'pinia'
import { useNames } from './names'
import {systems} from '../systems'
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
                type: e[2].replace(/_defense/, '').toUpperCase(),
                system: systems[e[3]][1] ?? e[3],
                region: systems[e[3]][2] ?? '-',
                owner: names.maps[e[1]] ?? e[1],
                time: moment.unix(e[4]).utc(),
                defended: e[5],
                an: Math.floor((e[5]*100-4)/7)+1,
                dn: 14 - Math.floor((e[5]*100-4)/7),
            }))
        }
    },
    actions: {
        async update(timers) {
            const names = useNames()
            this.timers = timers.sort((a, b) => a[4] - b[4])
            const ids = new Set()
            for (const timer of timers) {
                ids.add(timer[1]);
            }
            await names.resolve(...ids)
        }
    }
})