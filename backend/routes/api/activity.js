const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router()

const { Activity } = require('../../db/models');

router.get('/:userID', asyncHandler( async (req, res, next) => {
    const { userID } = req.params;

    const activities = await Activity.findAll({
        where: {
            user_id: userID
        }
    })

    return res.json({activities})
}))

router.post('/', asyncHandler( async (req, res, next) => {
    const { userID, activityName } = req.body;

    const newActivity = await Activity.createActivity(activityName, userID);

    return res.json({newActivity})
}))

router.delete('/:activityID/:userID', asyncHandler(async (req, res, next) => {
    const {activityID, userID} = req.params;

    const destroyedActivity = await Activity.destroy({
        where: {
            id: activityID,
            user_id: userID
        }
    })

    return res.json({destroyedActivity});

}))

module.exports = router;