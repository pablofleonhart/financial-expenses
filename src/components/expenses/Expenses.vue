<template>
    <ExpenseList
        class="flex mt-8"
    />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import ExpenseList from './ExpenseList.vue';
import { loadExpenses } from '../../services';

onMounted(() => {
    loadExpenses()
})
</script>