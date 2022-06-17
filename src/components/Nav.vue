<script setup>
import {faCalendarDays} from '@fortawesome/free-regular-svg-icons/faCalendarDays'
</script>

<template>
    <nav class="navbar navbar-expand-md bg-dark">
        <div class="container">
            <a class="navbar-brand text-white" href="/"> <FontAwesomeIcon :icon="faCalendarDays"/> FozzieSov Timerboard </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navSpecialContent" aria-controls="navSpecialContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" role="navigation" id="navSpecialContent">
                <ul class="navbar-nav">
                    <!-- <li><a href="/WorldWarBeeII">World War Bee II</a></li>-->
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    name: "Nav",
    components: {
        FontAwesomeIcon
    }
}
</script>

<style scoped>
    .navbar {
        margin-bottom: 25px;
    }
</style>