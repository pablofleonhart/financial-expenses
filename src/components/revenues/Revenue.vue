<template>
    <div class="m-3" >
        <RevenueHeader/>
        <div class="flex justify-end mt-12">
            <div class="add-button flex items-center justify-end cursor-pointer max-w-fit
                  h-8 px-2 bg-primary-color-dark text-white border-2 
                border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
                @click="onAddRevenue"
            >
                <AddIcon class="h-6 w-6"/>
                <span class="ml-2">
                    Adicionar
                </span>   
            </div>
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

<style lang="scss" scoped>
.add-button {
    &:hover {    
        :deep(.add-icon) {
            circle, line {
                stroke: #000;
            }
        }
    }
}
</style>