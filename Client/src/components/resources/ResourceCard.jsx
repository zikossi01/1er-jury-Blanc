import React from 'react';
import DateIcon from '../../assets/icons8-date-1-48.png'
import QuantityIcon from '../../assets/icons8-quantity-50.png'
import supplierIcon from '../../assets/icons8-supplier-50.png'
import ViewIcon from '../../assets/icons8-view-50.png'
import UpdateResources from './UpdateResources'
import DeleteResources from './DeleteResources'

const ResourceCard = ({e}) => {
    return (
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div className="p-4" key={e.id}>
            <h1 className='flex justify-center mb-4 bg-slate-600 text-white font-bold text-3xl'>task Details</h1>
                <h1 className="flex justify-center bg-gray-100 mb-1 text-slate-800 text-xl font-semibold">
                    Name : {e.Rname}
                </h1>
                <p className="flex justify-center mb-2 text-slate-600 leading-normal font-light">
                    {e.Rtype}
                </p>
                <h1 className='flex mb-2'>
                <img src={QuantityIcon} className='w-5 h-5 mr-2 mt-0.5'/>
                    quantity: {e.Rquantity}
                </h1>
                <h1 className='flex mb-2'>
                <img src={supplierIcon} className='w-5 h-5 mr-2 mt-0.5'/>
                    supplier: {e.Rsupplier}
                </h1>
                <div className='flex justify-center gap-9'>
                    <UpdateResources updateResource={e._id}/>
                    <DeleteResources deletedResources={e._id}/>
                </div>
            </div>
        </div>
    )
};

export default ResourceCard;