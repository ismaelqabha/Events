import React, { useState } from 'react';
//import AppContext from './ProductContext';

const AppProvider = props => {
    const [cart, setCart] = useState([])
    return (
        <AppContext.Provider
            value={{
                cart, 
                setCart
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;