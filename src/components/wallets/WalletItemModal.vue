<template>
  <div
    v-show="opened"
    class="wallet-item-modal absolute flex justify-center items-center h-full w-full bg-black bg-opacity-50"
  >
    <div
      class="wallet-item-container flex flex-col bg-neutral-color-300 h-92 w-80 p-4 rounded-lg"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        {{ getActionName() }}
      </span>
      <div class="wallet-fields flex flex-col gap-3 my-5">
        <currency-selector
          :initial-value="selectedCurrency"
          @on-select-option="onSelectCurrency"
        />
        <input
          v-model="wallet.amount"
          class="outline-0 rounded p-2 bg-neutral-color-700 h-10"
          type="number"
          min="0"
          required
        />
        <input
          v-model="wallet.broker"
          class="outline-0 rounded p-2 bg-neutral-color-700 h-10"
          type="text"
          placeholder="Banco ou corretora"
        />
        <input
          v-model="wallet.holder"
          class="outline-0 rounded p-2 bg-neutral-color-700 h-10"
          type="text"
          placeholder="Titular da conta"
        />
      </div>
      <div class="expense-item-actions flex justify-end gap-4">
        <button
          class="expense-item-cancel max-w-fit h-8 px-2 bg-neutral-color-300 border-2 border-neutral-color-700 hover:bg-neutral-color-700 rounded"
          @click="emit('close')"
        >
          Cancelar
        </button>
        <button
          class="expense-item-confirm max-w-fit h-8 px-2 bg-secondary-color-300 hover:bg-secondary-color-700 rounded"
          @click="onActionItem"
        >
          {{ getActionName() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, reactive, ref, watch } from 'vue';
import { addWallet, editWallet, getCurrencyByType } from '../../services';
import { WALLET_TYPE } from '../../types';
import { Currency } from '../currencies';
import { Wallet } from './Wallet';
import CurrencySelector from '../common/CurrencySelector.vue';

let wallet = reactive(new Wallet());
const selectedCurrency = ref(new Currency());
const emit = defineEmits(['addWallet', 'close']);

const props = defineProps({
  opened: { type: Boolean, default: false },
  wallet: { type: Object as PropType<Wallet>, required: true },
});

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      wallet = props.wallet;
      selectedCurrency.value = getCurrencyByType(props.wallet.currency);
    }
  }
);

const getActionName = () => {
  const action = wallet.id === '' ? 'Adicionar' : 'Editar';
  const walletType =
    wallet.type === WALLET_TYPE.BALANCE ? 'conta' : 'investimento';

  return `${action} ${walletType}`;
};

const onSelectCurrency = (option: any) => {
  selectedCurrency.value = option;
  wallet.currency = option?.type;
};

const onActionItem = async () => {
  if (wallet.id === '') {
    await addWallet(wallet);
  } else {
    await editWallet(wallet);
  }
  emit('close');
};
</script>

<style lang="scss" scoped>
.income-type {
  background-color: #b2ecc7;
}

.outcome-type {
  background-color: #ffbdbd;
}
</style>
