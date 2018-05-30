import { v4 } from 'uuid'
import * as page from './pages'
import authGuard from './authGuard'

const routes: Array<route> = [
  {
    key: v4(),
    path: '/',
    exact: true,
    component: page.Home,
  },
  {
    key: v4(),
    path: '/register',
    exact: true,
    component: page.Register,
  },
  {
    key: v4(),
    path: '/signin',
    exact: true,
    component: page.Login,
  },
  {
    key: v4(),
    path: '/settings',
    exact: true,
    component: authGuard(page.Settings),
  },
  {
    key: v4(),
    component: page.NotFound,
  },
];

export default routes
