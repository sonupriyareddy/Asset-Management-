import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AssetItemEditModel from "../AssetItemEditModel.jsx"


function AllAssetItems() {
    const {id}=useParams()
    const [data,setData]=useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
const [editItem, setEditItem] = useState({});


    useEffect(()=>{
      if(!isModalOpen)
         fetchAllItems()
    },[isModalOpen])
    async function fetchAllItems() {
        try {
            let response=await axios.get(`http://localhost:8080/api/v1/asset-model/${id}`,{
                withCredentials:true
            })
            console.log(response.data)
            setData(response.data)

        } catch (error) {
            console.log(error)
        }
    }
    function openEditModal(item) {
    setEditItem(item);         // store the item being edited
    setIsModalOpen(true);      // show modal
}
async function handleDelete(itemId) {
  try {
    await axios.delete(
      `http://localhost:8080/api/v1/asset-item/delete?id=${itemId}`,
      { withCredentials: true }
    );

    // Update UI without refresh
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item._id !== itemId)
    }));

    toast.success("Item deleted successfully!");

  } catch (error) {
    console.error(error);
    toast.error("Failed to delete item");
  }
}


  return (
  <>
  
 
 <>
  {/* 🔵 MODEL DETAILS CARD */}
  <div className="bg-white shadow-lg rounded-xl p-6 border mb-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">
      {data.name}
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">

      <p>
        <span className="font-semibold">Category:</span> {data.category}
      </p>

      <p>
        <span className="font-semibold">Manufacturer:</span> {data.manufacturer}
      </p>

      <p>
        <span className="font-semibold">Depreciation Method:</span> {data.depriciationMethod}
      </p>

      <p>
        <span className="font-semibold">Useful Life:</span> {data.usefulLifeYears} years
      </p>

      <p>
        <span className="font-semibold">Total Items:</span> {data.items?.length}
      </p>
    </div>
  </div>
  <div className="flex justify-end mb-5">
 <button
  onClick={() => {
    setEditItem({});           // empty object = add mode
    setIsModalOpen(true);      // open modal
  }}
  className="bg-green-600 text-white font-semibold text-lg py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200"
>
  + Add New Item
</button>
</div>


  {/* 🔵 ITEMS SECTION */}
  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
    All Items
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.items?.length > 0 ? (
      data.items.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl border p-6 flex flex-col gap-3"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{data.name}</h3>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                item.status === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {item.status}
            </span>
          </div>

          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Serial Number:</span> {item.serialNumber}
          </p>

          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Price:</span> ₹{item.purchaseCost}
          </p>

          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Purchase Date:</span>{" "}
            {new Date(item.purchaseDate).toLocaleDateString()}
          </p>

          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Condition:</span> {item.condition}
          </p>

          <div className="flex justify-between gap-3 pt-4 mt-2 border-t">
           <button
  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
  onClick={() => openEditModal(item)}
>
  Edit
</button>

           <button
  onClick={() => handleDelete(item._id)}
  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
>
  Delete
</button>
          </div>
        </div>
      ))
    ) : (
      <h3 className="text-gray-600">No items found.</h3>
    )}
  </div>

  {/* Edit Modal */}
      {isModalOpen && (
        <AssetItemEditModel
          editItem={editItem}
          modelId={data._id}
          handleModalClose={() => setIsModalOpen(false)}
         
        />
      )}
      
</>

</>


  )
}

export default AllAssetItems