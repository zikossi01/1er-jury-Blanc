import React from 'react';
import DateIcon from '../../assets/icons8-date-1-48.png'
import budgetIcon from '../../assets/icons8-money-100.png'
import ViewIcon from '../../assets/icons8-view-50.png'
import Deleteproject from './Deleteproject';
import UpdateProject from './Updateproject';
import { useNavigate } from 'react-router-dom'
import '../style/view.css'


const ProjectCard = ({e}) => {
    const navigation = useNavigate()
    const Navigate = () => {
        navigation('/Tasks',{
            state: {projectID: e._id}
        })
    }
    return (
        <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="p-4" key={e.id}>
                <h1 className='flex justify-center mb-4 bg-slate-600 text-white font-bold text-3xl'>Project Details</h1>
                <h1 className="flex justify-center bg-gray-100 mb-1 text-slate-800 text-xl font-semibold">
                    Title : {e.Pname}
                </h1>
                <p className="flex justify-center mb-2 text-slate-600 leading-normal font-light">
                    {e.Pdescription}
                </p>
                <h1 className='flex mb-2'>
                <img src={DateIcon} className='w-5 h-5 mr-2 mt-0.5'/>
                    Start Date: {e.PstartDate.split('T')[0]}
                </h1>
                <h1 className='flex mb-2'>
                <img src={DateIcon} className='w-5 h-5 mr-2 mt-0.5'/>
                    End Date: {e.PendDate.split('T')[0]}
                </h1>
                <h1 className='flex mb-2'>
                <img src={budgetIcon} className='w-5 h-5 mr-2 mt-0.5'/>
                    Budget: {e.Pbudget}
                </h1>
                <div className='flex justify-center gap-9 m-5'>
                    <UpdateProject updateProject={e._id}/>
                    <Deleteproject deleteProject={e._id}/>
                    <button 
                    onClick={Navigate}
                    className="View-button">
                    <img src={ViewIcon} className='View-svgIcon '/>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ProjectCard;