import { reactive } from 'vue';
import { Category } from '../components/categories/Category';
import { useGetCategoriesQuery } from '../graphql/generated';

export const categoryItems: Array<Category> = reactive([]);

export const loadCategories = () => {
  const { onResult } = useGetCategoriesQuery();
  onResult((result) => Object.assign(categoryItems, result.data.categories));
};
