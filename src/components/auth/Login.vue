<template>
  <div class="grid grid-cols-2 w-screen h-screen">
    <div>
      <img class="h-screen w-screen" src="../../assets/img/banner.jpg" />
    </div>
    <div class="flex flex-col justify-center items-center bg-primary-color w-full">
      <div class="flex flex-col w-3/4">
        <span class="mb-2">
          Email
        </span>
        <input
          class="border border-secondary-color-dark p-2 h-10 w-full rounded"
          type="email"
          placeholder="Enter your email"
        />
      </div>
      <div class="flex flex-col mt-6 w-3/4">
        <span class="mb-2">
          Password
        </span>
        <input
          class="border border-secondary-color-dark p-2 h-10 w-full rounded"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <button
          class="login-button flex items-center mt-12 max-w-fit h-9 px-2 bg-primary-color-dark text-white border-2 border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
      >
        <span class="mr-2">
          Log me in
        </span>
        <arrow-right class="h-6 w-6"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArrowRight from '../../assets/ArrowRight.vue'
</script>

<style lang="scss" scoped>
.login-button {
  &:hover {
    :deep(.arrow-right) {
      line,
      polyline {
        stroke: #000;
      }
    }
  }
}
</style>