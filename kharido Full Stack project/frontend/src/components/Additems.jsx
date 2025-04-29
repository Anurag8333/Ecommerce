import React from 'react'

export default function Additems() {
    const handleSubmit = async(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const price = e.target.price.value;
        const quantity = e.target.quantity.value;
        const itemImage = e.target.image.value;
        const category = e.target.category.value;
        const data = {name, price, quantity, itemImage, category};
        // console.log(data);
        await fetch('http://localhost:8080/api/items/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(
            (data)=>{
                console.log(data);
                alert('Item Added Successfully');
            }
        ).catch(error => {
            console.log(error);
        }
        );
          e.target.reset();
    }

return (
    <div className='additems flex flex-col items-center h-screen w-full bg-blue-100 p-4'>
            <h2 className='text-2xl font-bold mb-4'>Add Items</h2>
            <form onSubmit={handleSubmit} className='flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
                    <label htmlFor="name" className='mb-2 font-semibold'>Name</label>
                    <input type="text" name="name" id="name" className='mb-4 p-2 border rounded' required />
                    <label htmlFor="price" className='mb-2 font-semibold'>Price</label>
                    <input type="text" name="price" id="price" className='mb-4 p-2 border rounded' required />
                    <label htmlFor="quantity" className='mb-2 font-semibold'>Quantity</label>
                    <input type="text" name="quantity" id="quantity" className='mb-4 p-2 border rounded' required />
                    <label htmlFor="image" className='mb-2 font-semibold'>Image Url:</label>
                    <input type="url" name="image" id="image" className='mb-4 p-2 border rounded' required />
                    <label htmlFor="category" className='mb-2 font-semibold'>Category</label>
                    <select name="category" id="category" className='mb-4 p-2 border rounded' required>
                        <option value="" defaultChecked disabled></option>
                        <option value="vegetables">Vegetables & Fruit</option>
                        <option value="munchies">Munchies</option>
                        <option value="frozen">Instant & Frozen Foods</option>
                        <option value="bakery">Bakery & Biscuit</option>
                    </select>
                    <button type="submit" className='bg-blue-500 text-white p-2 rounded hover:bg-blue-700'>Add Item</button>
            </form>
    </div>
)
}
