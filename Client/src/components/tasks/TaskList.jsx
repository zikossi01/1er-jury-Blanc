import { useState, useEffect } from "react"
import TaskCard from "./TaskCard"
import { useLocation } from "react-router-dom";

const TaskList = ({tasks, loading}) => {
    const [newtasks, setnewtasks] = useState([])  // Change to array and better naming
    
    // Use useEffect to fetch data when component mounts
    useEffect(() => {
        getData()
    }, [])

    const location = useLocation();
    const project_id = location.state?.projectID
    const projectID = project_id

    const getData = async() => {
        try {
            console.log(projectID)
            const res = await fetch(`http://localhost:3000/api/tasks/${projectID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            } 
            const data = await res.json()
            console.log("geted date : ", data)
            setnewtasks(data)  // Update state with fetched data
        } catch (error){
            console.log(error)
        }
    }

    return(
        <div className='container mx-auto px-4 py-8'>
            {loading ? (
                <div className="flex justify-center items-center p-4">
                    <p className="text-gray-500">Loading tasks...</p>
                </div>
            ) : newtasks.length > 0 ? (  // Check if there are tasks to display
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map(e => (
                        <>
                            <TaskCard key={e._id || e} e={e}/>
                        </>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center p-4">
                    <p className="text-gray-500">No tasks found</p>
                </div>
            )}
        </div>
    )
}

export default TaskList