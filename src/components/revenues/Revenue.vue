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
        <RevenueList class="flex mt-8" :renevue-items="renevueItems"/>
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
import { onMounted, reactive, ref, watch } from 'vue';
import { useGetRevenuesQuery } from "../../graphql/generated";
import { IRevenueItem } from '../../interfaces';

let showRenevueItemModal = ref(false)
let renevueItems: Array<IRevenueItem> = reactive(new Array())

onMounted(() => {
    const localItems = localStorage.getItem('renevueItems')
    if(localItems){
        Object.assign(renevueItems, JSON.parse(localItems))
    } else {
        // TODO catch errors
        const { result } = useGetRevenuesQuery()

        watch(result, value =>{
            Object.assign(renevueItems, value?.revenues)
            localStorage.setItem('renevueItems', JSON.stringify(renevueItems))
        })
    }
})
</script>