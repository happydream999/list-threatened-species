import { Request, Response } from "express";
import { fetchRegions, fetchSpeciesByRegion, fetchConservationMeasures } from "services";
import { Species } from "models/speciesModel";

export async function getRegions(req: Request, res: Response) {
  try {
    const regions = await fetchRegions();
    res.json(regions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch regions" });
  }
}

export async function getSpeciesByRegion(req: Request, res: Response) {
  const { region } = req.query;
  console.log(region)
  if (!region) {
    return res.status(400).json({ error: "Region is required" }); 
  }
  try {
    const species = await fetchSpeciesByRegion(region as string);  //http://localhost:4000/species?region=europe
    res.json(species);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch species for region" });
  }
}

export const getSpeciesByCR = async (req: Request, res: Response) => {
  const { regionIdentifier } = req.query;
  let speciesList = await fetchSpeciesByRegion(regionIdentifier);
  
  // Map to Species model and filter critically endangered
  speciesList = speciesList.map((species: any) => ({
    name: species.scientific_name,
    identifier: species.taxonid,
    category: species.category,
    conservationMeasures: ''
  }));

  const criticallyEndangeredSpecies = speciesList.filter((species: Species) => species.category === 'CR');

  for (let species of criticallyEndangeredSpecies) {
    const measures = await fetchConservationMeasures(species.identifier);
    species.conservationMeasures = measures.map((measure: any) => measure.title).join(', ');
  }
  res.json(criticallyEndangeredSpecies);
};
