import ApartmentModel from '../data/ApartmentModel/ApartmentModel';

export type ApartmentContextType = {
  apartmentList: ApartmentModel[];
  setList: (data: (state: ApartmentModel[]) => ApartmentModel[]) => void;
};
