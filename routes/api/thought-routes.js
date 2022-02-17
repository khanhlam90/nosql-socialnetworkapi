const router = require('express'). Router();

const {
    getAllThought,
    GetThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

// set up GET one thought, PUT and DELETE at /api/thoughts/:id
router
    .route('/:id')
    .get(GetThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//set up POST to create reaction at /api/thoughts/:thoughtId/reactions
router  
    .route('/:thoughtId/reactions')
    .post(createReaction);

// set up  DELETE to remove a reaction at /api/thoughts/:thoughtId/reactions/:reactionId
router  
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;