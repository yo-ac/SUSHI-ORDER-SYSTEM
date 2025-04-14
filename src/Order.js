import React from 'react';

const Order = props => {

    return <div className="order">
        <h2>Your Order</h2>
        {/* TODO: list items that have been added to the order, with the total price, allow an item to be removed or modified */}
        <ul>
            {props.order.map(orderItem => 
            <li key={orderItem.id}>
                <span>{orderItem.name} </span>
                <span> x {orderItem.quantity}</span>
                <p>${orderItem.price}</p>
                <button onClick={event => props.handleRemoveFromOrder(event, orderItem.id)}>Remove</button>
                <button onClick={event => props.handleModifyOrderItem(event, orderItem.id)}>Modify</button>
            </li>
            )}
        </ul>
        <p>Total: $ {props.total}</p>
    </div>;
}

export default Order;