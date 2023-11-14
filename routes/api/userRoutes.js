const router = require('express').Router();
const {
    create,
    getAll,
    getOneById,
    update,
    deleteById,
    addFriend,
    deleteFriend
} = require('../../controllers/user_controllers')


// /api/users
router.route('/')
.get(getAll)
.post(create);


router.route('/:userId')
.get(getOneById)
.put(update)
.delete(deleteById);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;