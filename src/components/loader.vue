<script>

</script>

<template>

    <div class="loader-container">
        <img src="../assets/loader.gif" alt="">
    </div>


</template>

<style scoped>

.loader-container{
    position:fixed;
    top:0;left:0;
    z-index: 10000;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

.loader-container.fade-out{
    top: -120%;
}

</style>