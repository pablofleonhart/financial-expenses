import {
  useAddWishMutation,
  useGetWishesQuery,
  usePublishWishMutation,
  useUpdateWishMutation,
} from '../graphql/generated';
import { computed, reactive } from 'vue';
import { Wish } from '../components/wishes/Wish';
import { copyWish, sortList } from '../utils';
import { WISH_STATUS, WishStatus } from '../types';

export let allWishItems: Array<Wish> = reactive([]);
export const filteredWishItems: Array<Wish> = reactive([]);
export const wishSettings: Record<string, any> = reactive({});

export const selectedWishStatus: WishStatus = reactive({
  id: WISH_STATUS.OPEN,
  name: 'Aberto',
});

export const showWishActions = computed(
  () => selectedWishStatus.id === WISH_STATUS.OPEN
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
  allWishItems.forEach((item) => {
    result += item.amount;
  });
  return result;
});

const updateLocalStorage = () => {
  localStorage.setItem('wishItems', JSON.stringify(allWishItems));
};

const getWishID = (id: string): Wish | null => {
  if (!id) {
    return null;
  }
  return allWishItems.filter((item) => item.id === id)[0];
};

const publishWish = (id: string | undefined): void => {
  if (!id) {
    throw new Error('Wish ID invalid');
  }
  const { mutate: publishWishMutate } = usePublishWishMutation({});
  publishWishMutate({ id });
};

export const loadWishes = async () => {
  allWishItems = [];
  const wishesPromise = new Promise((resolve) => {
    const { onResult } = useGetWishesQuery();
    onResult((result) => {
      const items = result.data.wishes;
      const itemsNoDeleted = items.filter((item) => item.deleted === false);
      Object.assign(allWishItems, itemsNoDeleted);
      resolve(true);
    });
  });

  return wishesPromise.then(() => {
    filterWishes();
  });
};

export const addWish = async (wish: Wish) => {
  const { mutate: createWish, onDone } = useAddWishMutation({});
  createWish({
    amount: wish.amount,
    description: wish.description,
    currency: wish.currency,
    itemStatus: wish.itemStatus,
  });

  return onDone((result) => {
    const wishID = result.data?.createWish?.id;
    wish.id = wishID || '';
    allWishItems.push(wish);
    updateLocalStorage();
    publishWish(wishID);
    filterWishes();
  });
};

export const editWish = async (wish: Wish) => {
  if (!wish) {
    throw new Error('Wish does not exist');
  }

  // update on graph cms
  const { mutate: updateWish, onDone } = useUpdateWishMutation({});
  updateWish({
    id: wish.id,
    amount: wish.amount,
    deleted: wish.deleted,
    description: wish.description,
    currency: wish.currency,
    itemStatus: wish.itemStatus,
  });

  return onDone(() => {
    // update wish on local storage
    const oldWish = getWishID(wish.id);
    if (oldWish) {
      copyWish(allWishItems[allWishItems.indexOf(oldWish)], wish);
      updateLocalStorage();
    }
    publishWish(wish.id);
    filterWishes();
  });
};

export const deleteWish = (wish: Wish) => {
  if (!wish) {
    throw new Error('Wish does not exist');
  }

  wish.deleted = true;

  const { mutate: updateWish, onDone } = useUpdateWishMutation({});
  updateWish({
    id: wish.id,
    amount: wish.amount,
    deleted: wish.deleted,
    description: wish.description,
    currency: wish.currency,
    itemStatus: wish.itemStatus,
  });

  return onDone(() => {
    // remove from local storage
    allWishItems.splice(allWishItems.indexOf(wish), 1);
    updateLocalStorage();
    publishWish(wish.id);
    filterWishes();
  });
};

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

  sortList(filteredWishItems, wishSettings.column, wishSettings.ascending);
  localStorage.setItem(WISH_LIST_KEY, JSON.stringify(wishSettings));
};

export const filterWishes = (status: WishStatus = selectedWishStatus) => {
  const result = allWishItems.filter((item) => {
    return item.itemStatus === status.id;
  });
  filteredWishItems.splice(0);
  Object.assign(filteredWishItems, result);
  sortWishes();
  Object.assign(selectedWishStatus, status);
  localStorage.setItem(WISH_STATUS_KEY, JSON.stringify(selectedWishStatus));
};

export const completeWish = (wish: Wish) => {
  if (!wish) {
    return;
  }
  wish.itemStatus = WISH_STATUS.DONE;
  editWish(wish);
  filterWishes();
};

export const reopenWish = (wish: Wish) => {
  if (!wish) {
    return;
  }
  wish.itemStatus = WISH_STATUS.OPEN;
  editWish(wish);
  filterWishes();
};

initializeData();
