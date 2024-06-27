<template>
  <div class="container">
    <nav class="navbar">
      <RegionList :regions="regions" @region-selected="handleRegionSelected" />
    </nav>
    <main class="content">
      <SpeciesList :speciesList="filteredSpeciesList" @show-all="showAllSpecies" @filter-cr="filterCRSpecies" @filter-mm="filterMMSpecies"/>
    </main>
    <LoadingSpinner :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import RegionList from '@/components/RegionList.vue';
import SpeciesList from '@/components/SpeciesList.vue';
import LoadingSpinner from '@/components/common/Spinner.vue';
import { fetchRegions, fetchSpeciesByRegion } from '../services/iucnApiService';
import { Species } from '@/types';

export default defineComponent({
  name: 'HomePage',
  components: {
    RegionList,
    SpeciesList,
    LoadingSpinner
  },
  setup() {
    const regions = ref([]);
    const speciesList = ref<Species[]>([]);
    const filteredSpeciesList = ref<Species[]>([]);
    const loading = ref(false);



    const handleRegionSelected = async (regionIdentifier: string) => {
      loading.value = true;
      const speciesData = await fetchSpeciesByRegion(regionIdentifier);
      speciesList.value = speciesData;
      filteredSpeciesList.value = speciesList.value;
      loading.value = false;
    };

    const showAllSpecies = () => {
      filteredSpeciesList.value = speciesList.value;
    };

    const filterCRSpecies = () => {
      filteredSpeciesList.value = speciesList.value.filter(species => species.category === 'CR');
      console.log(filteredSpeciesList.value)
      console.log("dd")
    };

    const filterMMSpecies = () => {
      filteredSpeciesList.value = speciesList.value.filter(species => species.class_name === 'MAMMALIA');
      console.log(filteredSpeciesList.value)
      console.log("mamali")
    };

    onMounted(async () => {
      loading.value = true;
      const regionsData = await fetchRegions();
      regions.value = regionsData;
      loading.value = false;
    });

    return {
      regions,
      speciesList,
      filteredSpeciesList,
      loading,
      handleRegionSelected,
      showAllSpecies,
      filterCRSpecies,
      filterMMSpecies
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
