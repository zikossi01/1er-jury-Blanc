const express = require('express')
const router = express.Router()

const Resource = require('../models/ResourcesModels')

router.post('/api/resources', async(req, res) => {
    try {    
        const creatresource = {
            task: req.body.task,
            Rname: req.body.Rname,
            Rtype: req.body.Rtype,
            Rquantity: req.body.Rquantity,
            Rsupplier: req.body.Rsupplier
        }

        const resource = new Resource(creatresource)
        const result = await resource.save();
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

router.get('/api/resources/:taskID', async(req, res) => {
    try {
        const task = await Resource.find({task: req.params.taskID}).populate('task')
        res.status(200).json(task)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

router.put('/api/resources/:id', async(req, res) => {
    try {
        const result = await Resource.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true  }
        )

        if(!result){
            return res.status(404).json({error: 'product not found !'})
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
})

router.delete('/api/resources/:id', async(req, res) => {
    try {
        const result = await Resource.findByIdAndDelete(req.params.id)
        if (!result){
            res.status(404).json({message: "product not found"})
        }
        res.status(200).json({message: "resource deleted succefuly"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

module.exports = router