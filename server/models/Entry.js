const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema(
    {
        entryType: {
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        iconCategory: {
            type: String,
            required: true
        },
        iconType: {
            type: String,
            required: true
        },
        entry_creator: {
            name: { type: String, required: true },
            id: { type: Schema.Types.ObjectId, ref: 'user', required: true }
            }
    },
  { timestamps: true }
);

const Entry = mongoose.model('entry', entrySchema);

module.exports = Entry;