<template>
  <section class="generated-section">
    <header class="generated-section__header">
      <h2 class="generated-section__title">
        {{ title }}
      </h2>
      <p v-if="description" class="generated-section__description">
        {{ description }}
      </p>
    </header>

    <div class="generated-section__grid">
      <FeatureWrapper
        v-for="name in slice"
        :key="name"
        :title="name"
      >
        <component :is="generatedComponents[name]" />
      </FeatureWrapper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import generatedComponents, { componentNames } from '~/components/generated';
import FeatureWrapper from '~/components/app/FeatureWrapper.vue';

const props = defineProps<{
  title: string;
  description?: string;
  /** Inclusive start index into componentNames. */
  startIndex: number;
  /** Exclusive end index into componentNames. */
  endIndex: number;
}>();

const slice = computed(() => {
  const start = Math.max(0, props.startIndex);
  const end = Math.min(componentNames.length, props.endIndex);
  return componentNames.slice(start, end);
});
</script>

<style scoped>
.generated-section {
  padding: 1.5rem 1rem;
}

.generated-section__header {
  margin-bottom: 1rem;
}

.generated-section__title {
  margin: 0 0 0.25rem;
  font-size: 1.3rem;
}

.generated-section__description {
  margin: 0;
  color: #555;
  font-size: 0.9rem;
}

.generated-section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}
</style>

