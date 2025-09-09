<template>
  <div class="main">
    <Processing :progress="'Signing'" v-if="page_load == 'processing'" />
    <Uploading
      :progress="progress"
      :number="1"
      :total="1"
      :size="size"
      :file_name="'pdfden_signed.pdf'"
      v-if="page_load == 'uploading'"
    />
    <div v-if="file && page_load == 'default'">
      <SignComponent
        :pdfUrl="getURL(file)"
        :get_pdf="get_result"
        :currentPage="currentPageNum"
        :totalPageNum="totalPageNum"
        @upload="upload_png"
        :sign_obj="sign_obj"
        @editSign="modalValidate = true"
      />
    </div>
    <input
      type="file"
      name="file"
      id="fileInput"
      class="hidden-input"
      @change="onChange"
      ref="file"
      accept=".pdf"
      style="display: none"
    />
    <SelectFileComponent
      v-if="!file && page_load == 'default'"
      @open_add_local="open_add_local"
      @onPickedDropbox="onPickedDropbox"
      @onPickedGoogleDriver="onPickedGoogleDriver"
      @handleFile="handleFiles"
      :title="'Sign PDF file'"
      :description="'Sign your PDF securely by creating your signature.'"
      :featureImgUrl="svgUrl"
    />

    <SignatureModal
      v-if="modalValidate"
      :nameProps="sign_name"
      @close="set_sign_items"
    />
  </div>
</template>

<script>
import generateURL from "@/services/generateURL";
import SignatureModal from "@/components/SignatureModal.vue";
import SignComponent from "@/components/SignComponent.vue";
import addImagesToPDF1 from "@/services/add_img_to_pdf1";
import Processing from "@/components/Processing.vue";
import Uploading from "@/components/Uploading.vue";
import { fileHandlingMixin } from "@/config/globalMixin.js";
import getPageNumber from "@/services/getPageNumber";
import SelectFileComponent from "@/components/SelectFileComponent.vue";
import SvgImage from "@/assets/feature_img/sign_pdf.svg";
export default {
  
  head() {
    return {
      title: "Sign PDF – Securely Sign PDF Files for Free",
      link: [{ rel: "canonical", href: "https://www.pdfden.com/sign-pdf" }],
      script: [
        {
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "PDFden",
                "item": "https://pdfden.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Sign PDF file",
                "item": "https://pdfden.com/sign-pdf"
              }
            ]
          }
        }
      ],
      meta: [
        {
          name: "Keywords",
          content:
            "Sign PDF, digital signature, sign PDF online, electronic signature, PDF signing tool, e-signature, online signature, sign PDF documents, secure PDF ",
        },
        {
          name: "description",
          content:
            "Sign your PDF documents quickly and securely with our Online PDF Signer tool. Add digital signatures to your files with ease for free and no software required.",
        },
        {
          property: "og:description",
          content:
            "Sign your PDF documents quickly and securely with our Online PDF Signer tool. Add digital signatures to your files with ease for free and no software required.",
        },
        {
          property: "og:title",
          content: "Sign PDF – Securely Sign PDF Files for Free",
        },
        {
          vmid: "sign_image",
          property: "image",
          content:
            "https://pdfden.com/signpdf.png",
        },
        {
          vmid: "sign_facebook_image",
          property: "og:image",
          content:
            "https://pdfden.com/signpdf.png",
        },
        {
          vmid: "sign_twitter_image",
          property: "twitter:image",
          content:
            "https://pdfden.com/signpdf.png",
        },
      ],
    };
  },
  mixins: [fileHandlingMixin],
  components: {
    SignComponent,
    SignatureModal,
    SelectFileComponent,
    Processing,
    Uploading,
  },
  data() {
    return {
      isDragging: false,
      file: null,
      second: false,
      modalValidate: false,
      currentPageImage: null,
      currentPageNum: 0,
      totalPageNum: 0,
      get_result: false,
      sign_obj: null,
      sign_name: null,
      page_load: "default",
      rendering_page: null,
      progress: 0,
      size: 0,
      intervalID: null,
      svgUrl: SvgImage,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      // Mobile responsive design - no redirect needed
      // The page will now work on all screen sizes
    },
    set_sign_items(data) {
      this.modalValidate = false;
      this.sign_obj = data;
      this.sign_name = data.name_text;
    },

    async handleFiles(files) {
      if (files.length > 1) {
        this.$swal(
          "Sorry!",
          "PDFden cannot process  more than one files in a task!",
          "warning"
        );
        return;
      } else {
        this.totalPageNum = await getPageNumber(files[0]);
        this.file = files[0];
      }
    },

    getURL(file) {
      const fileSrc = generateURL(file);
      return fileSrc;
    },

    async upload_png(data) {
      console.log(data);
      this.page_load = "processing";
      let added = data[0];
      let matched = data[1];
      const pdf = await addImagesToPDF1(this.getURL(this.file), added, matched);
      await this.upload_pdf(pdf);

      this.get_result = false;
    },
    upload_pdf(pdf) {
      const formData = new FormData();
      formData.append("pdf", pdf);
      this.page_load = "uploading";
      // formData.append("deletes", deletes);
      this.$axios
        .post("/pdf/pdf_upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            this.progress = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
            this.size = progressEvent.total;
          }.bind(this),
        })
        .then((response) => {
          const obj = {
            id: response.data,
            button_title: "Successfully Signed",
            dis_text: "PDF has been Signed!",
            down_name: `${this.file.name.split(".")[0]}_signed.pdf`,
            file_type: "application/pdf",
            before: "signpdf",
          };
          const encrypted = this.$crypto.AES.encrypt(
            JSON.stringify(obj),
            "mySecretKey123"
          ).toString();
          //const encrypted = this.$encrypt(obj);
          this.$router.push({
            path: "download",
            // this.$route.params.locale == undefined
            //   ? "download"
            //   : "en_download",
            query: {
              param: encrypted,
            },
          });
        })
        .catch((e) => {
          this.page_load = "default";
          this.$swal("Server Error!", "Please check your Network.", "Warning");
        });
    },
  },
};
</script>

