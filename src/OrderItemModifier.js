import React, {useState} from 'react';

const OrderItemModifier = props=>{
    const [quantity, setQuantity] = useState(props.item.quantity);
    console.log(quantity)

    const handleChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleDone = () => {
        props.handleSubmitModification(props.item.id, quantity); 
    };

    // TODO: keep track of quantity change 

    return <div className="order-item-modifier">
        <div className="modal">
           {/* TODO: show order item details and allow the quantity to be changed */}
           <h2>Modify this item</h2>
            <h3>{props.item.name}</h3>
            <label>Quantity:</label>
            <input type='number' min={1} max={20} onChange={handleChange}></input>
            <button onClick={handleDone}>Done</button>
        </div>
    </div>;
}

export default OrderItemModifier;