import React, { useReducer, useState } from 'react';

import MenuItemChooser from './MenuItemChooser.js';
import Order from './Order.js';
import OrderItemModifier from './OrderItemModifier.js';

// TODO: create reducer function for order state 

const App = props =>{

    const [showModal, setShowModal] = useState(false);

    function cartReducer(state, action) {
        switch (action.type) {
            case 'ADD_ITEM':
            const existingItem = state.find(item => item.id === action.item.id);
            if(existingItem){
                return state.map(item =>
                    item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...state, { ...action.item, quantity: 1}];
            case 'REMOVE_ITEM':
                return state.filter(item => item.id !== action.id);
            case 'MODIFY_ITEM':
                return state.map(item =>
                    item.id === action.id ? { ...item, quantity: action.quantity } : item
                );
            default: state;
        }
    }

    const [cart, dispatch] = useReducer(cartReducer, []);
    console.log(cart)
    // TODO: set up order state using useReducer hook and keep track of whether an order item is being modified

    const handleAddToOrder = (event,item) =>{
       // TODO: add item to order (increment quantity if it already exists in order)
        dispatch({ type: 'ADD_ITEM', item });
    }

    const handleRemoveFromOrder = (event, orderItemId)=>{
        // TODO: remove item from order 
        dispatch({type: 'REMOVE_ITEM', id: orderItemId});
        console.log('eliminating')
    }

    const handleModifyOrderItem = (event, orderItemId)=>{
        // TODO: register that an order item is being modified
        setShowModal(true);
        dispatch({type:'MODIFY ITEM', orderItemId})
    }

    const handleSubmitModification = (event, newQuantity)=>{
        // TODO: once the new quantity of the order item has been chosen, update the order 
    }

    return <div className="app">
        <h1>Sushi Delivery</h1>
        <MenuItemChooser handleAddToOrder={handleAddToOrder}/>

        {/* TODO: the order state being passed to this component has not yet been initialized; do this before uncommenting the line below */}
        <Order order={cart} handleRemoveFromOrder={handleRemoveFromOrder} handleModifyOrderItem={handleModifyOrderItem}/>
        
        {/* TODO: conditionally render <OrderItemModifier /> */}
        {showModal && <OrderItemModifier handleModifyOrderItem={handleModifyOrderItem} /> }
    </div>;
}

export default App;