<style scoped>
.main {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #eee !important;
}

.file__btn {
  padding: 3px;
  width: 24px;
  height: 24px;
  -ms-flex: 0 0 24px;
  flex: 0 0 24px;
  text-align: center;
  background: rgba(0, 0, 0, 0.1);
  background: #0000ff;
  margin-left: 4px;
  z-index: 1030;
  border-radius: 100%;
  cursor: pointer;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.sidebar-active .tool__sidebar {
  -ms-flex-preferred-size: 440px;
  flex-basis: 440px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 0 0 120px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}

.tool__sidebar {
  height: 89vh;
  background-color: #fff;
  min-width: 300px;
}

.draggable-item {
  margin: 5px;
  padding: 10px;
  background-color: lightblue;
  cursor: move;
}

.add-more {
  width: fit-content;
}

.option__panel__content {
  margin: 10px;
  background: #def2ff;
  padding: 10px;
  border-radius: 5px;
  font-size: 13px;
}

.option__panel__title {
  font-size: 22px;
  line-height: 26px;
  min-height: 48px;
  padding: 8px 12px;
  color: #fff;
  background-color: #0000ff;
  padding: 15px 40px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.option__panel__title:hover {
  background-color: #0000ff;
}

#pickfiles {
  display: block;
  background-color: #0000ff;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

h3 {
  font-weight: 500;
}

.tool__sidebar__inactive {
  min-width: 400px;
  padding: 10px;
}

.split_option {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: left;
}

.md-radio-label {
  font-weight: 500 !important;
}
/* Responsive Design for Mobile */
@media (max-width: 1024px) {
  .main {
    padding: 10px;
  }
  
  .option__panel__title {
    font-size: 20px;
    padding: 12px 30px;
  }
  
  .option__panel__content {
    margin: 8px;
    padding: 8px;
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .main {
    padding: 5px;
  }
  
  .option__panel__title {
    font-size: 18px;
    padding: 10px 25px;
    width: 100%;
    margin: 10px 0;
  }
  
  .option__panel__content {
    margin: 5px;
    padding: 6px;
    font-size: 11px;
  }
  
  .tool__sidebar {
    min-width: 250px;
  }
}

@media (max-width: 640px) {
  .main {
    padding: 5px;
    width: 100%;
  }
  
  .option__panel__title {
    font-size: 16px;
    padding: 8px 20px;
    width: 100%;
    margin: 5px 0;
  }
  
  .option__panel__content {
    margin: 3px;
    padding: 5px;
    font-size: 10px;
  }
  
  .tool__sidebar {
    min-width: 200px;
    height: auto;
  }
  
  .tool__sidebar__inactive {
    min-width: 200px;
    padding: 5px;
  }
}

@media (max-width: 480px) {
  .main {
    padding: 2px;
  }
  
  .option__panel__title {
    font-size: 14px;
    padding: 6px 15px;
  }
  
  .option__panel__content {
    margin: 2px;
    padding: 4px;
    font-size: 9px;
  }
  
  .tool__sidebar {
    min-width: 150px;
  }
  
  .tool__sidebar__inactive {
    min-width: 150px;
    padding: 3px;
  }
}
</style>
