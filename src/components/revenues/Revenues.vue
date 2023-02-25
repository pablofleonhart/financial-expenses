<template>
  <div class="m-3">
    <revenue-header />
    <div class="flex flex-row">
      <revenues-filter-tabs />
      <div class="flex justify-end">
        <div
          class="add-button flex items-center justify-end cursor-pointer max-w-fit h-8 ml-4 px-2 bg-primary-color-dark text-white border-2 border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
          @click="onAddRevenue"
        >
          <ph-plus-circle size="24" />
          <span class="ml-2"> Adicionar </span>
        </div>
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
import ConfirmationModal from '../common/ConfirmationModal.vue';
import RevenuesFilterTabs from './RevenuesFilterTabs.vue';
import RevenueHeader from './RevenueHeader.vue';
import RevenueItemModal from './RevenueItemModal.vue';
import RevenueList from './RevenueList.vue';
import { onMounted, ref } from 'vue';
import { deleteRevenue, loadRevenues } from '../../services';
import { Revenue } from './Revenue';

const showRevenueItemModal = ref(false);
const showConfirmationModal = ref(false);
const modalMessage = ref('');
const objRevenue = ref(new Revenue());
let revenueToDelete: Revenue = new Revenue();

onMounted(() => {
  loadRevenues();
});

const onAddRevenue = () => {
  objRevenue.value = new Revenue();
  showRevenueItemModal.value = true;
};

const onEditRevenue = (revenue: Revenue) => {
  objRevenue.value = new Revenue(revenue);
  showRevenueItemModal.value = true;
};

const onDeleteRevenue = (revenue: Revenue) => {
  modalMessage.value = 'Deseja realmente excluir essa renda/despesa?';
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
