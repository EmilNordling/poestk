import { v4 } from 'uuid'
import * as page from './pages'

const routes: Array<route> = [
  {
    key: v4(),
    path: '/',
    exact: true,
    component: page.Home,
  },
  {
    key: v4(),
    component: page.NotFound,
  },
]

export default routes
