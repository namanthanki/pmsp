const mongoose = require('mongoose');

require('dotenv').config();

const { Schema, Types, Model } = mongoose

const scheduleSchema = new Schema(
    {
        schedule_link: {
            type: String,
        },
        schedule_requests: [
            {
                user: { type: Types.ObjectId } ,
                status: { type: String },
                meeting_start_time: { type: String },
                meeting_end_time: { type: String },
                meeting_date: { type: String },
                ref: "user",
            }
        ],
    }
);

module.exports = Model('Schedule', scheduleSchema);