const router = require("express").Router();
const CalendarController = require('../controllers/calendar.controller');

router.get("/api/google", CalendarController.googleInit);
router.get("/api/google/redirect", CalendarController.googleRedirect);
router.post("/api/google/schedule-event", CalendarController.scheduleEvent);
module.exports = router;
