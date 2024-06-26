export interface ISpecies {
  name: string;
  identifier: string;
  conservationMeasures: string[];
}

export function createSpecies(name: string, identifier: string, conservationMeasures: string[]): ISpecies {
  return { name, identifier, conservationMeasures };
}