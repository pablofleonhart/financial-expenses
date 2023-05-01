import { PlaceType } from '../../types';

export class Travel {
  public id: string;
  public startDate: Date | string;
  public endDate: Date | string;
  public city: Array<string>;
  public country: Array<string>;
  public place: PlaceType;

  constructor(
    objTravel: Travel = {
      id: '',
      startDate: new Date(),
      endDate: new Date(),
      city: [''],
      country: [''],
      place: { latitude: 1, longitude: 1 },
    }
  ) {
    this.id = objTravel.id;
    this.startDate = objTravel.startDate;
    this.endDate = objTravel.endDate;
    this.city = objTravel.city;
    this.country = objTravel.country;
    this.place = objTravel.place;
  }
}
