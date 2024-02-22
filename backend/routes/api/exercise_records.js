const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const moment = require('moment');
const {Op} = require('sequelize');

const { Exercise_record, User_activity } = require('../../db/models');

router.get('/activityRecord/:userID/:timeSpan', asyncHandler(async (req, res, next) => {
    const {userID, timeSpan} = req.params;

    const records = await User_activity.findAll({
        where: {
            user_id: userID,
            createdAt: {
                [Op.gte]:moment().subtract(parseInt(timeSpan), 'days').toDate()
            }
        }
    })

    return res.json({records});
}))

router.get('/:exerciseID/:userID', asyncHandler(async (req, res, next) => {
    const {exerciseID, userID} = req.params;

    const records = await Exercise_record.findAll({
        where: {
            exercise_id: exerciseID,
            user_id: userID
        },
        order: [['createdAt', 'ASC']]
    })

    return res.json({records});
}))

router.post('/', asyncHandler(async (req, res, next) => {
    const { record, user_id, activity_id, activity_name, title, notes } = req.body;

    // we also need to create the user_activities
    // addRecord = (record, user_id, activity_id, activity_name, title = '', notes = '')
    const newActivity = await User_activity.newActivity(user_id, activity_id, activity_name, title, notes)
    // newActivity = (user_id, activity_id, activity_name, title = '', notes = '')
    const newRecord = await Exercise_record.createRecord(record, user_id, activity_id, newActivity.id);
}))

module.exports = router;