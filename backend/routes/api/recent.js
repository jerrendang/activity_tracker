const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {User_activity} = require('../../db/models')

router.get('/:userID/:page/:numResults', asyncHandler(async (req, res, next) => {
    const { userID, page, numResults } = req.params;

    const records = await User_activity.findAll({
        where: {
            user_id: userID
        },
        limit: numResults,
        offset: ((page - 1) * numResults)
    })

    return res.json({records})
}));

router.get('/mostRecent/:userID', asyncHandler(async (req, res, next) => {
    const { userID } = req.params;

    const mostRecent = await User_activity.findOne({
        where: {
            user_id: userID
        },
        order: [[ 'createdAt', 'DESC' ]]
    })

    return res.json({mostRecent})
}))

module.exports = router;