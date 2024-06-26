<template>
  <div class="container">
    <nav class="navbar">
      <RegionList @regionSelected="fetchSpecies" />
    </nav>
    <main class="content">
      <SpeciesList :speciesList="speciesList" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegionList from '@/components/RegionList.vue';
import SpeciesList from '@/components/SpeciesList.vue';
import { fetchRegions, fetchSpeciesByRegion } from '../services/iucnApiService';
export default defineComponent({
  name: 'HomePage',
  components: {
    RegionList,
    SpeciesList,
  },
  data() {
    return {
      speciesList: [] as Array<{ taxonid: string; scientific_name: string }>,
    };
  },
  methods: {
    async fetchSpecies(region: string) {
      this.speciesList = await fetchSpeciesByRegion(region);
    },
  },
  async created() {
    await fetchRegions();
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
