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
</template>

<script lang="ts" setup>
import AddButton from '../common/AddButton.vue';
import ConfirmationModal from '../common/ConfirmationModal.vue';
import WishesHeader from './WishesHeader.vue';
import WishesFilterTabs from './WishesFilterTabs.vue';
import WishItemModal from './WishItemModal.vue';
import WishList from './WishList.vue';
import { onMounted, ref } from 'vue';
import { deleteWish, loadWishes } from '../../services';
import { Wish } from './Wish';
import { copyWish } from '../../utils';

const showWishItemModal = ref(false);
const showConfirmationModal = ref(false);
const modalMessage = ref('');
const objWish = ref(new Wish());
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
</script>

<style lang="scss" scoped></style>
