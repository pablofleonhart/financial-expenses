export interface ICategoryItem {
  id: string,
  name: string,
  type: string
}

export interface IExpenseItem {
  id: string,
  amount: number
  card: boolean
  category: ICategoryItem
  date: Date
  deleted: boolean
  description: string
}


export interface IRevenueItem {
  id: string,
  amount: number
  bank: string
  date: Date
  deleted: boolean
  description: string
  type: string
}
