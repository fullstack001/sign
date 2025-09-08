<template>
  <div class="sign-container">
    <div class="sign-edit" :style="rendering ? 'background-color:#fefefe' : ''">
      <RendingProgressVue
        :page="totalPageNum"
        :loadingPage="loadingPage"
        v-show="rendering"
      />
      <SignToolbar
        :pages="pages"
        :currentPageProps="currentPage"
        @set_page="set_page"
        v-if="!rendering"
      />
      <div class="sign-content" v-if="imageItems" v-show="!rendering">
        <div id="pdf-preview-list" ref="list_scrollContainer">
          <div
            v-for="(imageItem, index) in imageItems"
            :key="index"
            :id="'list' + index"
            class="pdf-preview-item"
          >
            <img
              class="thumbnail-img"
              :src="imageItem.img"
              alt="Image"
              @click="set_page(index + 1)"
            />
            <span>{{ index + 1 }}</span>
          </div>
        </div>
        <div
          id="pdf-edit-list"
          ref="scrollContainer"
          @mouseover="get_objects"
          v-show="!rendering"
        >
          <div
            v-for="(imageItem, index) in imageItems"
            :key="index"
            :id="index"
            class="pdf-edit-item-container"
            :style="{
              width: `${imageItem.width}px`,
              height: `${imageItem.height}px`,
            }"
            ref="imageElement"
          >
            <img :src="imageItem.img" alt="Image" />
          </div>
        </div>
      </div>
    </div>
    <div class="sign_sidebar">
      <div class="sidebar_title" style="padding-bottom: 15px">
        {{ $t("page_titles.sign_page.sign_options") }}
      </div>
      <div class="furniture">
        <div class="sign-label mt-4 mb-3">Required fields</div>
        <div class="sign_item p-1" draggable="true">
          <Drag />
          <SignIcon />
          <div class="sign_draggable_text">Signautres</div>
          <div class="sign_draggable_prev">
            <img
              :src="sign_obj && sign_obj.sign"
              class="my-2 add_item"
              v-bind:style="
                sign_obj && sign_obj.sign ? 'display: block;' : 'display: none;'
              "
              alt="Sign"
            />
            <span
              class="mt-3 mb-3 fs-4 add_item"
              v-bind:style="
                sign_obj && sign_obj.sign ? 'display: none;' : 'display: block; '
              "
              >Signature</span
            >
          </div>

          <div class="sign_draggable_actions">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="$emit('editSign')"></i>
              <div class="sign_counters" v-if="sign_num > 0">
                {{ sign_num }}
              </div>
            </div>
          </div>
        </div>
        <div class="sign-label mt-4 mb-3">Optional fields</div>
        <div class="sign_item p-1" draggable="true">
          <Drag />
          <SignNormalIcon />
          <div class="sign_draggable_text">Initials</div>
          <div class="sign_draggable_prev">
            <img
              class="my-2 add_item"
              :src="sign_obj && sign_obj.init"
              v-bind:style="
                sign_obj && sign_obj.init ? 'display: block;' : 'display: none;'
              "
              alt="Sign Init"
            />
            <span
              class="mt-3 mb-3 fs-4 add_item"
              v-bind:style="
                sign_obj && sign_obj.init ? 'display: none;' : 'display: block; '
              "
              >Init</span
            >
          </div>
          <div class="sign_draggable_actions">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="$emit('editSign')"></i>
              <div class="sign_counters" v-if="init_num > 0">
                {{ init_num }}
              </div>
            </div>
          </div>
        </div>
        <div class="sign_item p-1" draggable="true">
          <Drag />
          <SignNormalIcon />
          <div
            class="sign_draggable_prev"
            @mouseover="show_img = 'name'"
            @mouseleave="show_img = null"
          >
            <img
              class="my-2 add_item"
              :src="sign_obj && sign_obj.name"
              v-bind:style="
                show_img == 'name' ? 'display: block;' : 'display: none;'
              "
              atl="img"
            />
            <span
              class="mt-3 mb-3 fs-4 add_item"
              v-bind:style="
                show_img == 'name' ? 'display: none;' : 'display: block; '
              "
              >{{ $t("page_titles.sign_page.name") }}</span
            >
          </div>
          <div class="sign_draggable_actions">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="$emit('editSign')"></i>
              <div class="sign_counters" v-if="name_num > 0">
                {{ name_num }}
              </div>
            </div>
          </div>
        </div>
        <div class="sign_item p-1" draggable="true">
          <Drag />
          <SignNormalIcon />
          <div
            class="sign_draggable_prev"
            @mouseover="show_img = 'date'"
            @mouseleave="show_img = null"
          >
            <img
              class="my-2 add_item"
              :src="date_img"
              v-bind:style="
                show_img == 'date' ? 'display: block;' : 'display: none;'
              "
              alt="Sign PDF"
            />
            <span
              class="mt-3 mb-3 fs-4 add_item"
              v-bind:style="
                show_img == 'date' ? 'display: none;' : 'display: block; '
              "
              >{{ $t("page_titles.sign_page.date") }}</span
            >
          </div>
          <div class="sign_draggable_actions">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="dateModalValidate = true"></i>
              <div class="sign_counters" v-if="date_num > 0">
                {{ date_num }}
              </div>
            </div>
          </div>
        </div>
        <div class="sign_item p-1" draggable="true">
          <Drag />
          <SignNormalIcon />
          <div class="sign_draggable_prev"
            @mouseover="show_img = 'text'"
            @mouseleave="show_img = null"
          >
            <img
              class="my-2 add_item"
              :src="text_img"
              v-bind:style="
                show_img == 'text' ? 'display: block;' : 'display: none;'
              "
              alt="Sign PDF"
            />
            <span
              class="mt-3 mb-3 fs-4 add_item"
              v-bind:style="
                show_img == 'text' ? 'display: none;' : 'display: block; '
              "
              >{{ $t("page_titles.sign_page.text") }}</span
            >
          </div>
          <div class="sign_draggable_actions">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="textModalValidate = true"></i>
              <div class="sign_counters" v-if="text_num > 0">
                {{ text_num }}
              </div>
            </div>
          </div>
        </div>
        <div class="sign_item p-1" draggable="true">
          <Drag />
          <div class="sign_draggable_icon">
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.622 10.343h-2.31v-.468c0-.586-.356-1.09-.86-1.3.176-1.065.456-2.063 1.36-3.671a3.319 3.319 0 0 0 .424-1.623c0-1.815-1.453-3.295-3.267-3.28-1.61.011-2.874 1.203-3.144 2.638-.167.888.015 1.779.514 2.509.684 1 1.013 2.238 1.208 3.427a1.409 1.409 0 0 0-.858 1.3v.468H2.378c-1.275 0-2.311 1.052-2.311 2.344v.97c0 .258.207.468.462.468H.99v.469c0 .775.622 1.406 1.387 1.406h9.244c.765 0 1.387-.63 1.387-1.406v-.47h.462c.255 0 .462-.209.462-.468v-.969c0-1.292-1.036-2.344-2.31-2.344ZM5.1 4.613a2.384 2.384 0 0 1-.366-1.798C4.92 1.813 5.827.923 7.03.936c1.267.015 2.28 1.067 2.28 2.345 0 .407-.104.807-.302 1.159-.965 1.717-1.275 2.804-1.476 4.028H6.467C6.244 7.113 5.88 5.755 5.1 4.614Zm3.288 5.262v.468H5.613v-.468c0-.259.208-.47.463-.47h1.848c.255 0 .463.211.463.47Zm3.697 4.719a.466.466 0 0 1-.462.468H2.378a.466.466 0 0 1-.462-.468v-.47h10.168v.47Zm.925-1.407H.99v-.5c0-.775.622-1.406 1.387-1.406h9.244c.765 0 1.387.63 1.387 1.406v.5Z"
                fill="#FFF"
                fill-rule="nonzero"
              ></path>
            </svg>
          </div>
          <div class="sign_draggable_text">Stamp</div>
          <div class="sign_draggable_prev">
            <img
              class="my-2 add_item"
              :src="sign_obj && sign_obj.stamp"
              v-bind:style="
                sign_obj && sign_obj.stamp ? 'display: block;' : 'display: none;'
              "
              alt="Stamp"
            />
            <span
              class="mt-3 mb-3 fs-4 add_item"
              v-bind:style="
                sign_obj && sign_obj.stamp ? 'display: none;' : 'display: block; '
              "
              >Stamp</span
            >
          </div>
          <div class="sign_draggable_actions" @click="$emit('editSign')">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="$emit('editSign')"></i>
              <div class="sign_counters" v-if="stamp_num > 0">
                {{ stamp_num }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="sign_btn" @click="sign_pdf" :disabled="rendering">
        {{ $t("page_titles.sign_page.actionBtn") }}
      </button>
    </div>
    <DateFormatModal v-if="dateModalValidate" @close="set_date_format" />
    <TextModal v-if="textModalValidate" @close="set_text" :textProps="text" />
    <div id="temp_canvas" style="display: none"></div>
  </div>
</template>

<script>
import { PDFAnnotate } from "@/assets/js/pdfsign.js";
import convert from "@/services/convertTextToImg.js";
import DateFormatModal from "./DateFormatModal.vue";
import RendingProgressVue from "./RendingProgress.vue";
import convertPDFImg from "@/services/convertPDFImg.js";
import SignToolbar from "./SignToolbar.vue";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
GlobalWorkerOptions.workerSrc = PDFJSWorker;
import TextModal from "./TextModal.vue";
import Drag from "./signDragIcons/Drag.vue";
import SignIcon from "./signDragIcons/SignIcon.vue";
import SignNormalIcon from "./signDragIcons/SignNormalIcon.vue";

const today = new Date();
// Get the components of the date (year, month, day)
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
const day = today.getDate().toString().padStart(2, "0");

// Format the date as "YYYY-MM-DD"
const formattedDate = `${year}-${month}-${day}`;

export default {
  components: {
    DateFormatModal,
    TextModal,
    SignToolbar,
    RendingProgressVue,
    Drag,
    SignIcon,
    SignNormalIcon,
  },
  created() {
    window.addEventListener("keydown", this.keyDownHandler);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDownHandler);
  },
  props: {
    pdfUrl: {
      require: true,
      type: String,
    },
    get_pdf: {
      default: false,
    },
    totalPageNum: {
      require: true,
    },
    sign_obj: {
      type: Object,
    },
  },
  async mounted() {
    this.loadPdf();
    this.date_img = await convert(this.date);
    this.text_img = await convert(this.text);
  },
  computed: {
    imageElements() {
      return this.$refs.imageElement || [];
    },
  },
  watch: {
    currentPage(newValue, oldValue) {
      const index = newValue - 1;
      const targetElement = document.getElementById(index);
      const listTargetElement = document.getElementById(`list${index}`);
      this.$refs.list_scrollContainer.scrollTop =
        (listTargetElement.offsetHeight + 20) * (newValue - 1);

      const targetPosition = (targetElement.offsetHeight + 20) * (newValue - 1);
      const container = this.$refs.scrollContainer;
      const duration = Math.abs(newValue - oldValue) * 100;
      this.scrollToTarget(container, targetPosition, duration);
      // this.$refs.scrollContainer.scrollTop =
      //   (targetElement.offsetHeight + 20) * (newValue - 1);
    },
  },
  data() {
    return {
      pages: 1,
      imageItems: [],
      currentPage: 1,
      pdf: null,
      observer: null,
      show_img: null,
      date_img: null,
      text_img: null,
      canvases: [],
      rendering: true,
      loadingPage: 0,
      date: formattedDate,
      text: "Text",
      dateModalValidate: false,
      textModalValidate: false,
      sign_num: 0,
      init_num: 0,
      name_num: 0,
      date_num: 0,
      text_num: 0,
      stamp_num: 0,
    };
  },
  methods: {
    async loadPdf() {
      this.pages = this.totalPageNum;
      const pdf = await getDocument(this.pdfUrl).promise.then((pdf) => {
        return pdf;
      });
      for (let i = 1; i <= this.pages; i++) {
        const imageItem = await convertPDFImg(pdf, i);
        await this.imageItems.push(imageItem);
        this.loadingPage = i;
      }
      this.$emit("editSign");
      this.$nextTick().then(() => {
        // Now, the DOM has been updated, and you can safely execute the next statement
        this.observer = new IntersectionObserver(this.handleIntersection, {
          threshold: 0.5,
        });
        this.imageElements.forEach((element) => {
          this.observer.observe(element);
        });
        // this.rendering = false;
        this.loadScripts();
      });
    },
    async loadScripts() {
      this.canvases.push(0);
      var pdf = await new PDFAnnotate("pdf-edit-list", this.pdfUrl, 0, {
        scale: 1.5,
        pageImageCompression: "FAST", // FAST, MEDIUM, SLOW(Helps to control the new PDF file size)
      });
      this.pdf = pdf;
    },
    async set_text(data) {
      this.text = data;
      this.textModalValidate = false;
      this.text_img = await convert(this.text);
    },
    async set_date_format(data) {
      this.date = data;
      this.dateModalValidate = false;
      this.date_img = await convert(this.date);
    },
    keyDownHandler(e) {
      var activeObject =
        this.pdf.fabricObjects[this.pdf.active_canvas].getActiveObject();
      if (e.key == "Delete" && activeObject) {
        this.pdf.fabricObjects[this.pdf.active_canvas].remove(activeObject);
        // this.pdf.fabricObjects[this.pdf.active_canvas].renderAll();
        this.get_objects();
      }
      // Your handler code here
    },
    set_page(data) {
      this.currentPage = data;
    },
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.pdf) {
            const pageNum = entry.target.id * 1;

            let toPage = pageNum + 30 > this.pages ? this.pages : pageNum + 29;
            for (let i = pageNum; i < toPage; i++) {
              if (this.canvases.indexOf(i) < 0) {
                this.canvases.push(i);
                this.pdf.addCanvas(i);
              }
            }
          }
        }
        this.$nextTick().then(() => {
          this.rendering = false;
        });
      });
    },
    scrollToTarget(scrollContainer, targetPosition, duration) {
      const start = scrollContainer.scrollTop;
      const distance = targetPosition - start;
      const startTime = performance.now();

      function scrollAnimation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const scrollProgress = Math.min(1, elapsedTime / duration);
        const newPosition = start + distance * scrollProgress;

        scrollContainer.scrollTop = newPosition;

        if (scrollProgress < 1) {
          requestAnimationFrame(scrollAnimation);
        }
      }

      requestAnimationFrame(scrollAnimation);
    },
    async get_objects() {
      const images = await this.pdf.getObjectCounter(
        this.canvases,
        this.imageItems
      );
      this.set_counts(images);
    },
    setScrollbarPosition(position) {
      // Set the scrollbar's location programmatically
      this.$refs.scrollableDiv.scrollTop = position;
    },
    set_counts(data) {
      var sign_num = 0;
      var init_num = 0;
      var name_num = 0;
      var date_num = 0;
      var text_num = 0;
      var stamp_num = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].length == 0) continue;
        const item = data[i];
        for (let j = 0; j < item.length; j++) {
          switch (item[j].url) {
            case this.sign_obj.sign:
              sign_num++;
              break;
            case this.sign_obj.init:
              init_num++;
              break;
            case this.sign_obj.name:
              name_num++;
              break;
            case this.date_img:
              date_num++;
              break;
            case this.text_img:
              text_num++;
              break;
            case this.stamp_img:
              stamp_num++;
              break;
            default:
              break;
          }
        }
      }
      this.sign_num = sign_num;
      this.init_num = init_num;
      this.name_num = name_num;
      this.date_num = date_num;
      this.text_num = text_num;
      this.stamp_num = stamp_num;
    },
    async sign_pdf() {
      const images = await this.pdf.savePdf(this.canvases, this.imageItems);
      const matched = {
        text: [this.sign_obj.name_text, this.date, this.text],
        img: [this.sign_obj.name, this.date_img, this.text_img],
      };
      this.$emit("upload", [images, matched]);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
/* @import "~bootstrap/dist/css/bootstrap.min.css"; */
</style>

<style scoped>
.sign-label {
  text-align: left;
  font-size: 20px;
  font-weight: 600;
}
img {
  cursor: move;
}
.thumbnail-img {
  height: 100%;
}

.pdf-preview-item {
  position: relative;
  text-align: center;
  width: 95px;
  border: dotted 0.5px #0000ff;
  height: 135px;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 20px;
  box-shadow: 0px 3px 3px 0px rgb(110, 110, 54);
}
.pdf-preview-item span {
  position: absolute;
  bottom: -21px;
  right: 44px;
  font-weight: 500;
}
.pdf-edit-item-container {
  border: dotted 0.5px #0000ff;
  margin: auto;
  margin-bottom: 20px;
  box-shadow: 0px 3px 3px 0px rgb(110, 110, 54);
}
.sign-container {
  display: flex;
}
.sign-edit {
  width: 79%;
}
.sign-content {
  display: flex;
}
#pdf-preview-list {
  min-width: 160px;
  max-width: 200px;
  background-color: #fff;
  display: grid;
  height: min-content;
  overflow-y: auto;
  padding-top: 50px;
  height: 84vh;
}
#pdf-edit-list {
  min-height: 84vh;
  max-height: 84vh;
  width: 100%;
  overflow-y: auto;
  padding-top: 50px;
}
.sign_sidebar {
  min-width: 400px;
  max-width: 21%;
  height: 89vh;
  overflow-y: auto;
  background-color: #fff;
  padding-top: 30px;
  border-left: solid 1px rgba(0, 0, 0, 0.4);
}
.sign_btn {
  font-size: 24px;
  line-height: 26px;
  min-height: 48px;
  padding: 8px 12px;
  color: #fff;
  border-radius: 8px;
  border: 2px solid #0000ff;
  background: linear-gradient(180deg, #0000ff 0%, #0000ff 100%);
  padding: 15px 40px;
  font-weight: 600;
  cursor: pointer;
}
.sign_counters {
  background-color: #0000ff;
  border-radius: 50%;
  padding-left: 9px;
  padding-right: 9px;
  color: white;
}
.sign_item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  border-radius: 4px;
  border: 1px solid #0000ff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.14);
  background-color: #f4f5f9;
  margin-bottom: 10px;
  min-height: 70px;
}

.sign_draggable_icon {
  background-color: #0000ff;
  box-shadow: none;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
.sign__draggable_actions_edit {
  color: #0000ff;
}
.sign_draggable_text {
  font-size: 8px;
  color: #0000ff;
  letter-spacing: 0.16px;
  line-height: 24px;
  position: absolute;
  left: 55px;
  top: -12px;
  font-weight: 600;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-right: auto;
  padding: 12px;
}

.sign_draggable_prev {
  order: 1px dashed #adadb6;
  height: calc(100% - 8px);
  -ms-flex: auto;
  flex: auto;
  margin-left: auto;
  margin-right: auto;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}

.sign_draggable_actions :hover {
  color: red;
  cursor: pointer;
}
.sign_right {
  padding: 0;
}
.tool__sidebar {
  padding: 0;
}
.sign_tool {
  background: #fefefe;
  padding: 0;
}
.furniture {
  margin: 20px 14px;
  min-height: 200px;
}
.sidebar_title {
  font-weight: 600;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding: 20px 0 10px 0;
  font-size: 26px;
}
@media (max-width: 1492px) {
  #pdf-preview-list {
    display: none;
  }
}
</style>
