<template>
    <CircleCounter :timers="timers"/>
    <div>
        <h3>
            <vue-tags-input id="filter" v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" placeholder="Search..."/>
<!--                <input id="filter" placeholder="Filter by typing here, separate multiple terms by commas" autofocus-->
<!--                       style="position:absolute;"/>-->
            <span id="externallink" style="float:right; margin-top: 15px;">
                <a title="External link to this filter" href="#"><i class="fa fa-link"></i></a>
            </span>
        </h3>
    </div>
    <div class="table-responsive">
        <table class="table table-hover table-sm" id="timers">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>System</th>
                    <th>Region</th>
                    <th>Owner</th>
                    <th>Time</th>
                    <th>Remaining</th>
                    <th>Defender Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="timer in timers" :id="timer.id" :data-tags="timer.tags" :data-system="timer.system"
                    :key="timer.id">
                    <td class="type">{{ timer.type }}</td>
                    <td class="system">
                        <a :href="`http://evemaps.dotlan.net/search?q=${timer.system}`">
                            {{ timer.system }}
                        </a>
                    </td>
                    <td class="region">{{ timer.region }}</td>
                    <td class="owner"><a :href="`http://evemaps.dotlan.net/search?q=${timer.owner}`">{{ timer.owner }}</a></td>
                    <td class="time">{{ timer.time.format('YYYY-MM-DD HH:mm:ss') }}</td>
                    <td class="remaining" style="width: 150px;"><span style="font-family: monospace;">
                        <Countdown :time-end="timer.time"/>
                    </span></td>
                    <td class="defended" :class="{ 'text-warning': timer.defended < 0.6, 'text-success': timer.defended > 0.6 }">{{ timer.defended * 100 }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import CircleCounter from "./CircleCounter.vue";
import Countdown from "./Countdown.vue";
import VueTagsInput from '@sipec/vue3-tags-input';
import {useTimers} from "../stores/timers";

export default {
    name: "Main",
    setup() {
        const timers = useTimers()
        return {timers}
    },
    data() {
        return {
            tag: '',
            tags: [],
        }
    },
    computed: {
        timers() {
            if (this.tags.length > 0) {
                return this.timers.humanReadable.filter(timer => Object.values(timer).some(n => this.tags.some(t => n.toString().toLowerCase().includes(t.text.toLowerCase()))))
            } else {
                return this.timers.humanReadable
            }
        }
    },
    components: {CircleCounter, VueTagsInput, Countdown}
}
</script>

<style scoped>

.table a {
    color: white;
}

.vue-tags-input {
    background-color: #000 !important;
    max-width: unset !important;
    width: 100%;
}
</style>

<style lang="scss">

.vue-tags-input {
    background-color: #000;

    .ti-input {
        border: 1px solid #555 !important;
    }

    input {
        width: 100%;
        float: right;
        color: #fff;
        background-color: #000;
    }
}

</style>