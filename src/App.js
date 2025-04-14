import React, { useReducer, useState } from 'react';

import MenuItemChooser from './MenuItemChooser.js';
import Order from './Order.js';
import OrderItemModifier from './OrderItemModifier.js';

// TODO: create reducer function for order state 

const App = props => {

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const [total, setTotal] = useState(0);

    function cartReducer(state, action) {
        switch (action.type) {
            case 'ADD_ITEM':
                const existingItem = state.find(item => item.id === action.item.id);
                if (existingItem) {
                    return state.map(item =>
                        item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                }
                return [...state, { ...action.item, quantity: 1 }];
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

    const handleAddToOrder = (event, item) => {
        // TODO: add item to order (increment quantity if it already exists in order)
        dispatch({ type: 'ADD_ITEM', item });
        setTotal(total + item.price);
        console.log(total);
    }

    const handleRemoveFromOrder = (event, orderItemId) => {
        // TODO: remove item from order 
        const existingItem = cart.find(item => item.id === orderItemId);
        if (existingItem) {
            const amount = existingItem.price * existingItem.quantity;
            if (cart.length === 0) {
                setTotal(0);
            } else {
                setTotal(prev => parseFloat((prev - amount).toFixed(2)));
                console.log('CART: ', cart.length)
            }
        }
        dispatch({ type: 'REMOVE_ITEM', id: orderItemId });
    }

    const handleModifyOrderItem = (event, orderItemId) => {
        // TODO: register that an order item is being modified
        setShowModal(true);
        dispatch({ type: 'MODIFY_ITEM', orderItemId });
        setSelectedItem(orderItemId);
    }

    const handleSubmitModification = (id, newQuantity) => {
        // TODO: once the new quantity of the order item has been chosen, update the order 
        const item = cart.find(item => item.id === id);
        if (!item) return;

        const difference = newQuantity - item.quantity;
        const updatedTotal = total + item.price * difference;

        setTotal(parseFloat(updatedTotal.toFixed(2)));

        dispatch({ type: 'MODIFY_ITEM', id, quantity: newQuantity });
        setShowModal(false);
    }

    return <div className="app">
        <h1>Sushi Delivery</h1>
        <MenuItemChooser handleAddToOrder={handleAddToOrder} />

        {/* TODO: the order state being passed to this component has not yet been initialized; do this before uncommenting the line below */}
        <Order order={cart} handleRemoveFromOrder={handleRemoveFromOrder} handleModifyOrderItem={handleModifyOrderItem} total={total} />

        {/* TODO: conditionally render <OrderItemModifier /> */}
        {showModal && <OrderItemModifier item={cart.find(item => item.id === selectedItem)} handleModifyOrderItem={handleModifyOrderItem} handleSubmitModification={handleSubmitModification} />}
    </div>;
}

export default App;