import React from 'react';

const CategoryModalTemplate = ({activeModalCat, setActiveModalCat, children}) => {
	return (
		<div className={activeModalCat ? 'modalCat activeModalCat' : 'modalCat'} onClick={() => setActiveModalCat(false)}>
			<div className={activeModalCat ? 'modalCat_content activeModalCat' : 'modalCat_content'} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default CategoryModalTemplate;