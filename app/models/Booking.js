const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VALID_EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VALID_PHONE_REGEX = /^[0-9]{10}$/;

const BookingSchema = new Schema(
    {
        name: { type: String, required: true, maxLength: 255 },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            match: VALID_EMAIL_REGEX,
        },
        phone_number: {
            type: String,
            unique: true,
            match: VALID_PHONE_REGEX,
        },
        user: {
            type: ObjectId,
            ref: 'User',
        },
        tour: {
            type: ObjectId,
            ref: 'Tour',
        },
        booking_details: {
            departure_date: Date,
            guest_number: Number,
            price: Number,
            date_from: Date,
            date_to: Date,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Booking', BookingSchema);
