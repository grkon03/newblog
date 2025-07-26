import React from 'react';
import Template from './template';
import Home from './contents/home';
import Article from './contents/article';
import Login from './admin/login';

type RouteParam = {
  path: string;
  elem: React.JSX.Element;
};

export const MyRoutes: RouteParam[] = [
  {
    path: '/',
    elem: (
      <Template>
        <Home />
      </Template>
    ),
  },
  {
    path: '/article/:id',
    elem: (
      <Template>
        <Article />
      </Template>
    ),
  },
  {
    path: '/admin/login',
    elem: (
      <Template>
        <Login />
      </Template>
    ),
  },
];
