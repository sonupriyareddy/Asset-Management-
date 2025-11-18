import React, { useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast'

export const EmployeeEditModel = ({ editEmployee, handleModelClose }) => {
    const isEdit = Object.keys(editEmployee).length > 0 //is edit mode or add mode
    const [employeeDetails, setEmployeeDetails] = useState(isEdit ? editEmployee : {})
    function onChangeHandler(event) {
        let name = event.target.name
        let value = event.target.value
        setEmployeeDetails({ ...employeeDetails, [name]: value })
    }
    async function saveChanges(e) {
        e.preventDefault()
        console.log(employeeDetails)
        if (isEdit) {
            try {
                
                await axios.put(
                    `http://localhost:8080/api/v1/user/edit/employee`,
                    employeeDetails, // the data you want to update
                    {
                        withCredentials: true,
                        headers: { empid: employeeDetails._id }
                    } // optional: only if you use cookies/JWT
                );
                handleModelClose();

            } catch (error) {
                console.error("Error updating employee:", error);
            }
        } else {
            try {
                toast.loading("Adding.....",{id:"add"})
                await axios.post(
                    `http://localhost:8080/api/v1/user/add/employee`,
                    employeeDetails, // the data you want to update
                    { withCredentials: true, } // optional: only if you use cookies/JWT
                );
                handleModelClose();
 toast.success("Employee added",{id:"add"})
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message,{id:"add"})
            }

        }

    }
    return (
        <>
            {/* <!-- Edit user modal --> */}
            <div class="fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-2xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <form class={`relative ${isEdit?"bg-white":"bg-green-400"} rounded-lg shadow-sm dark:bg-gray-700`} onSubmit={saveChanges}>
                        {/* <!-- Modal header --> */}
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                {isEdit?"Edit Employee Details":"Add New Employee"}
                            </h3>
                            <button onClick={handleModelClose} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div class="p-6 space-y-6">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name</label>
                                    <input type="text" name="name" id="name" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        value={employeeDetails.name ? employeeDetails.name : ""} onChange={(event) => onChangeHandler(event)} />
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        value={employeeDetails.email ? employeeDetails.email : ""}
                                        onChange={(event) => onChangeHandler(event)} />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="mobile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                                    <input type="number" name="mobile" id="mobile" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        value={employeeDetails.mobile ? employeeDetails.mobile : ""}
                                        onChange={(event) => onChangeHandler(event)} />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                    <input type="text" name="department" id="department" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        value={employeeDetails.department ? employeeDetails.department : ""}
                                        onChange={(event) => onChangeHandler(event)} />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="designation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                                    <input type="text" name="designation" id="designation" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        value={employeeDetails.designation ? employeeDetails.designation : ""}
                                        onChange={(event) => onChangeHandler(event)} />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                    <select type="text" name="status" id="status" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={employeeDetails.status ? employeeDetails.status : ""}
                                        onChange={(event) => onChangeHandler(event)} >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>


                            </div>
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div class="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isEdit?"Save All":"Add Employee"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
