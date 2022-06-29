import React, { createContext, useState } from 'react';
import ApartmentModel from '../data/ApartmentModel/ApartmentModel';
import { ApartmentContextType } from './providerTypes';

export const ApartmentListContext = createContext<ApartmentContextType | null>(
  null
);
type Props = {
  children?: React.ReactNode;
};
export const ApartmentListProvider: React.FC<Props> = ({ children }) => {
  const [apartmentList, setList] = useState<ApartmentModel[]>([]);
  return (
    <ApartmentListContext.Provider value={{ apartmentList, setList }}>
      {children}
    </ApartmentListContext.Provider>
  );
};
