const { User, Thought } = require('../models');

module.exports = {
    async getAll(req, res) {
        try {
            const thoughts = await Thought.find();

            res.json(thoughts);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async getOneById(req, res) {
        try {
            const thought = await Thought.findById(req.params.id);

            res.json(thought);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async deleteOneById(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);

            if (!thought) {
                res.status(404).json({ message: 'User not found with that ID.' });
            }

            res.status(200).json({ message: 'User was deleted', thought });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async create(req, res) {
        try {

            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            res.status(200).json({ message: 'Thought created!' }, user);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async update(req, res) {
        try {

            const updated_thought = await Thought.findByIdAndUpdate(req.params.id, {
                $set: req.body

            }, { new: true })

            res.status(200).json({ message: 'User updated!', updated_thought });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async addReaction(req, res) {
        try {
            const reaction = await Thought.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: {
                        reactions: req.body
                    }
                },
                { new: true }
            );

            if (!reaction) {
                return res.status(404).json({ message: 'Thought not found with that ID.' });
            }

            res.status(200).json({
                message: 'Reaction Created',
                reaction
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findByIdAndUpdate(req.params.id, {
                $pull: {
                    reactions: { reactionId: req.params.reactionId }
                }
            }, { new: true });

            if (!reaction) {
                return res.status(404).json({ message: 'Thought not found with that ID.' });
            }

            res.status(200).json({
                message: 'Reaction Deleted',
                reaction
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

};