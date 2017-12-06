import { v4 } from 'uuid'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const routes = [
  {
    key: v4(),
    path: '/',
    exact: true,
    component: Home,
  },
  {
    key: v4(),
    component: NotFound,
  },
]

export default routes
