import { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import * as Yup from 'yup';
import { useFormik } from "formik";
import TaskList from "./TaskList";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import '../style/add.css'

const Tasks = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const location = useLocation();
    const project_id = location.state?.projectID
    const projectID = project_id
    // Fetch tasks on initial load
    useEffect(() => {
        fetchTasks();
    }, []);
    
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${projectID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            
            const data = await res.json();
            setTasks(Array.isArray(data) ? data : []);
            console.log('Fetched tasks:', data);
        } catch (error) {
            console.log('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const validationSchema = Yup.object({
        Tdescription: Yup.string().required("Task description is required"),
        TstartDate: Yup.date().required("Start date is required"),
        TendDate: Yup.date().required("End date is required"),
        Tresources: Yup.string().required("Project name is required"),
    });

    const formik = useFormik({
        initialValues: {
            project: projectID,
            Tdescription: "",
            TstartDate: "",
            TendDate: "",
            Tresources: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('this is project id : ', projectID)
            console.log("Form submitted:", values);
            toast.success('add task succesfully')
            try {
                const res = await fetch('http://localhost:3000/api/tasks', {
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
                console.log('New task created:', data);
                
                // Add the new task to the tasks state
                if (data._id) {
                    setTasks(prevTasks => [...prevTasks, data]);
                }
                
                // Reset form and close modal
                formik.resetForm();
                closeModal();
                // Refresh the tasks list
                // location.reload();
                fetchTasks();
            } catch(error) {
                console.log('Error creating task:', error);
            }
        }
    });

    return(
        <>
            <Toaster/>
            <Navbar/>
            <div className="container mx-auto p-4">
                {/* Task list display */}
                <div className="mt-20 m-5 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Tasks</h1>
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
                                    Add Task
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
                                        <label htmlFor="Tresources" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
                                        <input 
                                            type="text" 
                                            id="Tresources"
                                            name="Tresources"
                                            value={formik.values.Tresources}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Enter project name"
                                        />
                                        {formik.touched.Tresources && formik.errors.Tresources ? (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.Tresources}</div>
                                        ) : null}
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="Tdescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
                                        <textarea 
                                            id="Tdescription"
                                            name="Tdescription" 
                                            value={formik.values.Tdescription}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Enter task description"
                                            rows="3"
                                        />
                                        {formik.touched.Tdescription && formik.errors.Tdescription ? (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.Tdescription}</div>
                                        ) : null}
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Date Range</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <label htmlFor="TstartDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none mt-8">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                                    </svg>
                                                </div>
                                                <input 
                                                    id="TstartDate"
                                                    name="TstartDate" 
                                                    type="date" 
                                                    value={formik.values.TstartDate}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                />
                                                {formik.touched.TstartDate && formik.errors.TstartDate ? (
                                                    <div className="text-red-500 text-sm mt-1">{formik.errors.TstartDate}</div>
                                                ) : null}
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="TendDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none mt-8">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                                    </svg>
                                                </div>
                                                <input 
                                                    id="TendDate"
                                                    name="TendDate" 
                                                    type="date" 
                                                    value={formik.values.TendDate}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                />
                                                {formik.touched.TendDate && formik.errors.TendDate ? (
                                                    <div className="text-red-500 text-sm mt-1">{formik.errors.TendDate}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal footer */}
                                <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        type="submit"
                                        className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700"
                                    >
                                        Add Task
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
            </div>
                <TaskList tasks={tasks} loading={loading}/>
        </>
    );
};

export default Tasks;