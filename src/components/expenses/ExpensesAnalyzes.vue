<template>
  <div class="flex h-4/5 w-4/5">
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
import { onMounted, ref, watch } from 'vue';
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

watch(reloadCharts, () => {
  chartData.value = getExpenseChartData();
});

onMounted(() => {
  chartData.value = getExpenseChartData();
});

const chartOptions: ChartOptions<'doughnut'> = {
  color: '#000',
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
      },
    },
    title: {
      color: '#000',
      display: true,
      font: {
        size: 20,
      },
      text: 'Categorias',
    },
  },
};
</script>
