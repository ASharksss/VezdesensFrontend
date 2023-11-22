import React from 'react';

const Footer = ({footerRef}) => {
	return (
		<div ref={footerRef} style={{width: '100%', height: '5px', marginTop: '20px'}}>
			<p style={{color: 'transparent'}}>Footer</p>
		</div>
	);
};

export default Footer;