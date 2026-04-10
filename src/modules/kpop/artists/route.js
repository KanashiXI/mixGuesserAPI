import { Router } from 'express';
import { artistsController } from './controller.js';

const router = Router();

router.get('/artists', artistsController.getAllArtists);
router.post('/artists', artistsController.addArtist);
router.post('/artists/bulk/create', artistsController.addBulkArtists);
router.put('/artists/:id', artistsController.updateArtist);
router.delete('/artists/:id', artistsController.deleteArtist);

export default router;
