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
      objCategories[category.type] = category;
    });
  } catch (error) {
    console.error('Not able to load categories');
  }
}

export function getCategoryNameByType(type: string) {
  if (type && objCategories[type]) {
    return objCategories[type].name;
  }
  return 'Categoria indefinida';
}

export function getCategoryIconByType(type: string) {
  if (type && objCategories[type]) {
    return objCategories[type].icon;
  }
  return 'ph-warning-octagon';
}

export function getCategoryColorByType(type: string) {
  if (type && objCategories[type]) {
    return objCategories[type].color;
  }
  return '#de77ae';
}
