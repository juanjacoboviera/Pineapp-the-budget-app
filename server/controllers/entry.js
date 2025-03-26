const Entry = require('../models/Entry')

const createEntry = async (req, res, next) =>{
    const entryCreator = req.user
    const fakeUserId = new mongoose.Types.ObjectId()
    const  entry_creator = {
        name: entryCreator.username,
        id: entryCreator._id
    }
    const {type, category, description, amount, date, iconCategory, iconType} = req.body.entry;
    try {
        const entry = new Entry({entryType: type, category, description,  amount: amount, date: date, iconCategory, iconType, entry_creator});
        const savedEntry = await entry.save()
        res.status(200).json({
            success: true,
            message: "Entry created successfully",
            entry: savedEntry
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        })
    }
}

const getAllEntries = async (req, res, next) =>{
    const userId = req.user._id
    try {
        const entries = await Entry.find({'entry_creator.id': userId })
        res.status(200).json({
            success: true,
            message: "Entries retrieved successfully",
            entries: entries
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        })
    }
}

module.exports = { createEntry, getAllEntries };