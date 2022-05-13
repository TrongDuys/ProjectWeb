const Diseases = require('../models/diseaseModel')


const diseaseCtrl = {
    createDisease: async (req, res) => {
        try {
            const {disease, symptom, reason, solution, url} = req.body
            const newDisease = new Diseases({
                disease,
                symptom, 
                reason, 
                solution, 
                url,
            })
            await newDisease.save();
            res.json({
                msg: "Create Disease",
                newDisease: {
                    ...newDisease._doc
                }
            })
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getDisease: async (req,res) => {
        try {
            const data = await Diseases.find({
                disease: { $regex: req.query.disease }
            })
    
            res.json({data})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
       
    }
}

module.exports = diseaseCtrl