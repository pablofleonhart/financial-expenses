<template>
    <div class="grid grid-cols-2">
        <app-sidebar />
        <router-view />
    </div>
</template>

<script lang="ts" setup>
import AppSidebar from './AppSidebar.vue';
</script>

<style lang="scss" scoped>
</style>