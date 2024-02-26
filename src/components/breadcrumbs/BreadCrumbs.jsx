import React from 'react';
import './breadcrumbs.css'

const BreadCrumbs = ({crumbs}) => {
    return (
        <div className='breadcrumbs'>
            {crumbs?.subCategory.category.name} / {crumbs?.subCategory.name.indexOf('/') > 1 ? crumbs?.subCategory.name.split('/')[0] : crumbs?.subCategory.name} / {crumbs?.name.indexOf('/') > 1 ? crumbs?.name.split('/')[0] : crumbs?.name}
        </div>
    );
};

export default BreadCrumbs;
