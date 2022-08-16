<script setup>
function throwErrorOnClick() {
  throw new Error("onClick error");
}
</script>

<template>
  <h1>Sentry Vue Demo</h1>
  <button @click="throwErrorOnClick">
    Click to throw an error in a click handler
  </button>
</template>
