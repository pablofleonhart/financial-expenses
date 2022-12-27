<template>
    <div class="m-3" >
        <RevenueHeader/>
        <div class="flex mt-24 justify-end cursor-pointer"
            @click="onAddRevenue"
        >
            <span class="mr-2">
                Adicionar
            </span>
            <AddIcon class="h-6 w-6"/>
        </div>
        <RevenueList
            class="flex mt-8"
            @edit-revenue="onEditRevenue"
        />
    </div>
    <RevenueItemModal
        :opened="showRevenueItemModal"
        :revenue="objRevenue"
        @close="showRevenueItemModal = false"
    />
</template>

<script lang="ts" setup>
import AddIcon from '../../assets/AddIcon.vue';
import RevenueHeader from './RevenueHeader.vue';
import RevenueItemModal from './RevenueItemModal.vue';
import RevenueList from './RevenueList.vue';
import { onMounted, ref } from 'vue';
import { IRevenueItem } from '../../interfaces';
import { loadRevenues } from '../../services/'
import { Revenue } from './Revenue';

let showRevenueItemModal = ref(false)
let objRevenue = ref(new Revenue())

onMounted(() => {
    loadRevenues()
})

const onAddRevenue = () => {
    objRevenue.value = new Revenue()
    showRevenueItemModal.value = true
}

const onEditRevenue = (revenue: IRevenueItem) => {
    objRevenue.value = new Revenue(revenue)
    showRevenueItemModal.value = true
}
</script>