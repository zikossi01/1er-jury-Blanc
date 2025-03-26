import { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import * as Yup from 'yup';
import { useFormik } from "formik";
import ResourceList from "./ResourceList";
import { useLocation } from "react-router-dom";
import '../style/add.css'

const Resources = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const location = useLocation();
    const taskID = location.state?.taskID;
    
    // Fetch resources on initial load
    useEffect(() => {
        fetchResources();
    }, []);
    
    const fetchResources = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/resources/${taskID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            
            const data = await res.json();
            setResources(Array.isArray(data) ? data : []);
            console.log('Fetched resources:', data);
        } catch (error) {
            console.log('Error fetching resources:', error);
        } finally {
            setLoading(false);
        }
    };

    const validationSchema = Yup.object({
        Rname: Yup.string().required("Resource name is required"),
        Rtype: Yup.string().required("Resource type is required"),
        Rquantity: Yup.number().required("Resource quantity is required"),
        Rsupplier: Yup.string().required("Supplier name is required"),
    });

    const formik = useFormik({
        initialValues: {
            task: taskID,
            Rname: "",
            Rtype: "",
            Rquantity: "",
            Rsupplier: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('this is task id : ', taskID);
            console.log("Form submitted:", values);
            try {
                const res = await fetch('http://localhost:3000/api/resources', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });
                
                if(!res.ok){
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                
                const data = await res.json();
                console.log('New resource created:', data);
                
                // Add the new resource to the resources state
                if (data._id) {
                    setResources(prevResources => [...prevResources, data]);
                }
                
                // Reset form and close modal
                formik.resetForm();
                closeModal();
                // Refresh the resources list
                fetchResources();
            } catch(error) {
                console.log('Error creating resource:', error);
            }
        }
    });

    return(
        <>
            <Navbar/>
            
            <div className="container mx-auto p-4">
                {/* Resource list display */}
                <div className="mt-20 m-5 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Resources</h1>
                    {/* Modal toggle */}
                    <button className="addbutton" onClick={openModal}>
                        <span className="text">Add</span>
                        <span className="icon"
                            ><svg
                            viewBox="0 0 24 24"
                            height="24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"></svg>
                            <span className="buttonSpan">+</span>
                            </span>
                    </button>
                </div>

                {/* Main modal */}
                {isOpen && (
                    <div
                        tabIndex="-1"
                        aria-hidden="true"
                        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                    >
                        <div 
                        className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-sm dark:bg-slate-900">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add resource
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
                            <form onSubmit={formik.handleSubmit}>
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
                                        className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700"
                                    >
                                        Add Resource
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="py-2.5 px-5 ms-3 text-sm font-medium text-red-900 bg-white rounded-lg border border-red-200 hover:bg-red-100 hover:text-blue-700 dark:bg-gray-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                
                <ResourceList resources={resources} loading={loading}/>
            </div>
        </>
    );
};

export default Resources;