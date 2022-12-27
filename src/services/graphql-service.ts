import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';
import { 
  useAddRevenueMutation,
  useGetRevenuesQuery,
  usePublishRevenueMutation,
  useUpdateRevenueMutation
} from '../graphql/generated';
import { IRevenueItem } from '../interfaces';
import { reactive } from 'vue';

export let revenueItems: Array<IRevenueItem> = reactive(new Array())

const initialize = () => {
  provideApolloClient(apolloClient)
}

const updateLocalStorage = () => {
  localStorage.setItem('revenueItems', JSON.stringify(revenueItems))
}

const getRevenueByID = (id: string): IRevenueItem | undefined | null => {
  if(!id){
    return null
  }
  return revenueItems.filter((item) => item.id === id)[0]
}

const publishRevenue = (id: string | undefined): void => {
  if(!id) {
    throw new Error('Revenue ID invalid')
  }
  const { mutate: publishRevenue } = usePublishRevenueMutation({});
  publishRevenue({ id });
}

export const loadRevenues = () => {
  const localItems = localStorage.getItem('revenueItems')
  if(localItems){
    Object.assign(revenueItems, JSON.parse(localItems))
  } else {
      const { onResult } = useGetRevenuesQuery()
      // TODO catch errors
      return onResult((result) => {
        const items = result.data.revenues;
        const itemsNoDeleted = items.filter((item) => item.deleted === false);
        Object.assign(revenueItems, itemsNoDeleted);
        updateLocalStorage()
      })
  }
}

export const addRevenue = async(revenue: IRevenueItem) => {
  const { mutate: createRevenue, onDone } = useAddRevenueMutation({});
  createRevenue(
      {
          amount: revenue.amount,
          date: revenue.date,
          description: revenue.description,
          type: revenue.type,
          bank: revenue.bank
      }
  )

  return onDone((result) => {
    const revenueID = result.data?.createRevenue?.id
    revenue.id = revenueID || ''
    revenueItems.push(revenue)
    updateLocalStorage()
    publishRevenue(revenueID)
  })
}

export const editRevenue = (revenue: IRevenueItem) => {
  if(!revenue){
    throw new Error('Revenue does not exist')
  }

  // update on graph cms
  const { mutate: updateRevenue, onDone } = useUpdateRevenueMutation({});
  updateRevenue(
      {
        id: revenue.id,
        bank: revenue.bank,
        amount: revenue.amount,
        date: revenue.date,
        deleted: revenue.deleted,
        description: revenue.description,
        type: revenue.type
      }
  )

  return onDone(() => {
    // update revenue on local storage
    const oldRevenue = getRevenueByID(revenue.id);
    if(oldRevenue) {
      revenueItems[revenueItems.indexOf(oldRevenue)] = revenue
      updateLocalStorage()
    }
    publishRevenue(revenue.id)
  })
}

export const deleteRevenue = (revenue: IRevenueItem) => {
  if(!revenue){
    throw new Error('Revenue does not exist')
  }

  // update on graph cms
  revenue.deleted = true
  
  const { mutate: updateRevenue, onDone } = useUpdateRevenueMutation({});
  updateRevenue(
      {
        id: revenue.id,
        bank: revenue.bank,
        amount: revenue.amount,
        date: revenue.date,
        deleted: revenue.deleted,
        description: revenue.description,
        type: revenue.type
      }
  )

  return onDone(() => {
    // remove from local storage
    revenueItems.splice(revenueItems.indexOf(revenue), 1)
    updateLocalStorage()
    publishRevenue(revenue.id)
  })
}

initialize()