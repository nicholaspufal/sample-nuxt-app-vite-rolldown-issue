<template>
  <article class="feature-wrapper">
    <header class="feature-wrapper__header">
      <h3 class="feature-wrapper__title">
        {{ title }}
      </h3>
    </header>
    <div class="feature-wrapper__body">
      <slot />
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped>
.feature-wrapper {
  border-radius: 4px;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.feature-wrapper__header {
  margin-bottom: 0.5rem;
}

.feature-wrapper__title {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}

.feature-wrapper__body {
  font-size: 0.8rem;
}
</style>

