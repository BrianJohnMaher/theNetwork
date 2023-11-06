const router = require('express').Router();
const {
create, 
getAll, 
getOneById,
update,
deleteById
} =  require('../../controllers/user_controllers')


// /api/users
router.route('/').get(getAll).post(create);

router.route('/:id').get(getOneById).put(update).delete(deleteById)


module.exports = router;