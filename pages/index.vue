<template>
  <div>
    <div class="tools">
      <!-- section 1 -->
      <h1>{{ $t("page_titles.landing.title1") }}</h1>
      <h2>{{ $t("page_titles.landing.text1") }}</h2>
      <div class="tools_container">
        <div
          v-for="(item, index) in $t('features')"
          :key="index"
          class="tools__item"
        >
          <feature-title :item="{ item }"> </feature-title>
        </div>
      </div>
      <!-- section 1 -->
    </div>
    <BlogThumbnail :routing="true" />

    <div class="premium">
      <div class="block__container">
        <div class="md-layout">
          <div class="md-layout-item">
            <div class="premium_title">
              {{ $t("page_titles.landing.section2.title") }}
            </div>
            <div class="premium_text">
              <div>
                <span>
                  <img src="@/assets/img/right-arrow.png" alt="Right" />
                </span>
                <span>{{ $t("page_titles.landing.section2.item1") }} </span>
              </div>
              <div>
                <span>
                  <img src="@/assets/img/right-arrow.png" alt="Left" />
                </span>
                <span>{{ $t("page_titles.landing.section2.item2") }}</span>
              </div>
              <div>
                <span>
                  <img src="@/assets/img/right-arrow.png" alt="Right" />
                </span>
                <span> {{ $t("page_titles.landing.section2.item3") }}</span>
              </div>
            </div>
            <div>
              <!-- <nuxt-link class="btn premium_btn" to="/ComingSoon"> -->
              <nuxt-link class="btn premium_btn" to="/">
                <!-- {{ $t("page_titles.landing.section2.button") }} -->
                Coming Soon
              </nuxt-link>
            </div>
          </div>
          <div class="md-layout-item">
            <div class="free-img">
              <img src="@/assets/img/free.png" alt="Free" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeatureTitle from "@/components/FeatureTitle.vue";
import { feature_names } from "../services/feature_name";
import { getDate, getMonth } from "../services/getDateMonth";
import BlogThumbnail from "@/components/BlogThumbnail.vue";

