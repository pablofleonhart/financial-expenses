<template>
  <div class="wallets-container m-3 h-[90vh]">
    <wallets-header />
    <div class="flex flex-row">
      <wallets-filter-tabs />
      <div class="flex justify-end">
        <add-button @click="onAddWallet"></add-button>
      </div>
    </div>
    <wallets-list
      class="flex mt-8"
      @on-edit-wallet="onEditWallet"
      @on-delete-wallet="onDeleteWallet"
    />
  </div>
  <wallet-item-modal
    :opened="showWalletModal"
    :wallet="objWallet"
    @close="showWalletModal = false"
  />
  <confirmation-modal
    :message="modalMessage"
    :show-modal="showConfirmationModal"
    @accept="onAcceptDelete"
    @cancel="showConfirmationModal = false"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import AddButton from '../common/AddButton.vue';
import { deleteWallet, loadWallets } from '../../services';
import { Wallet } from './Wallet';
import ConfirmationModal from '../common/ConfirmationModal.vue';
import WalletsFilterTabs from './WalletsFilterTabs.vue';
import WalletsHeader from './WalletsHeader.vue';
import WalletItemModal from './WalletItemModal.vue';
import WalletsList from './WalletsList.vue';
import { copyWallet } from '../../utils';

const showWalletModal = ref(false);
const showConfirmationModal = ref(false);
const modalMessage = ref('');
const objWallet = ref(new Wallet());
let walletToDelete: Wallet = new Wallet();

onMounted(() => {
  loadWallets();
});

const onAddWallet = () => {
  objWallet.value = new Wallet();
  showWalletModal.value = true;
};

const onEditWallet = (wallet: Wallet) => {
  objWallet.value = copyWallet(wallet);
  showWalletModal.value = true;
};

const onDeleteWallet = (wallet: Wallet) => {
  modalMessage.value = 'Deseja realmente excluir essa carteira?';
  showConfirmationModal.value = true;
  walletToDelete = wallet;
};

const onAcceptDelete = () => {
  showConfirmationModal.value = false;
  deleteWallet(walletToDelete);
};
</script>
