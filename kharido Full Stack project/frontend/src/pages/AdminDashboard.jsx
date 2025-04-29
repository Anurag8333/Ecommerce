import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = ({admin}) => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch all items
  const fetchItems = async () => {
    const response = await fetch("http://localhost:8080/api/items/");
    const data = await response.json();
    setItems(data);
  };

  // Add new item
  const addItem =  () => {
   navigate('/additems');
  };

  // Update an item
  const updateItem = async (id, name) => {
    await fetch(`http://localhost:8080/api/items/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setEditing(null);
    fetchItems();
  };

  // Delete an item
  const deleteItem = async (id) => {
    await fetch(`http://localhost:8080/api/items/delete/${id}`, {
      method: "DELETE",
    });
    fetchItems();
  };

  return (
    <div>
      {admin ? (
        <div className="p-10 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

          {/* Add New Item */}
          <button onClick={addItem} className="bg-green-500 text-white p-2 ml-2 mb-2">
            Add Items
          </button>

          {/* Item List */}
          <ul>
            {items.map((item) => (
              <li key={item._id} className="border p-2 flex justify-between">
                {editing === item._id ? (
                  <input
                    type="text"
                    defaultValue={item.name}
                    onBlur={(e) => updateItem(item._id, e.target.value)}
                    autoFocus
                  />
                ) : (
                  <span>{item.name}</span>
                )}
                <div>
                  <button onClick={() => setEditing(item._id)} className="bg-yellow-500 text-white p-1 mx-1">
                    Edit
                  </button>
                  <button onClick={() => deleteItem(item._id)} className="bg-red-500 text-white p-1">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5"><h1 className="text-center text-bold text-[1.5rem] mt-10">Login As Admin For Admin Panel</h1>
       <Link to={'/adminlogin'}> <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Admin As login</button></Link>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
