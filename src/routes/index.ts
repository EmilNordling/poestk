import React from 'react';
import * as page from '../pages';
// import * as routings from './routings';
import { RouteComponentProps } from 'react-router';

export interface RouteConfig {
	key: string;
	path?: string;
	exact?: boolean;
	component: React.FC<InjectedRouteProps<any>>;
	routes?: RouteConfig[];
	strict?: boolean;
}

export interface InjectedRouteProps<T = {}> extends RouteComponentProps<T> {
	routes?: RouteConfig[];
}

const routes: RouteConfig[] = [
	{
		key: 'root',
		path: '/',
		exact: true,
		strict: true,
		component: page.Home,
	},
	{
		key: 'sandbox',
		path: '/s',
		exact: true,
		strict: true,
		component: page.Sandbox,
	},
];

export default routes;
