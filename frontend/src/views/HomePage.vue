<template>
  <div>
    <RegionList @regionSelected="fetchSpecies" />
    <SpeciesList :speciesList="speciesList" />
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
      speciesList: [] as Array<{ name: string; identifier: string }>,
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
