<template>
    <footer>
        <div class="container">
            <p>{{counter}} timers currently running.</p>
            <p>This site is a deployment of <a href="https://github.com/wfjsw/fozziesov-timerboard">fozziesov-timerboard</a>, fed by data from <a href="https://github.com/wfjsw/fozziesov-sse-pusher">fozziesov-sse-pusher</a>.</p>
        </div>
    </footer>
</template>

<script>
import {useTimers} from '../stores/timers.js'
export default {
    name: "Footer",
    setup() {
        const timers = useTimers()
        return {timers}
    },
    computed: {
        counter() {
            return this.timers.timerCount
        }
    },

}
</script>

<style scoped>

p {
    --bs-text-opacity: 1;
    color: rgba(255, 255, 255, 0.5) !important;
    text-align: center !important;
    font-size: .875em;
}

</style>
