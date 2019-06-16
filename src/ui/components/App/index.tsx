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
import decode from '../../../modules/passiveTree/decode';

decode('AAAABAMAABFQGdcbJR1PMFs1uUuubRl_xpUgoqOnK60zwfPZW9-K6QI=');

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Fragment>
				<GlobalStyle />
				<Modal />
				<Selection
					actions={[
						[
							{
								action: () => {
									BuildStore.newCharacter();
								},
								description: translate('explorer.build.newBuild'),
								shortcut: 'ctrl+n',
								key: 'a',
							},
						],
						[
							{
								action: () => {
									console.log('open build');
								},
								description: translate('explorer.build.openBuild'),
								shortcut: 'ctrl+o',
								key: 'b',
							},
							{
								action: () => {},
								description: 'group test',
								group: [
									{
										action: () => {
											console.log('test');
										},
										description: 'test',
									},
								],
								key: 'c',
							},
						],
						[
							{
								action: () => {
									console.log('save');
								},
								description: translate('explorer.build.save'),
								shortcut: 'ctrl+s',
								key: 'd',
							},
							{
								action: () => {
									console.log('save as');
								},
								description: `${translate('explorer.build.saveAs')}...`,
								shortcut: 'ctrl+shift+s',
								key: 'e',
							},
						],
					]}
				/>
				<style.Content>
					<InjectRoutes url='' routes={routes} />
				</style.Content>
			</Fragment>
		</BrowserRouter>
	);
};

export default hot(App);
