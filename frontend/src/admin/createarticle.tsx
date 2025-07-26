import React from 'react';
import { MainAreaProps, SetSideArea } from '../types';

type Props = {
  mainareaprops?: MainAreaProps;
};

const sa = [<div>test</div>];

const CreateArticle: React.FC<Props> = ({ mainareaprops }) => {
  SetSideArea(mainareaprops, sa);
  return <div></div>;
};

export default CreateArticle;
