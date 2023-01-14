<template>
  <div class="flex h-screen w-1/2">
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
import { getExpenseChartData, reloadCharts } from '../../services';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ...registerables);
ChartJS.register(Colors);

const chartData = ref<ChartData<'doughnut'>>({
  datasets: [],
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
  font: {
    size: 16,
  },
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    title: {
      color: '#000',
      display: true,
      font: {
        size: 16,
      },
      text: 'Categorias',
    },
  },
};
</script>
