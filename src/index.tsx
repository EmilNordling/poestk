import ReactDOM from 'react-dom';
import React from 'react';
import App from './ui/components/App';

/**
 * @description
 * Application renderer.
 */
const render = (Component: React.FC) => {
	ReactDOM.render(<Component />, document.getElementById('app'));
};

/**
 * Start up.
 */
(async () => {
	try {
		// --> pre render pipe goes here <--

		// Render application once pipe is done.
		render(App);
	} catch (error) {
		console.error(error);
	}
})();
