import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';
import { computed, reactive } from 'vue';
import { Expense } from '../components/expenses/Expense';
import { useGetExpensesQuery } from '../graphql/generated';

const initialize = () => {
  provideApolloClient(apolloClient)
}

export let expenseItems: Array<Expense> = reactive(new Array())

const updateLocalStorage = () => {
  localStorage.setItem('expenseItems', JSON.stringify(expenseItems))
}

const getExpenseByID = (id: string): Expense | null => {
  if(!id){
    return null
  }
  return expenseItems.filter((item) => item.id === id)[0]
}

// const publishExpense = (id: string | undefined): void => {
//   if(!id) {
//     throw new Error('Expense ID invalid')
//   }
//   const { mutate: publishExpense } = usePublishRevenueMutation({});
//   publishExpense({ id });
// }

export const loadExpenses = () => {
  const localItems = localStorage.getItem('expenseItems')
  if(localItems){
    Object.assign(expenseItems, JSON.parse(localItems))
  } else {
      const { onResult } = useGetExpensesQuery()
      // TODO catch errors
      return onResult((result) => {
        const items = result.data.expenses;
        const itemsNoDeleted = items.filter((item) => item.deleted === false);
        Object.assign(expenseItems, itemsNoDeleted);
        updateLocalStorage()
      })
  }
}

// export const addExpense = async(revenue: Expense) => {
//   const { mutate: createRevenue, onDone } = useAddRevenueMutation({});
//   createRevenue(
//       {
//           amount: revenue.amount,
//           date: revenue.date,
//           description: revenue.description,
//           type: revenue.type,
//           bank: revenue.bank
//       }
//   )

//   return onDone((result) => {
//     const revenueID = result.data?.createRevenue?.id
//     revenue.id = revenueID || ''
//     expenseItems.push(revenue)
//     updateLocalStorage()
//     publishExpense(revenueID)
//   })
// }

// export const editExpense = async(revenue: Expense) => {
//   if(!revenue){
//     throw new Error('Revenue does not exist')
//   }

//   // update on graph cms
//   const { mutate: updateRevenue, onDone } = useUpdateRevenueMutation({});
//   updateRevenue(
//       {
//         id: revenue.id,
//         bank: revenue.bank,
//         amount: revenue.amount,
//         date: revenue.date,
//         deleted: revenue.deleted,
//         description: revenue.description,
//         type: revenue.type
//       }
//   )

//   return onDone(() => {
//     // update revenue on local storage
//     const oldRevenue = getExpenseByID(revenue.id);
//     if(oldRevenue) {
//       expenseItems[expenseItems.indexOf(oldRevenue)] = revenue
//       updateLocalStorage()
//     }
//     publishExpense(revenue.id)
//   })
// }

// export const deleteExpense = (revenue: Expense) => {
//   if(!revenue){
//     throw new Error('Revenue does not exist')
//   }

//   // update on graph cms
//   revenue.deleted = true
  
//   const { mutate: updateRevenue, onDone } = useUpdateRevenueMutation({});
//   updateRevenue(
//       {
//         id: revenue.id,
//         bank: revenue.bank,
//         amount: revenue.amount,
//         date: revenue.date,
//         deleted: revenue.deleted,
//         description: revenue.description,
//         type: revenue.type
//       }
//   )

//   return onDone(() => {
//     // remove from local storage
//     expenseItems.splice(expenseItems.indexOf(revenue), 1)
//     updateLocalStorage()
//     publishExpense(revenue.id)
//   })
// }

initialize()