export default {
  head() {
    return {
      title: "Free Online PDF Tools | Simple PDF Converter – PDFden.com",
      link: [{ rel: "canonical", href: "https://www.pdfden.com/" }],
      script: [
        {
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PDFden",
            "alternateName": "pdfden.com",
            "url": "https://pdfden.com/",
            "logo": "https://pdfden.com/_nuxt/img/vue-logo.fd7474e.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "areaServed": "Global",
              "availableLanguage": "Global"
            }
          }
        }
      ],

      meta: [
        {
          vmid: "all_keys",
          name: "Keywords",
          content: "Simple PDF Converter",
        },
        {
          vmid: "all_description",
          name: "description",
          content:
            "Unlock the full potential of your PDFs with PDFden. Merge, split, convert, and edit your PDF files online with ease. Your go-to solution for all PDF-related tasks",
        },
        {
          vmid: "all_facebook_description",
          property: "og:description",
          content:
            "Unlock the full potential of your PDFs with PDFden. Merge, split, convert, and edit your PDF files online with ease. Your go-to solution for all PDF-related tasks",
        },
        {
          vmid: "all_title",
          property: "title",
          content: "Free Online PDF Tools | Simple PDF Converter – PDFden.comm",
        },
        {
          vmid: "all_facebook_title",
          property: "og:title",
          content: "Free Online PDF Tools | Simple PDF Converter – PDFden.com",
        },
        {
          vmid: "all_image",
          property: "image",
          content: "https://pdfden.com/main.png",
        },
        {
          vmid: "all_facebook_image",
          property: "og:image",
          content: "https://pdfden.com/main.png",
        },
        {
          vmid: "all_twitter_image",
          property: "twitter:image",
          content: "https://pdfden.com/main.png",
        },
      ],
    };
  },
  components: {
    FeatureTitle,
    BlogThumbnail,
  },
  data() {
    return {
      features: feature_names,
      blogs: null,
    };
  },
  created() {
    this.fetchBlog();
  },
  mounted() {},
  methods: {
    setMonth(data) {
      return getMonth(data);
    },
    setDate(data) {
      return getDate(data);
    },
    fetchBlog() {
      this.$axios
        .get("/pdf/latestBlogs")
        .then((res) => {
          this.blogs = res.data;
          console.log(this.blogs);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.pattern-bg {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  position: fixed;
  top: 0;
  background-position: center center;
  background-size: cover;
  background-color: #0000ff;
  /* background-image: url("../../assets/img/background.svg"); */
}

.block__container {
  max-width: 84%;
  margin: auto;
}

.tools h1,
.tools h2 {
  text-align: center;
  color: #000000;
  font-weight: bold !important;
  font-family: "Montserrat", sans-serif !important;
}
.tools h2 {
  margin-top: 0 !important;
  font-size: 30px;
}

h1 {
  padding-top: 30px;
  font-size: 42px;
  line-height: 52px;
  color: #000000;
  text-align: center;
}

h2 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.elevation-demo {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  align-items: center;
  justify-content: center;
}

.tools {
  display: -ms-flexbox;
  display: block;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  margin: auto;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0 68px 42px;
  background-position: center center;
  background-color: #eeeeee;
  background-size: cover;
  /* background-image: url("~/assets/img/background.svg"); */
}

.tools_container {
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  position: relative;
}

.tools__item {
  background: #fff;
  flex-basis: calc(25% - 30px);
  border: 1px solid #f5f5fa;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 30px;
}

.free-img {
  margin-left: 50%;
}

.trusted {
  padding: 96px 0 124px;
}

.trusted-header {
  font-weight: 600;
  font-size: 42px;
  line-height: 52px;
  color: #33333b;
  text-align: center;
  margin-bottom: 30px;
}

.trusted_text {
  margin-top: 16px;
  text-align: center;
  font-weight: 400;
  color: #47474f;
  font-size: 20px;
}

.trusted .md-layout {
  margin-top: 70px;
}

.trusted .md-layout .md-layout-item {
  text-align: center;
}

.trusted .md-layout .md-layout-item img {
  width: 120px;
}

.premium {
  position: relative;
  background: #47474f;
  color: #f5f5fa;
  padding: 64px 100px 30px;
  z-index: 1;
  background-position: center center;
  background-size: cover;
  background-color: #0000ff;
  /* background-image: url("~/assets/img/bottom.png"); */
}

.premium .premium_title {
  font-weight: 600;
  font-size: 42px;
  line-height: 52px;
  padding-bottom: 20px;
}

.premium_text {
  line-height: 32px;
  font-size: 22px;
  font-weight: 400;
  padding-bottom: 15px;
}

.premium_text div {
  padding: 5px 0;
}

.premium_btn {
  margin-top: 20px;
  color: #fff !important;
  background-color: #263238;
}

.free-img img {
  max-width: 300px;
}

.btn {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 8px 20px;
  text-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0);
  text-decoration: none;
  border-radius: 8px;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  -webkit-transition: all 0.1s linear;
  -o-transition: all 0.1s linear;
  transition: all 0.1s linear;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: 0;
  min-height: 42px;
  color: #fff;
}

.md-layout-item-title {
  font-weight: 500;
  font-size: 28px;
  line-height: 30px;
  color: #33333b;
  margin-bottom: 12px;
}

.md-layout-item-content {
  color: #707078;
  line-height: 28px;
  font-size: 16px;
  font-weight: 400;
}

.md-card-media {
  padding: 15px !important;
}

.md-card-header {
  background-color: #fff !important;
  margin-bottom: 15px !important;
}

.md-card-header {
  box-shadow: none !important;
}

.md-card-header .md-title {
  font-weight: 600;
  color: #575757;
  font-size: 20px;
}

@media (min-width: 992px) {
  .block__container {
    max-width: 84%;
  }
}

@media (min-width: 1366px) {
  .block__container {
    max-width: 84%;
  }
}

@media (max-width: 1280px) {
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(25% - 30px);
    flex-basis: calc(25% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 30px;
  }
}

@media (max-width: 960px) {
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(33.333% - 30px);
    flex-basis: calc(33.333% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 30px;
  }
}

@media (max-width: 640px) {
  .tools {
    padding: 0 10px 10px;
  }

  .tools__item {
    flex-basis: calc(104% - 30px);
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 20px;
  }

  .premium {
    padding: 0 0 10px;
  }

  .free-img {
    margin-left: 10% !important;
  }

  .md-layout-item {
    margin-top: 30px !important;
  }

  .free-img img {
    max-width: 260px;
  }

  .tools h1,
  .premium_title {
    font-size: 20px !important;
    font-weight: 600;
    padding: 10px 0;
  }

  .tools h2 {
    font-size: 15px;
    font-weight: 400;
  }

  .premium_text {
    font-size: 20px !important;
    line-height: 1.1;
  }
}
</style>
