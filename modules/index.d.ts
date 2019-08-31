/// <reference types="react"/>

import * as React from 'react';

export class HashRouter extends React.Component<any> {}

export class BrowserRouter extends React.Component<any> {}

export class InnerRouter extends React.Component<any> {}

export class MemoryRouter extends React.Component<any> {}

export type Filter = (cb: () => void, props: any) => void;

export interface RouteProps {
	path?: string;
	component?: React.ComponentType;
  loadComponent?: (cb: (comp: React.ComponentType<any>) => void) => void;
  cache?: boolean; 
	index?: boolean;
	miss?: boolean;
	enterFilter?: Filter | Filter[];
	leaveFilter?: Filter | Filter[];
	children?: JSX.Element;
}

export class Route extends React.Component<RouteProps> {}

export interface LinkProps {
	to: string;
	state?: any;
	type?: string;
	className?: string;
	activeClassName?: string;
	activeStyle?: React.CSSProperties;
	children?: JSX.Element;
	isActive?: boolean;
}

export class Link extends React.Component<LinkProps> {}

export class CacheLink extends React.Component<LinkProps> {}

export class Control {
	static readonly path: string;
	static readonly state: any;
	static go(pathOrIndex: string | number, state?: any): void;
	static replace(pathOrIndex: string | number, state?: any): void;

	private constructor();
}
