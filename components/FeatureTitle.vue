<template>
  <LocalizedLink :to="item.item.name">
    <md-content class="feature_item">
      <div class="item-header">
        <img
          :src="require(`@/assets/feature_img/${item.item.file}`)"
          alt="Title"
        />
        <h2 class="item-title">
          {{ item.item.title }}
        </h2>
      </div>
      <p>
        {{ item.item.description }}
      </p>
    </md-content>
  </LocalizedLink>
</template>

<script>
import LocalizedLink from "./LocalizedLink.vue";
export default {
  components: {
    LocalizedLink,
  },
  name: "feature-title",
  props: {
    item: Object,
  },
  data() {
    return {};
  },
  methods: {
    redirect(link) {
      this.$router.push({
        pather: link,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.feature_item {
  height: 100% !important;
}
.feature_item:hover {
  background-color: #f5f5fa !important;
}
.feature_item img {
  transition: transform 0.3s ease;
}

.feature_item:hover img {
  transform: scale(1.3); /* Increase size on hover */
}
.md-content {
  padding: 24px;
  text-align: center;
}
a {
  .item-title {
    color: #000000;
    margin: 20px;
    font-size: 30px;
    font-weight: bold !important;
    font-family: "Montserrat", sans-serif !important;
  }

  p {
    font-size: 14px;
    margin: 20px 0;
    color: #33333b;
  }
}

img {
  width: 42px;
  height: 42px;
  margin: auto;
}
@media (max-width: 640px) {
  .md-content {
    padding: 9px;
    text-align: left;
  }
  .item-header {
    display: flex;
    img {
      margin: 0px;
      width: 34px;
    }
    .item-title {
      font-size: 15px;
    }
  }
  a p {
    margin: 0px;
    width: 34px;
    width: 100%;
  }
}
</style>
