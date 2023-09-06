import { reactive } from 'vue';
import { Category } from '../components/categories/Category';
import { api } from '../lib/axios';

const objCategories: Record<string, Category> = {};
export const categoryItems: Category[] = reactive([]);

export async function loadCategories() {
  try {
    const response = await api.get('/categories');
    Object.assign(categoryItems, response.data.categories);

    categoryItems.forEach((category) => {
      objCategories[category.id] = category;
    });
  } catch (error) {
    console.error('Not able to load categories');
  }
}

export function getCategoryById(id: string): Category {
  return objCategories[id];
}

export function getCategoryNameById(id: string): string {
  return getCategoryById(id)?.name || 'Categoria indefinida';
}

export function getCategoryIconById(id: string): string {
  return getCategoryById(id)?.icon || 'ph-warning-octagon';
}

export function getCategoryColorById(id: string): string {
  return getCategoryById(id)?.color || '#de77ae';
}
