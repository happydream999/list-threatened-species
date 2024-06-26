import { Request, Response } from "express";
import { fetchRegions, fetchSpeciesByRegion } from "services";

async function getRegions(req: Request, res: Response) {
  const { token } = req.query;
  try {
    const regions = await fetchRegions(token);
    res.json(regions);
  } catch (error){ 
    res.status(500).json({ error: "Failed to fetch regions" })
  }
}

async function getSpeciesByRegion(req: Request, res: Response) {
  const { token, regionIdentifier } = req.query;
  try {
      const speciesList = await fetchSpeciesByRegion(token, regionIdentifier);
      // Mapping results to Species model
      const speciesArray = speciesList.map(species => {
          return new species(species.name, species.identifier);
      });
      res.json(speciesArray);
  } catch (error) {
      res.status(500).json({ error: `Failed to fetch species for region ${regionIdentifier}` });
  }
}