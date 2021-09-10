import React from 'react';

const Header = ({todos}) => {
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <p className='header-title'>TODO-LIST</p>
            <p className='header-items'>items:{todos}</p>
        </div>
    );
};

export default Header;