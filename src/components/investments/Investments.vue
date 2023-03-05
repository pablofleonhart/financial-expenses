<template>
  <div class="m-3">
    <investments-header />
    <div class="flex flex-row">
      <investments-filter-tabs />
      <div class="flex justify-end">
        <add-button @click="onAddInvestment"></add-button>
      </div>
    </div>
    <investments-list
      class="flex mt-8"
      @on-edit-investment="onEditInvestment"
      @on-delete-investment="onDeleteInvestment"
    />
  </div>
  <investment-item-modal
    :opened="showInvestmentModal"
    :investment="objInvestment"
    @close="showInvestmentModal = false"
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
import { deleteInvestment, loadInvestments } from '../../services';
import { Investment } from './Investment';
import ConfirmationModal from '../common/ConfirmationModal.vue';
import InvestmentsFilterTabs from './InvestmentsFilterTabs.vue';
import InvestmentsHeader from './InvestmentsHeader.vue';
import InvestmentItemModal from './InvestmentItemModal.vue';
import InvestmentsList from './InvestmentsList.vue';

const showInvestmentModal = ref(false);
const showConfirmationModal = ref(false);
const modalMessage = ref('');
const objInvestment = ref(new Investment());
let investmentToDelete: Investment = new Investment();

onMounted(() => {
  loadInvestments();
});

const onAddInvestment = () => {
  objInvestment.value = new Investment();
  showInvestmentModal.value = true;
};

const onEditInvestment = (investment: Investment) => {
  objInvestment.value = new Investment(investment);
  showInvestmentModal.value = true;
};

const onDeleteInvestment = (investment: Investment) => {
  modalMessage.value = 'Deseja realmente excluir essa renda/despesa?';
  showConfirmationModal.value = true;
  investmentToDelete = investment;
};

const onAcceptDelete = () => {
  showConfirmationModal.value = false;
  deleteInvestment(investmentToDelete);
};
</script>
