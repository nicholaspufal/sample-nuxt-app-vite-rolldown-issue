<template>
  <main>
    <h1>Nuxt + Vite Rolldown CSS volume repro</h1>
    <p>
      This sample app is a minimal, focused reproduction for a bug where the Nuxt server
      build can hang indefinitely when Vite Rolldown processes a large amount of CSS
      spread across many Vue SFCs.
    </p>

    <p>
      The goal is to help you observe that behavior with Rolldown; the same app built
      with standard Vite/Rollup completes successfully.
    </p>

    <p>Browse the sections below to see different parts of the component tree:</p>

    <ul>
      <li v-for="section in sections" :key="section.path">
        <NuxtLink :to="section.path">
          {{ section.label }}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
const sections = Array.from({ length: 10 }, (_, index) => ({
  path: `/section-${index + 1}`,
  label: `Section ${index + 1}`,
}));
</script>

