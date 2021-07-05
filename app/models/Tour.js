const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const TourSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true, maxLength: 255 },
        address: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        vehicle: {
            type: String,
        },
        timetable: {
            type: String,
        },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

TourSchema.plugin(AutoIncrement);

module.exports = mongoose.model('Tour', TourSchema);
