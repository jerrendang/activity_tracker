const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const activityRouter = require('./activity');
const exerciseRouter = require('./exercise');
const exerciseRecordRouter = require('./exercise_records');
const recentRouter = require('./recent');

const cors = require(cors);

let corsOptions = {
    origin: ['']
}

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/activity', activityRouter);
router.use('/exercise', exerciseRouter);
router.use('/exercise_record', exerciseRecordRouter);
router.use('/recent', recentRouter);

module.exports = router;