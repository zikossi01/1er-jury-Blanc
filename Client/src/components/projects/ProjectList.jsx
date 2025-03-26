import { useState, useEffect } from "react"
import ProjectCard from "./ProjectCard"

const ProjectList = ({projects, loading}) => {
    const [newprojects, setnewProjects] = useState([])  // Change to array and better naming
    
    // Use useEffect to fetch data when component mounts
    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {
        try {
            const res = await fetch('http://localhost:3000/api/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            } 
            const data = await res.json()
            setnewProjects(data)  // Update state with fetched data
            console.log('get session data : ', data)
        } catch (error){
            console.log(error)
        }
    }
    
    return(
        <div className='container pb-16 mx-auto px-4 py-8'>
            {loading ? (
                <div className="flex justify-center items-center p-4">
                    <p className="text-gray-500">Loading projects...</p>
                </div>
            ) : newprojects.length > 0 ? (  // Check if there are projects to display
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(e => (
                        <>
                            <ProjectCard key={e._id || e} e={e}/>
                        </>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center p-4">
                    <p className="text-gray-500">No projects found</p>
                </div>
            )}
        </div>
    )
}

export default ProjectList