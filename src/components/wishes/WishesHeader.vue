<template>
  <div class="wish-header flex justify-center h-22 font-bold">
    <div class="balance mb-4 flex items-center gap-4">
      <span class="flex justify-center">Total planejado:</span>
      <div class="flex justify-center items-center">
        <div class="balance-value">
          {{ sumFormatted }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatCurrency } from '../../utils';
import { wishesSum } from '../../services';

const sumFormatted = computed(() => {
  return formatCurrency(wishesSum.value);
});
</script>

<style lang="scss" scoped>
.balance-positive {
  color: #06a641;
}

.balance-negative {
  color: #ef4444;
}
</style>
