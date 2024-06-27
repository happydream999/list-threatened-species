import { Request, Response } from "express";
import { fetchRegions, fetchSpeciesByRegion } from "services";

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
