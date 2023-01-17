<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="192"
    height="192"
    fill="#000000"
    viewBox="0 0 256 256"
  >
    <circle
      cx="128"
      cy="128"
      r="96"
      fill="none"
      stroke="#000000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></circle>
    <polyline
      points="168 160 136 128 168 96"
      fill="none"
      stroke="#000000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></polyline>
    <polyline
      points="112 160 80 128 112 96"
      fill="none"
      stroke="#000000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></polyline>
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  color: { type: String, default: '#22C55E' },
});
</script>
