// require Mongoose
const { Schema, model, Types } = require('mongoose');

// require date format
const dateFormat = require('../utils/dateFormat');

// ReactionSchema
const ReactionSchema = new Schema (
    {
        // set custom id to avoid confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: createAtVal => dateFormat(createAtVal)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// ThoughtSchema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280

        },
        createAt: {
            type: Date,
            default: Date.now,
            get: createAtVal => dateFormat(createAtVal)
        },
        username: {
            type: String,
            required: true
        },

        // use ReactionSchema above to validate the data
        reactions: [ReactionSchema]
    },
    {
        toJson: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// get total count of the thought's reactions 
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

//export the Thought Model
module.exports = Thought;