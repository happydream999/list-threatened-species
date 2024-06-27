import axios from "axios";

export async function fetchRegions() {
  try {
    const response = await axios.get(
      `https://apiv3.iucnredlist.org/api/v3/region/list?token=${process.env.API_TOKEN}`
    );
    console.log(response);
    return response.data.results;
  } catch (error) {
    console.log("Error fetching regions", error);
    throw error;
  }
}

export async function fetchSpeciesByRegion(regionIdentifier) {
  try {
    const response = await axios.get(
      `https://apiv3.iucnredlist.org/api/v3/species/region/${regionIdentifier}/page/0?token=${process.env.API_TOKEN}`
    );
    return response.data.result;
  } catch (error) {
    console.error(
      `Error fetching species for region ${regionIdentifier}:`,
      error
    );
    throw error;
  }
}


