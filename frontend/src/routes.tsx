import React from 'react';
import Template from './template';
import Home from './contents/home';
import Article from './contents/article';
import LoginPage from './admin/login';
import EditArticle from './admin/editarticle';
import Dashboard from './admin/dashboard';

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
        <LoginPage />
      </Template>
    ),
  },
  {
    path: '/admin/editarticle',
    elem: (
      <Template shouldLogin>
        <EditArticle />
      </Template>
    ),
  },
  {
    path: '/admin/dashboard',
    elem: (
      <Template shouldLogin>
        <Dashboard />
      </Template>
    ),
  },
];
