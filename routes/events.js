const { Router } = require('express');
const { validateJWT } = require('../middlewares/jwt-validator');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

router.use(validateJWT);

// Get events
router.get('/', getEvents);

// Create event
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').trim().notEmpty(),
    check('start', 'Fecha de inicio es obligatoria').trim().isISO8601(),
    check('end', 'Fecha finalización es obligatoria').trim().isISO8601(),
    fieldsValidator
  ],
  createEvent
);

// Update event
router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').trim().notEmpty(),
    check('start', 'Fecha de inicio es obligatoria').trim().isISO8601(),
    check('end', 'Fecha finalización es obligatoria').trim().isISO8601(),
    check('id', 'The ID event is not valid').isMongoId(),
    fieldsValidator
  ],
  updateEvent
);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;
