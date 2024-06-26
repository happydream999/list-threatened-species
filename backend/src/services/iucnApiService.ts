import axios from "axios";

export async function fetchRegions(token) {
  try {
    const response = await axios.get(`https://apiv3.iucnredlist.org/api/v3/region/list?token=${token}`);
    return response.data.results;
  } catch (error){
    console.log("Error fetching regions", error);
    throw error;
  }
}

export async function fetchSpeciesByRegion(token, regionIdentifier){
  try {
    const response = await axios.get(`https://apiv3.iucnredlist.org/api/v3/species/region/${regionIdentifier}/page/0?token=${token}`);
    return response.data.result;
  } catch (error) {
    console.error(`Error fetching species for region ${regionIdentifier}:`, error);
    throw error;
  }
  
}