// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'http://localhost:4000/',
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// export default {
//   getRegions() {
//     return apiClient.get('region');
//   },
//   getSpeciesByRegion(regionIdentifier: string) {
//     return apiClient.get(`species/region/${regionIdentifier}/page/0?token=fCLN3hWzS6bexmCMAAr84F5ssCxqGt6MiGCW`);
//   },
// };

import axios from 'axios';

const API_URL = 'http://localhost:4000/';


export async function fetchRegions() {
  const response = await axios.get('http://localhost:4000/regions');
  return response.data;
}

export async function fetchSpeciesByRegion(region: string) {
  const response = await axios.get(`http://localhost:4000/species?region=${region}`);
  console.log(response.data)
  return response.data;
}

