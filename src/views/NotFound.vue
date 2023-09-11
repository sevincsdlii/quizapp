<template>
  <section
    class="flex flex-col justify-center items-center w-screen h-screen leading-10"
  >
    <h1 class="xs:text-xl text-4xl font-semibold">404 - Page Not Found</h1>
    <p class="xs:text-[1rem] text-xl mt-2">
      The page you are looking for does not exist.
    </p>
    <router-link to="/" class="mt-4">
      <button
        class="xs:text-[1rem] items-center cursor-pointer bg-lime-600 text-lg hover:bg-lime-700 text-white rounded-md px-8 py-[0.5rem]"
      >
        Go Home Page
      </button>
    </router-link>
  </section>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped></style>
