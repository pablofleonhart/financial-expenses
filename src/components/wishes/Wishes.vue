<template>
  <div class="m-3">
    <wishes-header />
    <div class="flex flex-row">
      <wishes-filter-tabs />
      <div class="flex justify-end">
        <add-button @click="onAddWish"></add-button>
      </div>
    </div>
    <wish-list
      class="flex mt-8"
      @on-edit-wish="onEditWish"
      @on-delete-wish="onDeleteWish"
      @on-complete-plan="onCompletePlan"
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
    @add-expense="expenseAdded"
    @close="showExpenseModal = false"
  />
</template>

<script lang="ts" setup>
import AddButton from '../common/AddButton.vue';
import ConfirmationModal from '../common/ConfirmationModal.vue';
import ExpenseItemModal from '../expenses/ExpenseItemModal.vue';
import WishesHeader from './WishesHeader.vue';
import WishesFilterTabs from './WishesFilterTabs.vue';
import WishItemModal from './WishItemModal.vue';
import WishList from './WishList.vue';
import { onMounted, ref } from 'vue';
import { deleteWish, editWish, loadWishes } from '../../services';
import { Wish } from './Wish';
import { copyWish } from '../../utils';
import { Expense } from '../expenses/Expense';
import { Author } from '../accounts/Author';
import { Wallet } from '../wallets/Wallet';

const showWishItemModal = ref(false);
const showConfirmationModal = ref(false);
const showExpenseModal = ref(false);
const modalMessage = ref('');
const objWish = ref(new Wish());
const objExpense = ref(new Expense());
let wishToDelete: Wish = new Wish();

onMounted(() => {
  loadWishes();
});

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
  deleteWish(wishToDelete);
};

const expenseAdded = async () => {
  wishToDelete.deleted = true;
  await editWish(wishToDelete);
};

const onCompletePlan = (wish: Wish) => {
  wishToDelete = wish;
  showExpenseModal.value = true;
  objExpense.value = new Expense({
    id: '',
    amount: wish.amount,
    card: true,
    category: wish.category,
    date: new Date(),
    deleted: false,
    note: wish.description,
    author: new Author(),
    currency: wish.currency,
    payment: new Wallet(),
  });
};
</script>

<style lang="scss" scoped></style>
