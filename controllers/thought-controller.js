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
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that id!' });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
      },


    // createThought at /api/thoughts
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },


    // updateThought at /api/thoughts/:id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // deleteThought at /api/thoughts/:id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id!' });
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: parmas.userId },
                    { $pull: { thoughts: params.Id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
      },

    // createReaction at /api/thoughts/:thoughtId/reactions
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
                {_id: params.thoughtId}, 
                {$push: {reactions: body}}, 
                {new: true, runValidators: true})
            .populate({
                path: 'reactions', 
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with that id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err))
    },

    // deleteReaction at /api/thoughts/:thoughtId/reactions/:reactionId
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No reaction here!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
      }
    
};

module.exports = thoughtController;