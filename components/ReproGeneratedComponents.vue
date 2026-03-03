<template>
  <section>
    <p>
      CSS-heavy components from <code>components/generated/</code> are rendered below.
    </p>

    <div v-if="!hasComponents">
      <p>No generated components found.</p>
    </div>

    <div v-else class="generated-components-grid">
      <component
        v-for="name in componentNames"
        :is="generatedComponents[name]"
        :key="name"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import generatedComponents, { componentNames as allNames } from '~/components/generated';

const componentNames = computed(() => allNames);
const hasComponents = computed(() => componentNames.value.length > 0);
</script>

<style scoped>
.generated-components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
}
</style>

