import CreditCardIcon from "../assets/CreditCardIcon.vue"
import MarketIcon from "../assets/MarketIcon.vue"
import MoneyIcon from "../assets/MoneyIcon.vue"
import PetIcon from "../assets/PetIcon.vue"
import TransportIcon from "../assets/TransportIcon.vue"

const categoryTypes: Record<string, any> = {
  'market': MarketIcon,
  'pet': PetIcon,
  'transport': TransportIcon
}

export const getCategoryIcon = (categoryType: string) => {
  return categoryTypes[categoryType]
}

export const getPaymentIcon = (card: boolean) => {
  return card ? CreditCardIcon : MoneyIcon
}