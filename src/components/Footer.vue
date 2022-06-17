<template>
    <footer>
        <div class="container">
            <p class="text-center small text-white-50">{{counter}} timers currently running.</p>
            <p class="text-center small text-white-50">This site is a deployment of <a href="https://github.com/wfjsw/fozziesov-timerboard">fozziesov-timerboard</a>, fed by data from <a href="https://github.com/wfjsw/fozziesov-sse-pusher">fozziesov-sse-pusher</a>.</p>
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

</style>