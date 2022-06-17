<template>
    <span class="text-danger" v-if="isPast">
        {{ timeLeft.slice(1) }}
    </span>
    <span v-else>
        {{ timeLeft }}
    </span>
</template>

<script>
import moment from "moment";

export default {
    name: "Countdown",
    props: {
        timeEnd: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            now: moment(),
        }
    },
    created() {
        setInterval(() => this.now = moment(), 1000)
    },
    computed: {
        isPast() {
            return this.now.isAfter(this.timeEnd)
        },
        timeLeft() {
            return moment.duration(this.timeEnd.diff(this.now)).format("d:HH:mm:ss", {trim: false})
        }
    }
}
</script>

<style scoped>

</style>