import { useEffect, useState } from "react";

const AddToCart = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user._id) {
            setLoading(false);
            return;}

        const fetchOrders = async () => {
            try {
                 await fetch(`http://localhost:8080/api/orders/${user._id}`)
                .then((response)=>response.json())
                .then((data)=>{
                    setOrders(data);
                    setLoading(false);  
                })
                .catch((err)=>{
                console.log(err);
                });
            } catch (error) {
                console.error("Error fetching orders:", error);
            } 
        };

        fetchOrders();
    }, [user]); 

    // Function to delete an order
    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete order");
            }

            // Remove order from UI
            setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Your Orders</h1>

            {loading ? (
                <p className="text-gray-500">Loading orders...</p>
            ) : orders.length > 0 ? (
                orders.map(order => (
                    <div key={order._id} className="border p-4 mb-4 rounded shadow">
                        <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                        <p className="text-gray-600">Status: {order.status}</p>
                        <p className="text-gray-600">Total Price: ${order.totalPrice.toFixed(2)}</p>

                        <div className="mt-2">
                            <h3 className="text-lg font-bold">Items:</h3>
                            {order && order.items.map(item => (
                                <div key={item.product._id} className="flex items-center border-b py-2">
                                    <img src={item.product.itemImage || "https://via.placeholder.com/100"}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover mr-4" />
                                    <div>
                                        <p className="font-semibold">{item.product.name}</p>
                                        <p className="text-gray-700">Price: ${item.product.price.toFixed(2)}</p>
                                        <p className="text-gray-700">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ✅ Delete Order Button */}
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => deleteOrder(order._id)}
                        >
                            Delete Order
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No orders found.</p>
            )}
        </div>
    );
};

export default AddToCart;
