import React, { useRef, Fragment } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { useObservable, observer } from 'mobx-react-lite';
import GuiStore from '../../../stores/GuiStore';
import style from './style';
import { CSSTransition } from 'react-transition-group';

// Stores a copy of the last element so the exit animation can be used.
let preservedChild: JSX.Element | null = null;

function createChild(modals: JSX.Element[]) {
	if (modals.length > 0) {
		preservedChild = React.cloneElement(modals[0]);
	}

	// returns new copy or old copy.
	return preservedChild;
}

const Modal: React.FC = () => {
	const gui = useObservable(GuiStore);
	const ref = useRef(null);

	useOutsideClick(ref, () => gui.shiftModal());

	const showModal = gui.modals.length !== 0;

	return (
		<Fragment>
			<CSSTransition
				in={showModal}
				timeout={300}
				unmountOnExit={true}
				classNames='animation'
			>
				<style.Overlay />
			</CSSTransition>

			<CSSTransition
				in={showModal}
				timeout={300}
				unmountOnExit={true}
				classNames='animation'
				onExited={() => {
					// removes the copied element since it's not needed anymore.
					preservedChild = null;
				}}
			>
				<style.ModalWrapper>
					<style.ModalStyle ref={ref}>
						{createChild(gui.modals)}
					</style.ModalStyle>
				</style.ModalWrapper>
			</CSSTransition>
		</Fragment>
	);
};

export default observer(Modal);
