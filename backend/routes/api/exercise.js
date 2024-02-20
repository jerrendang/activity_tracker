const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Exercise } = require('../../db/models');

router.get('/:activityID', asyncHandler(async (req, res, next) => {
    const {activityID} = req.params;

    const exercises = await Exercise.findAll({
        where: {
            activity_id: activityID,
        }
    })
    console.log(Exercise)

    return res.json({exercises})
}))

router.delete('/:exerciseID', asyncHandler(async(req, res, next) => {
    const exerciseID = req.params.exerciseID;

    const deleted = await Exercise.destroy({
        where: {
            id: exerciseID
        }
    })

    return res.json({
        deleted
    })
}))

router.post('/', asyncHandler(async (req, res, next) => {
    const { exerciseName, activityID } = req.body

    const exercise = await Exercise.createExercise(exerciseName, activityID); // exercise object

    res.json({ exercise }) // exercise object
}))

module.exports = router;