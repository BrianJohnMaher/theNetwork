const router = require('express').Router();

const {
    create,
    getAll,
    getOneById,
    update,
    deleteOneById,
    deleteReaction
} = require('../../controllers/thought_controller');

// api/thoughts
router.route('/')
    .get(getAll)
    .post(create);

router.route('/:id/reactions')
    .post(addReaction);

router.route('/:id/reactions/:reactionId')
    .delete(deleteReaction);

router.route('/:id')
    .get(getOneById)
    .put(update)
    .delete(deleteOneById);

module.exports = router;