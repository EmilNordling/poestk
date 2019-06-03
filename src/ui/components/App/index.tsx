import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter } from 'react-router-dom';
import InjectRoutes from '../InjectRoutes';
import routes from '../../../routes';
import GlobalStyle from '../GlobalStyle';
import Modal from '../Modal';
import style from './style';
import Selection from '../Selection';
import BuildStore from '../../../stores/BuildStore';
import translate from '../../../pipes/translate';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Fragment>
				<GlobalStyle />
				<Modal />
				<Selection actions={[
					[
						{
							action: () => {
								BuildStore.newCharacter();
							},
							description: translate('explorer.build.newBuild'),
							shortcut: 'ctrl+n',
						},
					],
					[
						{
							action: () => { console.log('open build') },
							description: translate('explorer.build.openBuild'),
							shortcut: 'ctrl+o',
						},
						{
							action: () => { },
							description: 'group test',
							group: [{
								action: () => { console.log('test') },
								description: 'test',
							}],
						},
					],
					[
						{
							action: () => { console.log('save') },
							description: translate('explorer.build.save'),
							shortcut: 'ctrl+s',
						},
						{
							action: () => { console.log('save as') },
							description: `${translate('explorer.build.saveAs')}...`,
							shortcut: 'ctrl+shift+s',
						},
					],
				]} />
				<style.Content>
					<InjectRoutes url='' routes={routes} />
				</style.Content>
			</Fragment>
		</BrowserRouter>
	);
};

export default hot(App);
