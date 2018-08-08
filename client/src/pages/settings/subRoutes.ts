import { v4 } from 'uuid';
import * as page from './subPages';

const routes = [
  {
    key: v4(),
    to: '/connection',
    exact: true,
    component: page.Connection,
  },
  {
    key: v4(),
    to: '/register',
    exact: true,
    component: page.Application,
  },
];

export default routes;
