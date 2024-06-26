import { Router } from "express";
import { getRegions, getSpeciesByRegion } from "controllers/speciesController";


const router = Router();

router.get('/regions', getRegions);
router.get('/species', getSpeciesByRegion);

export default router;