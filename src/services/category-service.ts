import { reactive } from 'vue';
import { Category } from '../components/categories/Category';
import { useGetCategoriesQuery } from '../graphql/generated';

export const categoryItems: Array<Category> = reactive([]);

const updateLocalStorage = () => {
  localStorage.setItem('categoryItems', JSON.stringify(categoryItems));
};

export const loadCategories = () => {
  const localItems = localStorage.getItem('categoryItems');
  if (localItems) {
    Object.assign(categoryItems, JSON.parse(localItems));
  } else {
    const { onResult } = useGetCategoriesQuery();
    // TODO catch errors
    return onResult((result) => {
      Object.assign(categoryItems, result.data.categories);
      updateLocalStorage();
    });
  }
};

export const syncCategories = () => {
  localStorage.removeItem('categoryItems');
  loadCategories();
};
