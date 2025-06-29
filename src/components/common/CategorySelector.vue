<template>
  <div class="flex flex-col gap-1">
    <span class="font-bold"> {{ label }} </span>
    <div
      class="category-select rounded outline-0 focus:ring focus:ring-secondary-color-300"
      :class="{
        'border border-red-500': error,
        'text-neutral-400': !selectedCategory,
      }"
      @click.stop
      tabindex="0"
    >
      <div
        class="selected-option disabled flex outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer text-neutral-color-off"
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
        class="period-items scrollbar overflow-y-scroll overflow-x-hidden absolute bg-neutral-color-500 rounded w-80 max-h-80 z-10"
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
    <error-badge :message="error" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onUpdated, PropType, ref, watch } from 'vue';
import { categoryItems } from '../../services';
import { Category } from '../categories/Category';
import ErrorBadge from './ErrorBadge.vue';

const props = defineProps({
  label: { type: String, default: 'Categoria' },
  initialValue: { type: Object as PropType<Category>, default: null },
  error: { type: String, default: '' },
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

onUpdated(() => {
  const categorySelect = document.querySelector('.category-select');
  if (categorySelect) {
    categorySelect.addEventListener('keydown', (event: any) => {
      event.stopPropagation();
      if (event.key === ' ') {
        categorySelectorOpen.value = !categorySelectorOpen.value;
      } else if (event.key === 'Escape') {
        categorySelectorOpen.value = false;
      } else if (event.key === 'Tab') {
        categorySelectorOpen.value = true;
        if (event.target === document.activeElement) {
          categorySelectorOpen.value = false;
        }
      }
    });
  }
});

window.addEventListener('click', () => (categorySelectorOpen.value = false));
</script>
