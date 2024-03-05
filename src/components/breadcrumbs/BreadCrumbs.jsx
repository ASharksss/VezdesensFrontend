import React from 'react';
import './breadcrumbs.css'

const BreadCrumbs = ({crumbs, subName, name}) => {
    console.log(subName,name)
    return (
        <>
        {/* првоерка отправляли ли data.object в crumbs? */}
        {crumbs ? (
            <div className='breadcrumbs'>
            {crumbs?.subCategory.category.name} / {crumbs?.subCategory.name.indexOf('/') > 1 ? 
            crumbs?.subCategory.name.split('/')[0] 
            : crumbs?.subCategory.name} / {crumbs?.name.indexOf('/') > 1 ? 
            crumbs?.name.split('/')[0] 
            : crumbs?.name}
            </div>
        ) : (
            <div className='breadcrumbs fz-18'>
                 {subName.indexOf('/') > 1 ? 
                 subName.split('/')[0] 
                 : subName} &nbsp;/&nbsp;  <b className='txt-black'>{name.indexOf('/') > 1 ? name.split('/')[0] : name}</b>
            </div>
        )}
        
        </>
    );
};

export default BreadCrumbs;
