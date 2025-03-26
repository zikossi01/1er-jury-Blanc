import React, { useState } from "react";
import UpdateIcon from '../../assets/icons8-update-50.png'
import * as Yup from 'yup';
import { useFormik } from "formik"
import '../style/Update.css'

// Add missing formatCurrency function

const UpdateTask = ({updatedTask}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const validationSchema = Yup.object({
        Tresources: Yup.string().required("Project name is required"),
        Tdescription: Yup.string().required("Description is required"),
        TstartDate: Yup.date().required("Start date is required"),
        TendDate: Yup.date()
          .required("End date is required")
          .min(Yup.ref("TstartDate"), "End date must be after start date"),
        });
    
    const formik = useFormik({
        initialValues: {
          Tresources: "",
          Tdescription: "",
          TstartDate: "",
          TendDate: "",
        },
        validationSchema,
        onSubmit: async (values) => {
          console.log("Form submitted:", values);
          try {
            
              const res = await fetch(`http://localhost:3000/api/tasks/${updatedTask}`, {
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
              console.log('updated task:', data);
              closeModal();
          } catch (error) {
              console.log('error updating data : ', error);
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
                                    Update Task
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
                            <div className="p-1 space-y-2">
                            <div>
                                <label htmlFor="Tresources" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">task name</label>
                                <input 
                                type="text" 
                                id="Tresources"
                                name="Tresources"
                                value={formik.values.Tresources}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="task resources"
                                />
                                {formik.touched.Tresources && formik.errors.Tresources ? (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.Tresources}</div>
                                ) : null}
                            </div>

                            <label htmlFor="TstartDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">task Date</label>
                            <div id="date-range-picker" className="flex items-center">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </div>
                                <input 
                                id="TstartDate"
                                name="TstartDate" 
                                type="Date" 
                                value={formik.values.TstartDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Select date start"/>
                                {formik.touched.TstartDate && formik.errors.TstartDate ? (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.TstartDate}</div>
                                ) : null}
                            </div>
                            <span className="mx-4 text-gray-500">to</span>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </div>
                                <input 
                                id="TendDate"
                                name="TendDate" 
                                type="Date" 
                                value={formik.values.TendDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Select date end"/>
                                {formik.touched.TendDate && formik.errors.TendDate ? (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.TendDate}</div>
                                ) : null}
                            </div>
                            </div>

                            <div>
                                <label htmlFor="Tdescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">task Description</label>
                                <textarea 
                                id="Tdescription"
                                name="Tdescription" 
                                value={formik.values.Tdescription}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Description" 
                                />
                                {formik.touched.Tdescription && formik.errors.Tdescription ? (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.Tdescription}</div>
                                ) : null}
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

export default UpdateTask;