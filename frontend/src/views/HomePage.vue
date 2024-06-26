<template>
  <div class="container">
    <div class="navbar">
      <RegionList :regions="regions" @region-selected="handleRegionSelected" />
    </div>
    <div class="content">
      <SpeciesList :speciesList="filteredSpeciesList" @show-all="showAllSpecies" @filter-cr="filterCRSpecies" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import RegionList from '@/components/RegionList.vue';
import SpeciesList from '@/components/SpeciesList.vue';
import { fetchRegions, fetchSpeciesByRegion } from '../services/iucnApiService';
import { Species } from '@/types';

export default defineComponent({
  name: 'HomePage',
  components: {
    RegionList,
    SpeciesList,
  },
  setup() {
    const regions = ref([]);
    const speciesList = ref<Species[]>([]);
    const filteredSpeciesList = ref<Species[]>([]);

    const handleRegionSelected = async (regionIdentifier: string) => {
      const speciesData = await fetchSpeciesByRegion(regionIdentifier);
      speciesList.value = speciesData;
      filteredSpeciesList.value = speciesList.value;
    };

    const showAllSpecies = () => {
      filteredSpeciesList.value = speciesList.value;
    };

    const filterCRSpecies = () => {
      filteredSpeciesList.value = speciesList.value.filter(species => species.category === 'CR');
    };

    onMounted(async () => {
      const regionsData = await fetchRegions();
      regions.value = regionsData;
    });

    return {
      regions,
      speciesList,
      filteredSpeciesList,
      handleRegionSelected,
      showAllSpecies,
      filterCRSpecies,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
}

.navbar {
  width: 20%;
  background-color: #f8f8f8;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.content {
  width: 80%;
  padding: 20px;
}
</style>
