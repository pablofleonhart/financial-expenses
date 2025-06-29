<template>
  <div class="wishes-container m-3 h-[90vh]">
    <wishes-header />
    <div class="flex flex-row">
      <wishes-filter-tabs @on-change-tab="onChangeTab" />
      <div class="flex justify-end">
        <add-button @click="onAddWish"></add-button>
      </div>
    </div>
    <wish-list
      class="flex mt-8"
      :selected-tab="selectedTab"
      @on-edit-wish="onEditWish"
      @on-delete-wish="onDeleteWish"
      @on-complete-wish="onFullfilWish"
      @on-open-expenses="onOpenExpenses"
    />
  </div>
  <wish-item-modal
    :opened="showWishItemModal"
    :wish="objWish"
    @close="showWishItemModal = false"
  />
  <confirmation-modal
    :message="modalMessage"
    :show-modal="showConfirmationModal"
    @accept="onAcceptDelete"
    @cancel="showConfirmationModal = false"
  />
  <expense-item-modal
    :opened="showExpenseModal"
    :expense="objExpense"
    :wish-source="objWish"
    @close="showExpenseModal = false"
  />
  <wish-expenses-details
    :opened="showExpenseDetails"
    :wish="objWish"
    @close="showExpenseDetails = false"
  />
</template>

<script lang="ts" setup>
import AddButton from '../common/AddButton.vue';
import ConfirmationModal from '../common/ConfirmationModal.vue';
import ExpenseItemModal from '../expenses/ExpenseItemModal.vue';
import WishExpensesDetails from './WishExpensesDetails.vue';
import WishItemModal from './WishItemModal.vue';
import WishList from './WishList.vue';
import WishesHeader from './WishesHeader.vue';
import WishesFilterTabs from './WishesFilterTabs.vue';
import { onMounted, ref } from 'vue';
import {
  account,
  deleteWish,
  loadWishes,
  selectedWishStatus,
} from '../../services';
import { Wish } from './Wish';
import { copyWish } from '../../utils';
import { Expense } from '../expenses/Expense';

const showWishItemModal = ref(false);
const showConfirmationModal = ref(false);
const showExpenseModal = ref(false);
const showExpenseDetails = ref(false);
const modalMessage = ref('');
const objWish = ref(new Wish());
const objExpense = ref(new Expense());
const selectedTab = ref(selectedWishStatus.id);
let wishToDelete: Wish = new Wish();

onMounted(async () => {
  await loadWishes();
});

function onChangeTab(tab: any) {
  selectedTab.value = tab.id;
}

const onAddWish = () => {
  objWish.value = new Wish();
  showWishItemModal.value = true;
};

const onEditWish = (wish: Wish) => {
  objWish.value = copyWish(wish);
  showWishItemModal.value = true;
};

const onDeleteWish = (wish: Wish) => {
  modalMessage.value = 'Deseja realmente excluir esse planejamento?';
  showConfirmationModal.value = true;
  wishToDelete = wish;
};

const onAcceptDelete = async () => {
  showConfirmationModal.value = false;
  await deleteWish(wishToDelete);
};

function onFullfilWish(wish: Wish) {
  showExpenseModal.value = true;
  objWish.value = wish;
  objExpense.value = new Expense({
    id: '',
    amount: wish.amount,
    categoryID: wish.categoryID,
    date: new Date(),
    description: wish.description,
    authorID: account.id,
    accountID: '',
    isVariable: true,
    deletedAt: null,
    fullfiledAt: null,
    installments: 1,
  });
}

function onOpenExpenses(wish: Wish) {
  objWish.value = wish;
  showExpenseDetails.value = true;
}
</script>
