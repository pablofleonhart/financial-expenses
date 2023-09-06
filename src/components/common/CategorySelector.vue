<template>
  <div
    class="category-select rounded outline-0 focus:ring focus:ring-secondary-color-300"
    @click.stop
    tabindex="0"
  >
    <div
      class="selected-option flex outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer"
      :class="{ open: categorySelectorOpen }"
      @click="categorySelectorOpen = !categorySelectorOpen"
    >
      <component
        :is="selectedCategory?.icon || 'ph-warning-octagon'"
        class="h-6 w-6"
      />
      <span class="selected-option-name ml-2">
        {{ selectedCategory?.name || 'Selecione uma categoria' }}
      </span>
    </div>
    <ul
      class="period-items scrollbar overflow-y-scroll overflow-x-hidden absolute bg-neutral-color-500 rounded w-80 h-80 z-10"
      :class="{ hidden: !categorySelectorOpen }"
    >
      <li
        class="item flex cursor-pointer p-2 h-10 w-full hover:bg-neutral-color-700 hover:text-secondary-color-300"
        :class="{
          'bg-neutral-color-700 text-secondary-color-300':
            category.id === selectedCategory?.id,
        }"
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category)"
      >
        <component :is="category.icon" class="h-6 w-6" />
        <span class="item-name ml-2">
          {{ category.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, watch } from 'vue';
import { categoryItems } from '../../services';
import { Category } from '../categories/Category';

const props = defineProps({
  initialValue: { type: Object as PropType<any>, default: null },
});

const emit = defineEmits(['onSelectOption']);
const categorySelectorOpen = ref(false);
const categories = computed<Array<Category>>(() => categoryItems);
const selectedCategory = ref(props.initialValue);

watch(
  () => props.initialValue,
  () => {
    selectedCategory.value = props.initialValue;
  },
);

function selectCategory(option: any) {
  selectedCategory.value = option;
  categorySelectorOpen.value = false;
  emit('onSelectOption', option);
}

window.addEventListener('click', () => (categorySelectorOpen.value = false));
</script>
