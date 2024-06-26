<template>
  <div class="container">
    <nav class="navbar">
      <RegionList :regions="regions" @regionSelected="handleRegionSelected" />
    </nav>
    <main class="content">
      <SpeciesList :speciesList="speciesList" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import RegionList from '@/components/RegionList.vue';
import SpeciesList from '@/components/SpeciesList.vue';
import { fetchRegions, fetchSpeciesByRegion } from '../services/iucnApiService';

export default defineComponent({
  name: 'HomePage',
  components: {
    RegionList,
    SpeciesList,
  },
  setup() {
    const regions = ref([]);
    const speciesList = ref([]);

    const handleRegionSelected = async (region: string) => {
      const speciesData = await fetchSpeciesByRegion(region);
      speciesList.value = speciesData;
    };

    onMounted(async () => {
      const regionsData = await fetchRegions();
      regions.value = regionsData.results;
    });

    return {
      regions,
      speciesList,
      handleRegionSelected,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.navbar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>