import React, { ReactElement, useEffect } from 'react';

// mainareaprops?: MainAreaProps should be contained in children of <ContentArea>{chlidren}</ContentArea>
export type MainAreaProps = {
  setSideAreaItems: (items: React.JSX.Element[]) => void;
  isUpdatedSideArea: boolean;
  setIsUpdatedSideArea: (val: boolean) => void;
};

export function SetSideArea(p?: MainAreaProps, elements?: ReactElement[]) {
  console.log('test1');
  console.log(p);
  useEffect(() => {
    console.log('test2');
    if (p !== undefined && !p.isUpdatedSideArea) {
      p.setSideAreaItems(elements ?? []);
      p.setIsUpdatedSideArea(true);
    }
  }, [p, elements]);
}
