import React, { ReactElement, useEffect } from 'react';
import { NormalSA } from './base-component/sidearea/normal';

// mainareaprops?: MainAreaProps should be contained in children of <ContentArea>{chlidren}</ContentArea>
export type MainAreaProps = {
  setSideAreaItems: React.Dispatch<ReactElement[]>;
  isUpdatedSideArea: boolean;
  setIsUpdatedSideArea: (val: boolean) => void;
};

export function InitSideArea(p?: MainAreaProps, elements?: ReactElement[]) {
  useEffect(() => {
    if (p !== undefined && !p.isUpdatedSideArea) {
      p.setSideAreaItems(elements ?? NormalSA);
      p.setIsUpdatedSideArea(true);
    }
  }, [p, elements]);
}
