<template>
  <div>
    <div v-if="scriptLoaded && dropboxChooserIsSupported" @click="clickButton">
      <div
        class="dropbox-icon"
        :style="
          position != 'addMore'
            ? 'padding: 7px 10px 5px 9px;'
            : 'padding: 9px 10px 9px;'
        "
      >
        <i class="fa-brands fa-dropbox" style="font-size: 16px !important"></i>
      </div>
      <md-tooltip md-direction="right" v-show="buttonType == 'chooser'">
        Select PDF from Dropbox
      </md-tooltip>
      <md-tooltip md-direction="bottom" v-show="buttonType == 'saver'">
        Save to Dropbox
      </md-tooltip>
    </div>
  </div>
</template>

<script>
import { dropBox_apiKey } from "@/config/key_env";
export default {
  props: {
    linkType: {
      type: String,
      default: "preview",
    },
    multiselect: {
      type: Boolean,
      default: false,
    },
    extensions: {
      type: Array,
      default: function () {
        return [];
      },
    },
    folderselect: {
      type: Boolean,
      default: false,
    },
    sizeLimit: {
      type: Number,
      default: 0,
    },
    buttonType: {
      type: String,
      default: "chooser",
    },
    uploadFiles: {
      type: Array,
      default: function () {
        return [];
      },
    },
    position: {
      type: String,
      require: false,
    },
  },
  data: () => ({
    apiKey: dropBox_apiKey,
    scriptLoaded: true,
    dropboxChooserIsSupported: true,
  }),
  mounted() {
    if (window.Dropbox) {
      this.scriptLoaded = true;
    } else {
      const dropBoxScript = document.createElement("script");
      dropBoxScript.onload = () => {
        this.scriptLoaded = true;
        this.dropboxChooserIsSupported = window.Dropbox.isBrowserSupported();

        if (!this.dropboxChooserIsSupported) {
          // console.warn("VueDropboxPicker: This browser is not supported");
        }
      };
      dropBoxScript.setAttribute(
        "src",
        "https://www.dropbox.com/static/api/2/dropins.js"
      );
      dropBoxScript.setAttribute("id", "dropboxjs");
      dropBoxScript.setAttribute("data-app-key", this.apiKey);
      document.head.appendChild(dropBoxScript);
    }
  },
  methods: {
    clickButton() {
      // console.log(342342);
      this.buttonType == "chooser"
        ? this.dropboxIconClicked()
        : this.dropboxSaverIconClicked();
    },
    dropboxIconClicked() {
      let options = {
        success: async (files) => {
          let attachments = [];
          for (let i = 0; i < files.length; i++) {
            let attachment = {};
            attachment._id = files[i].id;
            attachment.name = files[i].name;
            attachment.size = files[i].bytes;
            attachment.iconURL = files[i].icon;
            attachment.link = files[i].link;
            attachment.extension = `. ${files[i].name.split(".")[1]}`;
            attachments.push(attachment);
          }
          this.tempAttachments = attachments;
          this.$emit("picked", this.tempAttachments);
        },

        cancel: function () {
          // console.log("dropbox_canceled");
        },

        linkType: this.linkType,
        multiselect: this.multiselect,
        folderselect: this.folderselect,
      };
      if (this.extensions.length) {
        options.extensions = this.extensions;
      }

      if (this.sizeLimit) {
        options.sizeLimit = this.sizeLimit;
      }
      window.Dropbox.choose(options);
    },
    dropboxSaverIconClicked() {
      let options = {
        files: [
          {
            url: `https://api.pdfden.com/uploads/${this.uploadFiles[0]}`,
            // url: `http://127.0.0.1:5000/uploads/${this.uploadFiles[0]}`,
            filename: "merged_pdf.pdf",
          },
        ],
        success: function () {
          // Handle successful save
          // console.log("File saved to Dropbox successfully");
        },
        cancel: function () {
          // Handle cancelation of the save
          // console.log("Save to Dropbox canceled");
        },
        error: function (errorMessage) {
          // Handle error during save
          // console.error("Error saving to Dropbox:", errorMessage);
        },
      };
      // if (this.extensions.length) {
      //   options.extensions = this.extensions;
      // }
      // if (this.sizeLimit) {
      //   options.sizeLimit = this.sizeLimit;
      // }
      window.Dropbox.save(options);
    },
  },
};
</script>

<style scoped lang="scss">
html,
body {
  font-family: "Montserrat", sans-serif !important;
}
.dropbox-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 2px #0000ff !important;
  background-color: #fefefe;
  opacity: 1;
  border-radius: 50%;

  cursor: pointer;
}

.dropbox-icon i {
  color: #000 !important;
  font-size: 16px;
}

.dropbox-icon:hover {
  background-color: #0000ff;
  i {
    color: #fefefe !important;
  }
}
</style>
../config/key_env
