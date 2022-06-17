import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {useTimers} from './stores/timers'
import ReconnectingEventSource from "reconnecting-eventsource/src/reconnecting-eventsource"
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

import './main.scss'

momentDurationFormatSetup(moment)

createApp(App)
    .use(createPinia().use(piniaPluginPersistedstate))
    .mount('#app')

const timers = useTimers()

const sse = new ReconnectingEventSource("https://sovtimers.winterco.org/events");
sse.addEventListener('campaigns', function (evt) {
    const campaigns = JSON.parse(evt.data)
    timers.update(campaigns)
})