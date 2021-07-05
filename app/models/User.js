const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const VALID_EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VALID_PHONE_REGEX = /^[0-9]{10}$/;

const UserSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true, maxLength: 255 },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            match: VALID_EMAIL_REGEX,
        },
        password: { type: String, required: true },
        phone_number: {
            type: String,
            unique: true,
            match: VALID_PHONE_REGEX,
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'customer'],
            default: 'customer',
        },
    },
    {
        _id: false,
        timestamps: true,
    },
);

UserSchema.plugin(AutoIncrement);

module.exports = mongoose.model('User', UserSchema);
