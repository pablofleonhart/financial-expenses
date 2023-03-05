<template>
  <div class="flex h-5/6 w-11/12">
    <doughnut
      :data="chartData"
      :options="chartOptions"
      aria-label="Expense categories by month"
      role="img"
    >
      <p>Nao foi possivel carregar este grafico</p>
    </doughnut>
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
import { onMounted, reactive, ref, watch } from 'vue';
import { Doughnut } from 'vue-chartjs';
import {
  expenseCategoriesLabels,
  expenseCategoriesValues,
  expenseCategoriesColorValues,
  reloadCharts,
} from '../../services';
import { formatCurrency } from '../../utils';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ...registerables);
ChartJS.register(Colors);

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
  labels: expenseCategoriesLabels,
  datasets: [
    {
      backgroundColor: expenseCategoriesColorValues,
      data: expenseCategoriesValues,
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

watch(reloadCharts, () => {
  chartData.value = getExpenseChartData();
});

onMounted(() => {
  chartData.value = getExpenseChartData();
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
