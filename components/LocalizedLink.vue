<template>
  <a :href="getTo()" :key="$route.fullPath">
    <slot />
  </a>
</template>

<script>
export default {
  props: ["to"],

  methods: {
    getTo() {
      if (typeof this.to !== "string") {
        return this.to;
      }

      //const locale = this.$route.params.locale;

      let locale = this.$route?.name?.split("___")[1];

      if (locale === "en") locale = null;
      // we strip leading and trailing slashes and prefix

      // the current locale
      const path = !locale
        ? `/${this.to.replace(/^\/|\/$/g, "")}`
        : `/${locale}/${this.to.replace(/^\/|\/$/g, "")}`;

      return path;
    },
  },
};
</script>
