<template>
  <div class="flex h-5/6 w-11/12">
    <doughnut
      v-if="
        expenseAnalytics && expenseAnalytics.expenseCategoriesLabels.length > 0
      "
      :data="chartData"
      :options="chartOptions"
      aria-label="Expense categories by month"
      role="img"
    >
    </doughnut>
    <p v-else>Nenhum item encontrado para gerar o grafico</p>
  </div>
</template>

<script lang="ts" setup>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
  registerables,
  ChartData,
  Colors,
} from 'chart.js';
import { Ref, onMounted, onUnmounted, reactive, ref } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { loadExpenseCategories } from '../../services';
import { formatCurrency } from '../../utils';
import {
  EVENT_BUS_EVENTS,
  registerEventBusListener,
  unregisterEventBusListener,
} from '../../event-bus';
import { ExpenseAnalytics, IExpenseFilter } from '../../types';
import { getExpenseBusinessMonth } from '../../store/expenses';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ...registerables);
ChartJS.register(Colors);

const expenseAnalytics: Ref<ExpenseAnalytics | undefined> =
  ref<ExpenseAnalytics>();

const chartData = ref<ChartData<'doughnut'>>({
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: [],
    },
  ],
});

const getExpenseChartData = (): ChartData<'doughnut'> => ({
  labels: expenseAnalytics.value
    ? expenseAnalytics.value.expenseCategoriesLabels
    : [],
  datasets: [
    {
      backgroundColor: expenseAnalytics.value
        ? expenseAnalytics.value.expenseCategoriesColorValues
        : [],
      data: expenseAnalytics.value
        ? expenseAnalytics.value.expenseCategoriesValues
        : [],
    },
  ],
});

const getTextColor = () => {
  return document.body.classList.contains('dark-theme') ? '#D6D6D6' : '#3D3D3D';
};

const getTitleSettings = reactive({
  color: () => getTextColor(),
  display: true,
  font: {
    size: 20,
  },
  text: 'Categorias',
});

async function reloadChart() {
  const filterData: IExpenseFilter = {
    startDate: new Date(getExpenseBusinessMonth().startDate).toISOString(),
    endDate: new Date(getExpenseBusinessMonth().endDate).toISOString(),
  };

  const pathName = window.location.pathname;
  if (pathName !== '/expenses') {
    filterData.isVariable =
      window.location.pathname.includes('variable-expenses');
  }

  expenseAnalytics.value = await loadExpenseCategories(filterData);
  chartData.value = getExpenseChartData();
}

async function updateSelectedPeriod() {
  await reloadChart();
}

onMounted(async () => {
  registerEventBusListener(
    EVENT_BUS_EVENTS.UPDATE_ANALYTICS,
    updateSelectedPeriod,
  );
  await reloadChart();
});

onUnmounted(() => {
  unregisterEventBusListener(
    EVENT_BUS_EVENTS.UPDATE_ANALYTICS,
    updateSelectedPeriod,
  );
});

const chartOptions = ref<ChartOptions<'doughnut'>>({
  borderColor: () => getTextColor(),
  color: () => getTextColor(),
  cutout: '35%',
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'left',
      labels: {
        filter: (legendItem, data) => {
          const index = legendItem.index || 0;
          const item = data.datasets[0].data[index] as number;
          legendItem.text += ` - ${formatCurrency(item)}`;
          return true;
        },
        font: {
          size: 16,
        },
        padding: 12,
      },
    },
    // @ts-ignore
    title: getTitleSettings,
  },
});
</script>
