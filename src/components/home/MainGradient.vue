<template>
    <div class="big-gradient-pattern">
        
        <img src="@/assets/images/gradient-layer1.png">
        <img src="@/assets/images/gradient-layer2.png">

    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

.big-gradient-pattern{
    position: absolute;
    height: 656.92px;
    width: 100%;
}

img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
.big-gradient-pattern img:last-child{
    top: 35%;
}
</style>