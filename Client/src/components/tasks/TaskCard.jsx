import React from 'react';
import DateIcon from '../../assets/icons8-date-1-48.png'
import ViewIcon from '../../assets/icons8-view-50.png'
import UpdateTask from './UpdateTasks';
import DeleteTask from './DeleteTasks';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({e}) => {
    const Navigation = useNavigate();
    const Navigate = () => {
        Navigation('/resources', {
            state: {taskID: e._id}
        })
    }

    return (
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div className="p-4" key={e.id}>
                <h1 className='flex justify-center mb-4 bg-slate-600 text-white font-bold text-3xl'>Task Details</h1>
                <h1 className="flex justify-center bg-gray-100 mb-1 text-slate-800 text-xl font-semibold">
                    Resources : {e.Tresources}
                </h1>
                <p className="flex justify-center mb-2 text-slate-600 leading-normal font-light">
                    {e.Tdescription}
                </p>
                <h1 className='flex mb-2'>
                <img src={DateIcon} className='w-5 h-5 mr-2 mt-0.5'/>
                    Start Date: {e.TstartDate.split('T')[0]}
                </h1>
                <h1 className='flex mb-2'>
                <img src={DateIcon} className='w-5 h-5 mr-2 mt-0.5'/>
                    End Date: {e.TendDate.split('T')[0]}
                </h1>
                <div className='flex justify-center gap-9'>
                    <UpdateTask updatedTask={e._id}/>
                    <DeleteTask deletedTask={e._id}/>
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

export default TaskCard;