import { useState, useEffect } from "react"
import ResouceCard from "./ResourceCard"
import { useLocation } from "react-router-dom";

const ResourceList = ({resources, loading}) => {
    const [newresources, setnewresources] = useState([])  // Change to array and better naming
    
    // Use useEffect to fetch data when component mounts
    useEffect(() => {
        getData()
    }, [])

    const location = useLocation();
    const task_id = location.state?.taskID
    const taskID = task_id

    const getData = async() => {
        try {
            console.log('this is task id : ', taskID)
            const res = await fetch(`http://localhost:3000/api/resources/${taskID}`, {
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
            setnewresources(data)  // Update state with fetched data
        } catch (error){
            console.log(error)
        }
    }

    return(
        <div className='container mx-auto px-4 py-8'>
            {loading ? (
                <div className="flex justify-center items-center p-4">
                    <p className="text-gray-500">Loading resources...</p>
                </div>
            ) : newresources.length > 0 ? (  // Check if there are resources to display
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map(e => (
                        <>
                            <ResouceCard key={e._id || e} e={e}/>
                        </>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center p-4">
                    <p className="text-gray-500">No resource found</p>
                </div>
            )}
        </div>
    )
}

export default ResourceList