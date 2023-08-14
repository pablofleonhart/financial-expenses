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
        <div class="category-select" @click.stop>
          <div
            class="selected-option flex outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer"
            :class="{ open: currencySelectorOpen }"
            @click="currencySelectorOpen = !currencySelectorOpen"
          >
            <component :is="selectedCurrency?.icon" class="h-6 w-6" />
            <span class="selected-option-name ml-2">
              {{ selectedCurrency?.name || 'Moeda' }}
            </span>
          </div>
          <ul
            class="period-items absolute bg-neutral-color-700 border border-primary-color-300 w-52"
            :class="{ hidden: !currencySelectorOpen }"
          >
            <li
              class="item flex cursor-pointer p-2 h-10 w-full"
              :class="{
                'item-selected': category.type === selectedCurrency?.type,
              }"
              v-for="category in currencies"
              :key="category.type"
              @click="selectCurrency(category)"
            >
              <component :is="category.icon" size="24" />
              <span class="item-name ml-2">
                {{ category.name }}
              </span>
            </li>
          </ul>
        </div>
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
        <!-- <div class="flex items-center text-lg gap-2">
          <input
            id="availability_check"
            type="checkbox"
            v-model="wallet.available"
          />
          <label for="availability_check" class="text-base">Disponível</label>
        </div> -->
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
import { addWallet, editWallet } from '../../services';
import { WALLET_TYPE } from '../../types';
import { Wallet } from './Wallet';

let wallet = reactive(new Wallet());
const currencies = [
  {
    type: 'real',
    name: 'Real',
    icon: 'ph-coins',
  },
  {
    type: 'dollar',
    name: 'Dolar',
    icon: 'ph-currency-dollar',
  },
  {
    type: 'euro',
    name: 'Euro',
    icon: 'ph-currency-eur',
  },
  {
    type: 'libra',
    name: 'Libra',
    icon: 'ph-currency-gbp',
  },
];
const selectedCurrency = ref(currencies[0]);
const currencySelectorOpen = ref(false);
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
      selectedCurrency.value = currencies.filter(
        (item) => item.type === wallet.currency
      )[0];
    }
  }
);

const getActionName = () => {
  const action = wallet.id === '' ? 'Adicionar' : 'Editar';
  const walletType =
    wallet.type === WALLET_TYPE.BALANCE ? 'conta' : 'investimento';

  return `${action} ${walletType}`;
};

const selectCurrency = (option: any) => {
  selectedCurrency.value = option;
  wallet.currency = option?.type;
  currencySelectorOpen.value = false;
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
