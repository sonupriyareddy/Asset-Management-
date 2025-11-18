import axios from "axios";
import { useState } from "react";

function AssetItemEditModel({ handleModalClose, editItem, modelId }) {
    const isEdit = Object.keys(editItem).length > 0;

    // Initial state
    const [itemDetails, setItemDetails] = useState(
        isEdit
            ? editItem
            : {
                  serialNumber: "",
                  purchaseDate: "",
                  purchaseCost: "",
                  status: "available",
                  condition: "good",
                  model: modelId,
              }
    );

    function onChangeHandler(event) {
        const { name, value } = event.target;
        setItemDetails({ ...itemDetails, [name]: value });
    }

    async function saveChanges(e) {
        e.preventDefault();

        try {
            if (isEdit) {
                // UPDATE
                await axios.put(
                    `http://localhost:8080/api/v1/asset-item/edit/${itemDetails._id}`,
                    itemDetails,
                    { withCredentials: true }
                );
            } else {
                // CREATE NEW ITEM
                await axios.post(
                    "http://localhost:8080/api/v1/asset-item/add",
                    {...itemDetails,model:modelId},
                    { withCredentials: true }
                );
            }
       // Refresh parent data
handleModalClose();    // Close modal

           
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">
                <form
                    onSubmit={saveChanges}
                    className="relative bg-white rounded-lg shadow-sm p-0"
                >
                    {/* HEADER */}
                    <div className="flex items-start justify-between p-4 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {isEdit ? "Edit Asset Item" : "Add New Asset Item"}
                        </h3>

                        <button
                            type="button"
                            onClick={handleModalClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center"
                        >
                            ✕
                        </button>
                    </div>

                    {/* BODY */}
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-6 gap-6">

                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Serial Number
                                </label>
                                <input
                                    type="text"
                                    name="serialNumber"
                                    required
                                    value={itemDetails.serialNumber}
                                    onChange={onChangeHandler}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Purchase Cost
                                </label>
                                <input
                                    type="number"
                                    name="purchaseCost"
                                    required
                                    value={itemDetails.purchaseCost}
                                    onChange={onChangeHandler}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Purchase Date
                                </label>
                                <input
                                    type="date"
                                    name="purchaseDate"
                                    required
                                    value={itemDetails.purchaseDate?.substring(0, 10)}
                                    onChange={onChangeHandler}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={itemDetails.status}
                                    onChange={onChangeHandler}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                                >
                                    <option value="available">Available</option>
                                    <option value="assigned">Assigned</option>
                                    <option value="repair">Repair</option>
                                </select>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Condition
                                </label>
                                <select
                                    name="condition"
                                    value={itemDetails.condition}
                                    onChange={onChangeHandler}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                                >
                                    <option value="good">Good</option>
                                    <option value="average">Average</option>
                                    <option value="bad">Bad</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center p-6 border-t border-gray-200">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            {isEdit ? "Save Changes" : "Add Item"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AssetItemEditModel;
