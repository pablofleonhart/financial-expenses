<template>
  <div
    v-show="opened"
    class="transaction-item-modal absolute flex justify-center items-center h-full w-full overflow-hidden bg-black bg-opacity-50"
  >
    <div
      class="transaction-item-container flex flex-col bg-neutral-color-300 h-92 w-[350px] p-4 rounded-lg"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        {{ `${getActionName()} transação` }}
      </span>
      <div class="transaction-fields flex flex-col gap-3 my-5">
        <div class="flex gap-3 w-full">
          <input
            v-model="transaction.amountSent"
            class="outline-0 rounded p-2 h-10 bg-neutral-color-700 w-2/3"
            type="number"
            min="0"
            required
            placeholder="Valor a enviar"
          />
          <balance-selector
            class="w-full"
            :initial-value="sourceWallet"
            empty-message="Origem"
            @select="selectSource"
          />
        </div>

        <div class="flex gap-3 w-full">
          <input
            v-model="transaction.amountReceived"
            class="outline-0 rounded p-2 h-10 bg-neutral-color-700 w-2/3"
            type="number"
            min="0"
            required
            placeholder="Valor a receber"
          />
          <balance-selector
            class="w-full"
            :initial-value="targetWallet"
            empty-message="Destino"
            @select="selectTarget"
          />
        </div>
        <datepicker :selected="transaction.date" @set-date="setDate" />
        <textarea
          v-model="transaction.description"
          class="flex col-span-3 resize-none outline-0 rounded p-2 bg-neutral-color-700 h-32"
          placeholder="Descreva a renda ou despesa"
        />
      </div>
      <div class="transaction-item-actions flex justify-end gap-4">
        <button
          class="transaction-item-cancel max-w-fit h-8 px-2 bg-neutral-color-300 border-2 border-neutral-color-700 hover:bg-neutral-color-700 rounded"
          @click="emit('close')"
        >
          Cancelar
        </button>
        <button
          class="transaction-item-confirm max-w-fit h-8 px-2 bg-secondary-color-300 hover:bg-secondary-color-700 rounded"
          @click="onActionItem"
        >
          {{ getActionName() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BalanceSelector from '../common/BalanceSelector.vue';
import Datepicker from '../common/Datepicker.vue';
import { PropType, shallowRef, watch } from 'vue';
import { addTransaction, editTransaction } from '../../services';
import { Transaction } from './Transaction';
import { Wallet } from '../wallets/Wallet';

const transaction = shallowRef(new Transaction());
const emit = defineEmits(['addTransaction', 'close']);

const sourceWallet = shallowRef(new Wallet());
const targetWallet = shallowRef(new Wallet());

const props = defineProps({
  opened: { type: Boolean, default: false },
  transaction: { type: Object as PropType<Transaction>, required: true },
});

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      transaction.value = props.transaction;
      sourceWallet.value = props.transaction.source;
      targetWallet.value = props.transaction.target;
    }
  }
);

const getActionName = () => {
  return transaction.value.id === '' ? 'Adicionar' : 'Editar';
};

// const selectCurrency = (option: any) => {
//   selectedCurrency.value = option;
//   transaction.value.currency = option?.type;
//   currencySelectorOpen.value = false;
// };

const selectSource = (balance: Wallet) => {
  transaction.value.source = balance;
};

const selectTarget = (balance: Wallet) => {
  transaction.value.target = balance;
};

const setDate = (value: Date) => {
  transaction.value.date = value;
};

const onActionItem = async () => {
  if (transaction.value.id === '') {
    await addTransaction(transaction.value);
  } else {
    await editTransaction(transaction.value);
  }
  emit('close');
};
</script>

<style lang="scss" scoped></style>
