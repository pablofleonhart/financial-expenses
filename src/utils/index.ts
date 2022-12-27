const toBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const converters: Record<string, any> = {
  'BRL': toBRL
}

export const formatCurrency = (value: number, currency: string = 'BRL'): string => {
  if(!value){
    return 'R$ 0,00'
  }
  return converters[currency].format(value)
}

export const formatDate = (date: Date | string): string => {
  if(!date){
    return 'No date'
  }
  return new Date(date).toLocaleDateString()
}