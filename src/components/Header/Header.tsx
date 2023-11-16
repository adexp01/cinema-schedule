import React from 'react';
import style from "./Header.module.scss"


const Header: React.FC = () => {
    return (
        <header className={style.header}>
            <div className="logo">
                <h1 className={style.headerLogo}>Cinema Schedule Generator</h1>
            </div>
        </header>
    );
};

export default Header;