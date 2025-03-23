const Entry = require('../models/Entry')

const createEntry = async (req, res, next) =>{
    const {type, category, description, amount, date, iconCategory, iconType} = req.body.entry;
    try {
        const entry = new Entry({entryType: type, category, description,  amount: amount, date: date, iconCategory, iconType});
        const savedEntry = await entry.save()
        res.status(200).json({
            success: true,
            message: "Entry created successfully",
            entry: savedEntry
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        })
    }
}

module.exports = { createEntry };