const google = require('googleapis').google;
const calendar = google.calendar({
    version: "v3",
    auth: process.env.OAUTH2_API_KEY
});
const dayjs = require('dayjs');

require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.OAUTH2_API_CLIENT_ID,
    process.env.OAUTH2_API_CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.events.readonly',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.settings.readonly'
];

const googleInit = (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    });

    res.redirect(url);
}

const googleRedirect = async (req, res) => {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    res.status(307).json({
        message: "Redirected"
    });
}

const scheduleEvent = async (req, res) => {
    try {
        const {
            summaryText,
            descriptionText,
            eventStartTime,
            eventEndTime,
            attendeesList
        } = req.body;
            await calendar.events.insert({
                calendarId: "primary",
                auth: oauth2Client,
                requestBody: {
                    summary: summaryText,
                    description: descriptionText,
                    start: {
                        // dateTime: dayjs(new Date()).add(2, 'day').toISOString(),
                        dateTime: eventStartTime,
                        timeZone: "Asia/Kolkata",
                    },
                    end: {
                        // dateTime: dayjs(new Date()).add(3, 'day').toISOString(),
                        dateTime: eventEndTime,
                        timeZone: "Asia/Kolkata",
                    },
                    attendees: attendeesList
                    // [
                    //     {
                    //       "email": "namanthanki785@gmail.com",
                    //       "displayName": "Naman Thanki",
                    //       "organizer": false,
                    //       "responseStatus": "needsAction", // needsAction, declined, tentative, accepted
                    //       "comment": "Good Work!",
                    //     },
                    //     {
                    //         "email": "stuniz7855@gmail.com",
                    //         "displayName": "Thanki Naman",
                    //         "organizer": false,
                    //         "responseStatus": "needsAction", // needsAction, declined, tentative, accepted
                    //         "comment": "Good Work!",
                    //       }
                    //   ]
                }
            });
    
            res.status(200).json({
                message: "Inserted Event"
            });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: "Failed to Insert Event"
        });
    }
}

module.exports = {
    googleInit,
    googleRedirect,
    scheduleEvent
};