<template>
  <div>
    <div class="tools">
      <!-- section 1 -->
      <h1>Edit and Sign PDFs with ease</h1>
      <h2>Add text, shapes, images, and signatures to your PDF documents.</h2>
      <div class="tools_container">
        <div
          v-for="(item, index) in features"
          :key="index"
          class="tools__item"
        >
          <feature-title :item="{ item }"> </feature-title>
        </div>
      </div>
      <!-- section 1 -->
    </div>

  </div>
</template>

<script>
import FeatureTitle from "@/components/FeatureTitle.vue";
import { feature_names } from "../services/feature_name";

export default {
  head() {
    return {
      title: "Edit and Sign PDF Online | Free PDF Editor – PDFden.com",
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
          content: "PDF Editor, PDF Signer, Edit PDF Online, Sign PDF Online",
        },
        {
          vmid: "all_description",
          name: "description",
          content:
            "Edit and sign your PDFs online with PDFden. Add text, shapes, images, and signatures to your PDF documents with ease. Free PDF editor and signing tool.",
        },
        {
          vmid: "all_facebook_description",
          property: "og:description",
          content:
            "Edit and sign your PDFs online with PDFden. Add text, shapes, images, and signatures to your PDF documents with ease. Free PDF editor and signing tool.",
        },
        {
          vmid: "all_title",
          property: "title",
          content: "Edit and Sign PDF Online | Free PDF Editor – PDFden.com",
        },
        {
          vmid: "all_facebook_title",
          property: "og:title",
          content: "Edit and Sign PDF Online | Free PDF Editor – PDFden.com",
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
  },
  data() {
    return {
      features: feature_names,
    };
  },
  mounted() {},
  methods: {
  },
};
</script>

<style scoped>


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
  padding: 60px 20px;
  background-color: #f8f9fa;
}

.tools_container {
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}

.tools__item {
  background: #fff;
  flex-basis: calc(50% - 30px);
  border: 1px solid #f5f5fa;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 30px;
  max-width: 350px;
}





@media (max-width: 1280px) {
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(50% - 30px);
    flex-basis: calc(50% - 30px);
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
    -ms-flex-preferred-size: calc(50% - 30px);
    flex-basis: calc(50% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 30px;
  }
}

@media (max-width: 640px) {
  .tools {
    padding: 40px 10px;
  }

  .tools__item {
    flex-basis: calc(100% - 20px);
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    max-width: none;
  }

  .tools h1 {
    font-size: 24px !important;
    font-weight: 600;
    padding: 10px 0;
  }

  .tools h2 {
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
