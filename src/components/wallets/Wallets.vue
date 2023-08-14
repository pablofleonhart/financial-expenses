<template>
  <div class="wallets-container m-3 h-[90vh]">
    <wallets-header />
    <div class="flex flex-row">
      <wallets-filter-tabs />
      <div class="flex justify-end">
        <add-button @click="onAddEntry"></add-button>
      </div>
    </div>
    <wallets-list
      v-if="selectedTab.key !== 'transactions'"
      class="flex mt-8"
      @on-edit-wallet="onEditWallet"
      @on-delete-wallet="onDeleteWallet"
    />
    <transactions-list
      v-else
      class="flex mt-8"
      @on-edit-transaction="onEditTransaction"
    />
  </div>
  <wallet-item-modal
    :opened="showWalletModal"
    :wallet="objWallet"
    @close="showWalletModal = false"
  />
  <transaction-item-modal
    :opened="showTransactionModal"
    :transaction="objTransaction"
    @close="showTransactionModal = false"
  />
  <confirmation-modal
    :message="modalMessage"
    :show-modal="showConfirmationModal"
    @accept="onAcceptDelete"
    @cancel="showConfirmationModal = false"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import AddButton from '../common/AddButton.vue';
import { deleteWallet, loadWallets, selectedWalletTab } from '../../services';
import { Wallet } from './Wallet';
import ConfirmationModal from '../common/ConfirmationModal.vue';
import WalletsFilterTabs from './WalletsFilterTabs.vue';
import WalletsHeader from './WalletsHeader.vue';
import WalletItemModal from './WalletItemModal.vue';
import WalletsList from './WalletsList.vue';
import { copyTransaction, copyWallet } from '../../utils';
import TransactionItemModal from '../transactions/TransactionItemModal.vue';
import TransactionsList from '../transactions/TransactionsList.vue';
import { Transaction } from '../transactions/Transaction';
import { WALLET_TYPE } from '../../types';

const showWalletModal = ref(false);
const showConfirmationModal = ref(false);
const showTransactionModal = ref(false);
const modalMessage = ref('');
const objWallet = ref(new Wallet());
const objTransaction = ref(new Transaction());
let walletToDelete: Wallet = new Wallet();
const selectedTab = computed(() => selectedWalletTab);

onMounted(() => {
  loadWallets();
});

const onAddEntry = () => {
  if (selectedTab.value.key === 'transactions') {
    objTransaction.value = new Transaction();
    showTransactionModal.value = true;
  } else if (selectedTab.value.key === 'investments') {
    objWallet.value = new Wallet();
    objWallet.value.type = WALLET_TYPE.INVESTMENT;
    showWalletModal.value = true;
  } else {
    objWallet.value = new Wallet();
    showWalletModal.value = true;
  }
};

const onEditWallet = (wallet: Wallet) => {
  objWallet.value = copyWallet(wallet);
  showWalletModal.value = true;
};

const onDeleteWallet = (wallet: Wallet) => {
  modalMessage.value = 'Deseja realmente excluir esss item?';
  showConfirmationModal.value = true;
  walletToDelete = wallet;
};

const onEditTransaction = (transaction: Transaction) => {
  objTransaction.value = copyTransaction(transaction);
  showTransactionModal.value = true;
};

const onAcceptDelete = () => {
  showConfirmationModal.value = false;
  deleteWallet(walletToDelete);
};
</script>
