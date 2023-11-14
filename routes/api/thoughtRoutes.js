const router = require('express').Router();

const {
    create,
    getAll,
    getOneById,
    update,
    deleteOneById,
    deleteReaction, 
    addReaction
} = require('../../controllers/thought_controller');

// api/thoughts
router.route('/')
    .get(getAll)
    .post(create);

router.route('/:thoughtId')
    .get(getOneById)
    .put(update)
    .delete(deleteOneById);

router.route('/:thoughtId/reactions')
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;