import { Request, Response } from "express";
import { fetchRegions, fetchSpeciesByRegion } from "services";
import { ISpecies, createSpecies } from "models/speciesModel";

export async function getRegions(req: Request, res: Response) {
  const { token } = req.query;
  try {
    const regions = await fetchRegions(token);
    res.json(regions);
  } catch (error){ 
    res.status(500).json({ error: "Failed to fetch regions" })
  }
}

export async function getSpeciesByRegion(req: Request, res: Response) {
  const { token, regionIdentifier } = req.query;
  try {
      const speciesList = await fetchSpeciesByRegion(token, regionIdentifier);
    //   const speciesWithConservation: ISpecies[] = await Promise.all(
    //     speciesList.map(async (species: any) => {
    //         const conservationMeasures = await fetchConservationMeasures(token, species.taxonid);
    //         const measures = conservationMeasures.map((cm: any) => cm.title);
    //         return createSpecies(species.scientific_name, species.taxonid, measures);
    //     })
    // );

    res.json(speciesList);
  } catch (error) {
      res.status(500).json({ error: `Failed to fetch species for region ${regionIdentifier}` });
  }
}