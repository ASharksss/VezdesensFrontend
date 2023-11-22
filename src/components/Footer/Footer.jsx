import React from 'react';

const Footer = ({footerRef}) => {
	return (
		<div ref={footerRef} style={{border: '1px solid black', width: '100%', height: '300px', marginTop: '20px'}}>
			<p>Footer</p>
		</div>
	);
};

export default Footer;