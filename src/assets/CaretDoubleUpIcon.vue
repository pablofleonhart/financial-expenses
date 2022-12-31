<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="192"
    height="192"
    fill="#000000"
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none" />
    <polyline
      points="48 208 128 128 208 208"
      fill="none"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="28"
    />
    <polyline
      points="48 128 128 48 208 128"
      fill="none"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="28"
    />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  color: { type: String, default: '#22C55E' },
});
</script>
