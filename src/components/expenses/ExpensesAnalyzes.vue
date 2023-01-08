<template>
  <div class="flex h-screen w-1/2">
    <doughnut :data="chartData" :options="chartOptions" />
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
} from 'chart.js';
import { onMounted, ref, watch } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { getExpenseChartData, reloadCharts } from '../../services';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ...registerables);

const chartData = ref<ChartData<'doughnut'>>({
  datasets: [],
});

watch(reloadCharts, () => {
  chartData.value = getExpenseChartData();
});

onMounted(() => {
  chartData.value = getExpenseChartData();
});

const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    title: {
      display: true,
      text: 'Categorias',
    },
  },
};
</script>
