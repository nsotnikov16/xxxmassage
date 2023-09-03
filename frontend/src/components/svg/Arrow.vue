<template>
  <svg
    :class="className"
    viewBox="0 0 18 10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.44231 9.1928C9.19823 9.43687 8.8025 9.43687 8.55842 9.1928L1.05842 1.6928C0.814346 1.44872 0.814346 1.05299 1.05842 0.808913C1.3025 0.564835 1.69823 0.564835 1.94231 0.808913L9.00037 7.86697L16.0584 0.808913C16.3025 0.564835 16.6982 0.564835 16.9423 0.808913C17.1864 1.05299 17.1864 1.44872 16.9423 1.6928L9.44231 9.1928Z"
    />
  </svg>
</template>

<script>
export default {
  props: ["className"],
};
</script>

<style></style>
