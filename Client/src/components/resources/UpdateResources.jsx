import React, { useState } from "react";
import UpdateIcon from '../../assets/icons8-update-50.png'
import * as Yup from 'yup';
import { useFormik } from "formik"
import '../style/Update.css'

// Add missing formatCurrency function

const UpdateResources = ({updateResource}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const validationSchema = Yup.object({
        Rname: Yup.string().required("Resources name is required"),
        Rtype: Yup.string().required("Type is required"),
        Rquantity: Yup.number().required("Quantity is required"),
        Rsupplier: Yup.string().required("Supplier is required")
        });
    
    const formik = useFormik({
        initialValues: {
            Rname: "",
            Rtype: "",
            Rquantity: "",
            Rsupplier: "",
        },
        validationSchema,
        onSubmit: async (values) => {
          console.log("Form submitted:", values);
          try {
            
              const res = await fetch(`http://localhost:3000/api/resources/${updateResource}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(values)
              });
              
              if(!res.ok){
                  throw new Error(`HTTP error! Status: ${res.status}`);
              }
              
              const data = await res.json();
              console.log('updated resources:', data);
              closeModal();
          } catch (error) {
              console.log('error updating resources : ', error);
          }
          location.reload();
        },
    });

    return (
        <>
            {/* Modal toggle */}
            <button 
            className="Update-button"
            onClick={openModal}>
                <img src={UpdateIcon} alt="Update Icon" className="Update-svgIcon " />
            </button>

            {/* Main modal */}
            {isOpen && (
                <div
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                >
                <form onSubmit={formik.handleSubmit}>
                    <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-sm dark:bg-slate-900">
                        {/* Modal header */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Update resources
                                </h3>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className="p-4 space-y-4">
                                    <div>
                                        <label htmlFor="Rname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resource Name</label>
                                        <input 
                                            type="text" 
                                            id="Rname"
                                            name="Rname"
                                            value={formik.values.Rname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Resource name"
                                        />
                                        {formik.touched.Rname && formik.errors.Rname ? (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.Rname}</div>
                                        ) : null}
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="Rtype" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resource Type</label>
                                        <input 
                                            type="text" 
                                            id="Rtype"
                                            name="Rtype" 
                                            value={formik.values.Rtype}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Enter resource type"
                                        />
                                        {formik.touched.Rtype && formik.errors.Rtype ? (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.Rtype}</div>
                                        ) : null}
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="Rquantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                            <input 
                                                id="Rquantity"
                                                name="Rquantity" 
                                                type="number" 
                                                value={formik.values.Rquantity}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Enter quantity"
                                            />
                                            {formik.touched.Rquantity && formik.errors.Rquantity ? (
                                                <div className="text-red-500 text-sm mt-1">{formik.errors.Rquantity}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label htmlFor="Rsupplier" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Supplier</label>
                                            <input 
                                                id="Rsupplier"
                                                name="Rsupplier" 
                                                type="text" 
                                                value={formik.values.Rsupplier}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Enter supplier name"
                                            />
                                            {formik.touched.Rsupplier && formik.errors.Rsupplier ? (
                                                <div className="text-red-500 text-sm mt-1">{formik.errors.Rsupplier}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                            {/* Modal footer */}
                            <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    type="submit"
                                    className="text-white bg-green-700 hover:bg-green-800  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default UpdateResources;