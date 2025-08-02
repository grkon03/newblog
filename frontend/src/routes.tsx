import React from 'react';
import Template from './template';
import Home from './contents/home';
import Article from './contents/article';
import Login from './admin/login';
import EditArticle from './admin/editarticle';

type RouteParam = {
  path: string;
  elem: React.JSX.Element;
};

export const MyRoutes: RouteParam[] = [
  {
    path: '/*',
    elem: <Template></Template>,
  },
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
  {
    path: '/admin/editarticle',
    elem: (
      <Template>
        <EditArticle />
      </Template>
    ),
  },
];
