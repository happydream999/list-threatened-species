interface ConservationMeasure {
  code: string;
  title: string;
}
export interface Species {
  name: string;
  identifier: string;
  category: string;
  conservationMeasures: ConservationMeasure[];
}

// export function createSpecies(name: string, identifier: string, conservationMeasures: string[]): ISpecies {
//   return { name, identifier, conservationMeasures };
// }