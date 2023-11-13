const { model, Schema } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(createdAt) {
                return createdAt.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

thoughtSchema
    .virtual('reactionCount')
    // getter
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;