<template>
    <div class="m-3" >
        <RevenueHeader/>
        <div class="flex mt-24 justify-end cursor-pointer"
            @click="showRenevueItemModal = !showRenevueItemModal"
        >
            <span class="mr-2">
                Adicionar
            </span>
            <AddIcon class="h-6 w-6"/>
        </div>
        <RevenueList class="flex mt-8"/>
    </div>
    <RenevueItemModal
        :opened="showRenevueItemModal"
        @close="showRenevueItemModal = false"
    />
</template>

<script lang="ts" setup>
import AddIcon from '../../assets/AddIcon.vue';
import RevenueHeader from './RevenueHeader.vue';
import RenevueItemModal from './RenevueItemModal.vue';
import RevenueList from './RevenueList.vue';
import { ref } from 'vue';

let showRenevueItemModal = ref(false)
</script>