<template>
    <li>
        <a href="#" @click="callMethod(q)" class="wiz-body__history__list__item">
            <i><font-awesome-icon icon="fa-regular fa-comment" /></i>
            <span>{{ q }}</span>
        </a>
    </li>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
    name: "HistoryItem",
    components: {FontAwesomeIcon},
    props:['q','callMethod']
}
</script>

<style scoped>
.history-item{
    cursor: pointer;
}
</style>