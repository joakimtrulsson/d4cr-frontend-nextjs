import React, { useState, useEffect } from 'react';

export default function DropdownMenu(prop) {
    const { showType, groupsBtn , setCurrentPage, setShowType } = prop
    console.log(prop, prop.currentPage, groupsBtn)

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.matches('.dropbtn')) {
                setShowDropdown(false);
            }
        };
        if (showDropdown) {
            window.addEventListener('click', handleOutsideClick);
        }
        return () => window.removeEventListener('click', handleOutsideClick);
    }, [showDropdown]);

    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropbtn">{showType}</button>
            {showDropdown && (
                <div id="myDropdown" className="dropdown-content">
                
                    {showType !== 'All areas' ? <h4 onClick={() => { setShowType('All areas'); setCurrentPage(1); }}>All areas</h4>: null}
                    {groupsBtn}
                </div>
            )}
        </div>
    );
}