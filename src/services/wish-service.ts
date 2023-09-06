import { computed, reactive } from 'vue';
import { Wish } from '../components/wishes/Wish';
import { sortList } from '../utils';
import { WISH_STATUS, WishStatus } from '../types';
import { getCategoryNameById } from './category-service';
import { api } from '../lib/axios';

export type CategoryWish = {
  category: string;
  wishes: Array<Wish>;
};

export const allWishItems: Array<Wish> = reactive([]);
let wishCategories: Set<string> = new Set();
export const wishCategoryItems: Array<CategoryWish> = reactive([]);
export const filteredWishItems: Wish[] = reactive([]);
export const wishSettings: Record<string, any> = reactive({});

export const selectedWishStatus: WishStatus = reactive({
  id: WISH_STATUS.OPEN,
  name: 'Abertos',
});

export const showWishActions = computed(
  () => selectedWishStatus.id === WISH_STATUS.OPEN,
);

const WISH_LIST_KEY = 'wish-list';
const WISH_STATUS_KEY = 'wish-status';

const loadSelectedStatus = () => {
  const localSettings = localStorage.getItem(WISH_STATUS_KEY);

  if (localSettings) {
    Object.assign(selectedWishStatus, JSON.parse(localSettings));
  }
};

const loadSortSettings = () => {
  const localSettings = localStorage.getItem(WISH_LIST_KEY);

  if (localSettings) {
    Object.assign(wishSettings, JSON.parse(localSettings));
  } else {
    Object.assign(wishSettings, { ascending: false, column: 'date' });
  }
};

const initializeData = () => {
  loadSelectedStatus();
  loadSortSettings();
};

export const wishesSum = computed<number>(() => {
  let result = 0;
  filteredWishItems.forEach((item) => {
    result += item.amount;
  });
  return result;
});

const loadWishCategories = () => {
  const localItems: Array<CategoryWish> = [];
  wishCategories = new Set();

  filteredWishItems.forEach((item) => {
    if (item.categoryID) {
      wishCategories.add(item.categoryID);
    }
  });

  wishCategories.forEach((category: string) => {
    localItems.push({
      category,
      wishes: filteredWishItems.filter((item) => item.categoryID === category),
    });
  });
  wishCategoryItems.splice(0);
  Object.assign(wishCategoryItems, localItems);
};

export const loadWishes = async () => {
  try {
    const response = await api.get('/wishes');
    allWishItems.splice(0);
    Object.assign(allWishItems, response.data.wishes);
  } catch (error) {
    console.error('Not able to load wishes');
  }
};

export async function addWish(wish: Wish) {
  try {
    await api.post('/wishes', wish);
    await loadWishes();
    keepListUpdated();
  } catch (error) {
    console.error('Not able to add wish:', wish);
  }
}

export async function editWish(wish: Wish) {
  try {
    await api.post(`/wishes/${wish.id}`, wish);
    await loadWishes();
    keepListUpdated();
  } catch (error) {
    console.error('Not able to edit wish:', wish);
  }
}

export async function deleteWish(wish: Wish) {
  try {
    await api.post(`/wishes/delete/${wish.id}`, wish);
    await loadWishes();
    keepListUpdated();
  } catch (error) {
    console.error('Not able to delete wish:', wish);
  }
}

export const sortWishes = (column?: string) => {
  if (!filteredWishItems.length) {
    return;
  }
  if (column) {
    if (wishSettings.column === column) {
      wishSettings.ascending = !wishSettings.ascending;
    } else {
      wishSettings.column = column;
    }
  }

  wishCategoryItems.forEach((wishCategory: CategoryWish) => {
    sortList(wishCategory.wishes, wishSettings.column, wishSettings.ascending);
  });

  localStorage.setItem(WISH_LIST_KEY, JSON.stringify(wishSettings));
};

export async function filterWishes(status: WishStatus = selectedWishStatus) {
  await loadWishes();
  let result;

  if (status.id === WISH_STATUS.OPEN) {
    result = allWishItems.filter((item) => !item.fullfiledAt);
  } else {
    result = allWishItems.filter((item) => item.fullfiledAt);
  }
  filteredWishItems.splice(0);
  Object.assign(filteredWishItems, result);
  loadWishCategories();
  sortWishes();
  Object.assign(selectedWishStatus, status);
  localStorage.setItem(WISH_STATUS_KEY, JSON.stringify(selectedWishStatus));
}

export const topFiveWishCategories = computed(() => {
  const wishCategories: any = [];

  wishCategoryItems.forEach((item) => {
    wishCategories.push({
      // @ts-ignore
      name: getCategoryNameById(item.category),
      value: item.wishes.reduce((partialSum, a) => partialSum + a.amount, 0),
    });
  });
  return wishCategories.slice(0, 5);
});

export const completePlan = (wish: Wish) => {
  if (!wish) {
    return;
  }
  editWish(wish);
  keepListUpdated();
};

export const reopenWish = (wish: Wish) => {
  if (!wish) {
    return;
  }
  editWish(wish);
  keepListUpdated();
};

const keepListUpdated = () => {
  filterWishes();
  loadWishCategories();
  sortWishes();
};

initializeData();
