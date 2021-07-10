const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const TourSchema = new Schema(
    {
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
        timestamps: true,
    },
);

mongoose.plugin(slug);

module.exports = mongoose.model('Tour', TourSchema);
