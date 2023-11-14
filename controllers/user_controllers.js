const { User, Thought } = require('../models');

module.exports = {
    async getAll(req, res) {
        try {
            const users = await User.find();

            res.status(200).json(users);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async getOneById(req, res) {
        try {
            const user = await User.findById(req.params.userId)
                .populate('thoughts').populate('friends');

            res.status(200).json(user);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async create(req, res) {
        try {
            const new_user = await User.create(req.body);

            res.status(200).json(new_user);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async update(req, res) {
        try {

            const updated_user = await User.findByIdAndUpdate(
                req.params.userId,
                {
                    $set: req.body

                },
                { new: true }
            )

            res.status(200).json({ message: 'User updated!', updated_user });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async deleteById(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found with that ID.' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.status(200).json({ message: 'User was deleted' });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, {
                $addToSet: {
                    friends: req.params.friendId
                }
            }, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'User not found with that ID.' });
            }

            res.status(200).json({ message: 'New friend added!', user })

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, {
                $pull: {
                    friends: req.params.friendId
                }
            }, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'User not found with that ID.' });
            }

            res.status(200).json({ message: 'Friend removed from list!', user })

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
};