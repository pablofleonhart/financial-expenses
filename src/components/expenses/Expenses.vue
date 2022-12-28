<template>
    <div class="m-3">
        <div class="flex justify-end mt-12">
            <div class="add-button flex items-center justify-end cursor-pointer max-w-fit
                h-8 px-2 bg-primary-color-dark text-white border-2 
                border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
                @click="onAddExpense"
            >
                <AddIcon class="h-6 w-6"/>
                <span class="ml-2">
                    Adicionar
                </span>   
            </div>
        </div>
        <ExpenseList
            class="flex mt-8"
            @on-edit-expense="onEditExpense"
            @on-delete-expense="onDeleteExpense"
        />
    </div>
    <ExpenseItemModal
        :opened="showExpenseItemModal"
        :expense="objExpense"
        @close="showExpenseItemModal = false"
    />
    <DeleteConfirmationModal
        message="Deseja realmente excluir esse gasto?"
        :show-delete-confirmation="showDeleteConfirmationModal"
        @accept="onAcceptDelete"
        @cancel="showDeleteConfirmationModal = false"
    />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ExpenseList from './ExpenseList.vue';
import { deleteExpense, loadExpenses } from '../../services';
import { Expense } from './Expense';
import AddIcon from '../../assets/AddIcon.vue';
import ExpenseItemModal from './ExpenseItemModal.vue';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal.vue';

let showExpenseItemModal = ref(false)
let showDeleteConfirmationModal = ref(false)
let objExpense = ref(new Expense())
let expenseToDelete: Expense = new Expense()

onMounted(() => {
    loadExpenses()
})

const onAddExpense = () => {
    objExpense.value = new Expense()
    showExpenseItemModal.value = true
}

const onEditExpense = (expense: Expense) => {
    objExpense.value = new Expense(expense)
    showExpenseItemModal.value = true
}

const onDeleteExpense = (expense: Expense) => {
    showDeleteConfirmationModal.value = true
    expenseToDelete = expense
}

const onAcceptDelete = async() => {
    showDeleteConfirmationModal.value = false
    await deleteExpense(expenseToDelete)
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