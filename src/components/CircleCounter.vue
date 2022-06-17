<template>
    <div class="counters">
        <div class="circleboxcontainer">
            <div class="circlebox-small">
                <KnobControl id="uncontested" :value="uncontested" class="dial" :readOnly="true" :strokeWidth="5"
                       size="100%" primaryColor="#8B4513" secondaryColor="#282828" text-color="#8B4513"/>
                <p class="label" style="color: #8B4513">Uncontested</p>
            </div>
            <div class="circlebox">
                <KnobControl id="active" :value="active" class="dial" :readOnly="true" :strokeWidth="5"
                             size="100%" primaryColor="#ff1a1a" secondaryColor="#282828" text-color="#ff1a1a"/>
                <p class="label" style="color: #ff1a1a">Active</p>
            </div>
            <div class="circlebox">
                <KnobControl id="upcoming" :value="upcoming" class="dial" :readOnly="true" :strokeWidth="5"
                             size="100%" primaryColor="#87CEEB" secondaryColor="#282828" text-color="#87CEEB"/>
                <p class="label" style="color: #87CEEB">Upcoming</p>
            </div>
            <div class="circlebox-small">
                <KnobControl id="start" :value="start" class="dial" :readOnly="true" :strokeWidth="5"
                             size="100%" primaryColor="#FF8C00" secondaryColor="#282828" text-color="#FF8C00"/>
                <p class="label" style="color: #FF8C00">Start in &lt;4hrs</p>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import KnobControl from 'vue-knob-control/src/KnobControl.vue'

export default {
    name: "CircleCounter",
    props: {
        timers: {
            type: Array,
            required: true
        },
        now: {
            type: Object,
            required: true
        }
    },
    components: {
        KnobControl
    },
    computed: {
        uncontested() {
            return this.timers.filter(n => n.time.isBefore(this.now) && n.defended === 0.6).length
        },
        active() {
            return this.timers.filter(n => n.time.isBefore(this.now)).length
        },
        upcoming() {
            return this.timers.filter(n => n.time.isSameOrAfter(this.now)).length
        },
        start() {
            return this.timers.filter(n => n.time.isBefore(moment(this.now).subtract(4, 'hours'))).length
        },
    }
}
</script>

<style scoped>
.counters {
    display: flex;
    height: 150px;
}

.circlebox {
    /*width: 100px;*/
    float: left;
    /*margin-left: 10px;*/
    /*margin-right: 10px;*/
}
.circlebox-small {
    /*width: 80px;*/
    float: left;
    /*margin-left: 10px;*/
    /*margin-right: 10px;*/
    padding-top: 20px;
}
.circleboxcontainer {
    /*width: 440px ;*/
    margin-left: auto ;
    margin-right: auto ;
}

.circleboxcontainer > div {
    text-align: center;
}

p.label {
    text-transform: uppercase;
    font-size: small;
    text-align: center;
    /*width: 100px;*/
    padding: 0;
}

.circlebox {
    max-width: 120px;
    width: 27%;
}

.circlebox-small {
    max-width: 100px;
    width: 23%;
}

</style>

<style>
.circlebox .knob-control__text-display {
    font: bold 25px Arial;
}

.circlebox-small .knob-control__text-display {
    font: bold 20px Arial;
}
</style>