import React from 'react';
import './modal.css'

const ModalMain = ({activeModal, setActiveModal, children, touched=true}) => {
	return (
		<div className={activeModal ? 'modal activeModal' : 'modal'} onClick={() => touched ? setActiveModal(false) : {}}>
			<div className={activeModal ? 'modal_content activeModal' : 'modal_content'} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default ModalMain;