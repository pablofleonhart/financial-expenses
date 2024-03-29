<template>
  <div class="revenues-container m-3 h-[90vh]">
    <div class="flex flex-row justify-evenly">
      <period-selector
        :selected-period="selectedRevenuePeriod"
        @select-option="onChangePeriod"
      />
      <div class="flex justify-end">
        <add-button @click="onAddRevenue"></add-button>
      </div>
    </div>
    <revenue-list
      class="flex mt-8"
      @on-edit-revenue="onEditRevenue"
      @on-delete-revenue="onDeleteRevenue"
    />
  </div>
  <revenue-item-modal
    :opened="showRevenueItemModal"
    :revenue="objRevenue"
    @close="showRevenueItemModal = false"
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
import RevenueItemModal from './RevenueItemModal.vue';
import RevenueList from './RevenueList.vue';
import { onMounted, ref } from 'vue';
import {
  deleteRevenue,
  filterRevenues,
  loadRevenues,
  selectedRevenuePeriod,
} from '../../services';
import { Revenue } from './Revenue';
import { copyRevenue } from '../../utils';
import PeriodSelector from '../common/PeriodSelector.vue';

const showRevenueItemModal = ref(false);
const showConfirmationModal = ref(false);
const modalMessage = ref('');
const objRevenue = ref(new Revenue());
let revenueToDelete: Revenue = new Revenue();

onMounted(() => {
  loadRevenues();
});

const onChangePeriod = (period: any) => {
  filterRevenues(period);
};

const onAddRevenue = () => {
  objRevenue.value = new Revenue();
  showRevenueItemModal.value = true;
};

const onEditRevenue = (revenue: Revenue) => {
  objRevenue.value = copyRevenue(revenue);
  showRevenueItemModal.value = true;
};

const onDeleteRevenue = (revenue: Revenue) => {
  const action = revenue.type === 'income' ? 'receita' : 'despesa';
  modalMessage.value = `Deseja realmente excluir essa ${action}?`;
  showConfirmationModal.value = true;
  revenueToDelete = revenue;
};

const onAcceptDelete = async () => {
  showConfirmationModal.value = false;
  await deleteRevenue(revenueToDelete);
};
</script>

<style lang="scss" scoped>
.add-button {
  &:hover {
    :deep(.add-icon) {
      circle,
      line {
        stroke: #000;
      }
    }
  }
}
</style>
