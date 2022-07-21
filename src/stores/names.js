import { defineStore } from 'pinia'

export const useNames = defineStore('names', {
    state: () => {
        return { maps: {} }
    },
    actions: {
        async resolve(...ids) {
            const uniqueIDs = ids.filter(n => !Object.keys(this.maps).includes(n.toString())).map(n => parseInt(n));
            if (uniqueIDs.length === 0) return;
            const resp = await fetch('https://esi.evetech.net/latest/universe/names/?datasource=tranquility', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(uniqueIDs)
            });
            const data = await resp.json();
            for (const d of data) {
                this.maps[d.id] = d.name;
            }
        }
    },
    persist: {
        key: 'cached-names'
    },
})