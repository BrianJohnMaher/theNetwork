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

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

router.route('/:id')
.get(getOneById)
.put(update)
.delete(deleteById);


module.exports = router;