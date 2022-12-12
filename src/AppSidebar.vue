<template>
    <nav class="sidebar-list w-40 h-screen flex flex-col bg-slate-200">
        <router-link v-for="item in sidebarItems"
            class="flex flex-row cursor-pointer w-full mt-4 items-center hover:bg-blue-300 h-9"
            :key="item.id"
            :to="item.route"
        >
            <component :is="item.icon" class="w-8 h-8 mx-2"/>
            {{ item.name }}
        </router-link>
    </nav>
</template>

<script lang="ts" setup>
import CoinsIcon from '../src/assets/CoinsIcon.vue'
import CreditCardIcon from '../src/assets/CreditCardIcon.vue'
import CurrencyIcon from '../src/assets/CurrencyIcon.vue'

interface ISidebarItem {
    id: number
    name: string
    icon: any
    route: string
}

let sidebarItems: Array<ISidebarItem> = [
    {
        id: 1,
        name: 'Faturas',
        icon: CreditCardIcon,
        route: 'bills'
    },
    {
        id: 2,
        name: 'Gastos',
        icon: CurrencyIcon,
        route: 'expenses'
    },
    {
        id: 3,
        name: 'Investimentos',
        icon: CoinsIcon,
        route: ''
    },
]
</script>

<style scoped>
.sidebar-item {
    display: flex;
    justify-content: center;
}
</style>