const { User, Thought } = require('../models');

const thoughtController = {
    // getAllThought at /api/thoughts
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // getThoughtById at /api/thoughts/:id
    getThoughtById(){},


    // createThought at /api/thoughts
    createThought(){},


    // updateThought at /api/thoughts/:id
    updateThought(){},

    // deleteThought at /api/thoughts/:id
    deleteThought(){},

    // createReaction at /api/thoughts/:thoughtId/reactions
    createReaction(){},

    // deleteReaction at /api/thoughts/:thoughtId/reactions/:reactionId
    deleteReaction(){}
};

module.exports = thoughtController;