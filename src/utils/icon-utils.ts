import ArrowHorizontal from '../assets/ArrowHorizontal.vue';
import CaretDoubleDownIcon from '../assets/CaretDoubleDownIcon.vue';
import CaretDoubleUpIcon from '../assets/CaretDoubleUpIcon.vue';
import CaretDownIcon from '../assets/CaretDownIcon.vue';
import CaretUpIcon from '../assets/CaretUpIcon.vue';
import ClothesIcon from '../assets/ClothesIcon.vue';
import CreditCardIcon from '../assets/CreditCardIcon.vue';
import ElectronicIcon from '../assets/ElectronicIcon.vue';
import FoodIcon from '../assets/FoodIcon.vue';
import HouseIcon from '../assets/HouseIcon.vue';
import MarketIcon from '../assets/MarketIcon.vue';
import MoneyIcon from '../assets/MoneyIcon.vue';
import PetIcon from '../assets/PetIcon.vue';
import PharmacyIcon from '../assets/PharmacyIcon.vue';
import PhoneIcon from '../assets/PhoneIcon.vue';
import RecreationIcon from '../assets/RecreationIcon.vue';
import TransportIcon from '../assets/TransportIcon.vue';
import VapeIcon from '../assets/VapeIcon.vue';
import WarningIcon from '../assets/WarningIcon.vue';

const categoryTypes: Record<string, any> = {
  clothes: ClothesIcon,
  electronic: ElectronicIcon,
  food: FoodIcon,
  house: HouseIcon,
  market: MarketIcon,
  pet: PetIcon,
  pharmacy: PharmacyIcon,
  phone: PhoneIcon,
  recreation: RecreationIcon,
  transport: TransportIcon,
  vape: VapeIcon,
};

export const getCategoryIcon = (categoryType: string) => {
  if (categoryType in categoryTypes) {
    return categoryTypes[categoryType];
  }
  return WarningIcon;
};

export const getPaymentIcon = (card: boolean) => {
  return card ? CreditCardIcon : MoneyIcon;
};

export const getOrderIcon = (ascending: boolean) => {
  return ascending ? CaretUpIcon : CaretDownIcon;
};

export const getRevenueTypeIcon = (type: string) => {
  if (type === 'income') {
    return CaretDoubleUpIcon;
  }
  if (type === 'outcome') {
    return CaretDoubleDownIcon;
  }
  return ArrowHorizontal;
};
