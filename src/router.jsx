import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import RootLayout from './routes/RootLayout';
import Landing from './screens/Landing';
import Officials from './screens/Officials';
import Profile from './screens/Profile';
import Promises from './screens/Promises';
import PromiseDetail from './screens/PromiseDetail';
import ActNow from './screens/ActNow';
import About from './screens/About';
import Methodology from './screens/Methodology';

const rootRoute = createRootRoute({ component: RootLayout });

const route = (path, component) =>
  createRoute({ getParentRoute: () => rootRoute, path, component });

/* Country is a path segment rather than a param: Kenya is the only launched
   tracker. When Nigeria / Ethiopia / Senegal go live, swap '/kenya' for
   '/$countryId' and read the segment in ValsProvider. */
const routes = [
  route('/', Landing),
  route('/kenya', Officials),
  route('/kenya/officials/$polId', Profile),
  route('/kenya/officials/$polId/promises', Promises),
  route('/kenya/promises/$promiseId', PromiseDetail),
  route('/act', ActNow),
  route('/methodology', Methodology),
  route('/about', About)
];

export const router = createRouter({
  routeTree: rootRoute.addChildren(routes),
  /* Matches Vite's base so the router ignores the GitHub Pages subdirectory. */
  basepath: import.meta.env.BASE_URL,
  defaultPreload: 'intent',
  scrollRestoration: true
});
