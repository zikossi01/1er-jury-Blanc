import React, { useState } from "react";
import UpdateIcon from '../../assets/icons8-update-50.png'
import * as Yup from 'yup';
import { useFormik } from "formik"
import '../style/Update.css'

// Add missing formatCurrency function
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
}

const UpdateProject = ({updateProject}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const validationSchema = Yup.object({
        Pname: Yup.string().required("Project name is required"),
        Pdescription: Yup.string().required("Description is required"),
        PstartDate: Yup.date().required("Start date is required"),
        PendDate: Yup.date()
          .required("End date is required")
          .min(Yup.ref("PstartDate"), "End date must be after start date"),
        Pbudget: Yup.number()
          .typeError("Budget must be a number")
          .required("Budget is required")
          .positive("Budget must be positive"),
    });
    
    const formik = useFormik({
        initialValues: {
          Pname: "",
          Pdescription: "",
          PstartDate: "",
          PendDate: "",
          Pbudget: "",
        },
        validationSchema,
        onSubmit: async (values) => {
          console.log("Form submitted:", values);
          
          try {
              const res = await fetch(`http://localhost:3000/api/projects/${updateProject}`, {
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
              console.log('updated project:', data);
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
                                    Update Project
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
                                <label htmlFor="Pname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project name</label>
                                <input 
                                type="text" 
                                id="Pname"
                                name="Pname"
                                value={formik.values.Pname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Project name"
                                />
                                {formik.touched.Pname && formik.errors.Pname ? (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.Pname}</div>
                                ) : null}
                            </div>

                            <label htmlFor="PstartDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Date</label>
                            <div id="date-range-picker" className="flex items-center">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </div>
                                <input 
                                id="PstartDate"
                                name="PstartDate" 
                                type="date" 
                                value={formik.values.PstartDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Select date start"/>
                                {formik.touched.PstartDate && formik.errors.PstartDate ? (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.PstartDate}</div>
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
                                id="PendDate"
                                name="PendDate" 
                                type="date" 
                                value={formik.values.PendDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Select date end"/>
                                {formik.touched.PendDate && formik.errors.PendDate ? (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.PendDate}</div>
                                ) : null}
                            </div>
                            </div>

                            <div>
                                <label htmlFor="Pdescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Description</label>
                                <textarea 
                                id="Pdescription"
                                name="Pdescription" 
                                value={formik.values.Pdescription}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Description" 
                                />
                                {formik.touched.Pdescription && formik.errors.Pdescription ? (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.Pdescription}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="Pbudget" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Budget</label>
                                <input 
                                type="text" 
                                id="Pbudget"
                                name="Pbudget" 
                                value={formik.values.Pbudget ? `$${formatCurrency(formik.values.Pbudget)}` : ""}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/[$,]/g, "");
                                  formik.setFieldValue("Pbudget", value);
                                }}
                                onBlur={formik.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Budget" 
                                />
                                {formik.touched.Pbudget && formik.errors.Pbudget ? (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.Pbudget}</div>
                                ) : null}
                            </div>
                            </div>

                            {/* Modal footer */}
                            <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default UpdateProject;