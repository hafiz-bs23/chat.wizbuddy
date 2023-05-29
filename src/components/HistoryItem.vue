<template>
    <div class="border-bottom border-info l mt-2">
        <a  href="#" class="list-group-item list-group-item-action border-0">
            <div class="d-flex align-items-center">
                <img src="../assets/man.png"
                     class=" mr-0" alt="Vanessa Tucker" width="30" height="30">
                <div class="flex-grow-1 mx-2">
                    {{ q }}
                    <img v-if="type == 'contractInformation'" src="../assets/information.png" class="mr-1" alt="Vanessa Tucker" width="15" height="15">
                    <img v-if="type == 'employeeInformation'" src="../assets/skill.png" class="mr-1" alt="Vanessa Tucker" width="15" height="15">
                    <img v-if="type == 'healthNBenefit'" src="../assets/medical-policy.png" class="mr-1" alt="Vanessa Tucker" width="15" height="15">
                </div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: "HistoryItem",
    props:['type','q']
}
</script>

<style scoped>

</style>