<template>
  <div  v-show="isShow">
    <div class="router-view-div">
      <Nav />
      <div class="admin">
        <div class="menu-nav">
          <div class="nav-title">Dashboard</div>
          <router-link
            to="/admin_dashboard/liveview"
            tag="div"
            class="admin-nav"
            :class="{ 'active-nav': isActive('/admin_dashboard/liveview') }"
          >
            Live View
          </router-link>
          <router-link
            to="/admin_dashboard/files"
            tag="div"
            class="admin-nav"
            :class="{ 'active-nav': isActive('/admin_dashboard/files') }"
          >
            Files
          </router-link>
          <router-link
            to="/admin_dashboard/blogcontent"
            tag="div"
            class="admin-nav"
            :class="{ 'active-nav': isActive('/admin_dashboard/blogcontent') }"
          >
            Blog Content
          </router-link>
          <router-link
            to="/admin_dashboard/serverstatus"
            tag="div"
            class="admin-nav"
            :class="{ 'active-nav': isActive('/admin_dashboard/serverstatus') }"
          >
            Server Status
          </router-link>
          <router-link
            to="/admin_dashboard/changepassword"
            tag="div"
            class="admin-nav"
            :class="{
              'active-nav': isActive('/admin_dashboard/changepassword'),
            }"
          >
            Change Password
          </router-link>
        </div>
        <nuxt />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/layout/Nav.vue";
import Footer from "@/components/layout/Footer.vue";
import EventBus from "@/config/EventBus";

export default {
  name: "admin",
  computed: {
    locale() {
      return this.$route.params && this.$route.params.locale
        ? this.$route.params.locale
        : "en";
    },
    metaTags() {
      return [
        {
          property: "og:url",
          content: window.location.href,
        },
        {
          property: "og:site_name",
          content: "pdfden - Online tools for PDF",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:locale",
          content: this.locale,
        },
      ];
    },
  },
  metaInfo() {
    return {
      meta: this.metaTags,
    };
  },
  components: {
    Nav,
    Footer,
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  data() {
    return {
      isLoading: false,
      isShow:false
    };
  },
  created() {
    if (!this.user || this.user.isAdmin != 1) {
      this.$router.push("/login");
    } else {
      this.isShow=true
    }
  },
  mounted() {
    EventBus.$on("i18n-load-start", () => (this.isLoading = true));
    EventBus.$on("i18n-load-complete", () => (this.isLoading = false));
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  computed: {
    user() {
      return this.$store.state["user"];
    },
  },
  methods: {
    handleBeforeUnload() {
      // Remove the localStorage item when the website is closed
      // localStorage.removeItem("token");
    },

    isActive(path) {
      return this.$route.path == path;
    },
    localeProperty() {
      const locale = {
        property: locale,
        content: this.$route.params.locale ? this.$route.params.locale : "en",
      };

      return locale;
    },
    setMetaData() {
      const metaInfo = {
        title: "PDFden ",
        titleTemplate: "%s | Online PDF Tools",
        meta: [
          // {
          //   vmid: "description",
          //   name: "description",
          //   content: "Parent description.",
          // },
          {
            property: "og:url",
            content: window.location.href,
          },
          {
            property: "og:site_name",
            content: "pdfden",
          },
          {
            property: locale,
            content: this.$route.params.locale
              ? this.$route.params.locale
              : "en",
          },
        ],
      };

      return metaInfo;
    },
  },
};
</script>

<style>
.admin {
  display: flex;
}
.menu-nav {
  height: 100vh;
  width: 15%;
  text-align: center;
  background-color: #012;
  color: #fefefe;
  font-size: 21px;
}
.nav-title {
  padding: 26px 0;
  font-size: 34px;
  margin-bottom: 20px;
  background-color: #033;
}
.admin-nav {
  margin: 20px 5px;
}
.active-nav {
  color: #0000ff;
}
.admin-nav:hover {
  cursor: pointer;
}
.router-view-div {
  max-height: 100vh;
  overflow-y: auto;
  width: 100%;
}
html,
body {
  font-family: "Montserrat", sans-serif !important;
}
.tab-area .md-tabs-navigation {
  box-shadow: none;
  padding: 10px;
}

.tab-area .md-button-content {
  display: grid !important;
}

.tab-area .md-button-content .md-tab-label {
  color: #333 !important;
  font-size: 18px;
}

.tab-area .md-button-content .md-tab-icon {
  color: #333 !important;
  font-size: 50px !important;
  width: 50px !important;
  height: 50px !important;
}

.md-tabs-navigation .md-active {
  border: solid 1px #0000ff;
}

.md-tabs-navigation .md-button {
  height: 95px !important;
}

.md-button.md-primary {
  background-color: #0000ff !important;
}

.picker-dialog-frame {
  min-height: 600px;
}
.md-stepper .md-steppers.md-vertical .md-stepper-header {
  background-color: #fff !important;
}

.add_button .md-ripple {
  padding: 0 !important;
}

.md-icon-button .md-ripple .md-button-content i {
  color: #000 !important;
}

.nav-btn .md-button,
.nav-btn .md-button:active,
.nav-btn .md-button:focus,
.nav-btn .md-button:hover,
.nav-btn .md-button:active:focus,
.nav-btn .md-button:active:hover {
  padding: 0;
  background-color: transparent !important;
  color: #000 !important;
  font-weight: 600;
  box-shadow: none !important;
}

.nav-btn .md-button .md-ripple {
  padding: 10px 20px !important;
}

.md-list-item .md-list-item-container .md-ripple {
  padding: 0 !important;
}

.md-list-item .md-list-item-container .md-ripple a {
  padding: 10px 20px !important;
}
.md-menu-content .md-list .md-list-item a {
  font-size: 12px !important;
  width: 100% !important;
}

.nav-btn .md-button .md-ripple .md-button-content .material-icons {
  font-size: 12px !important;
}

.md-list-item {
  margin-left: 0 !important;
}

@media (max-width: 991px) {
  .md-layout-item {
    flex: auto !important;
    padding-left: 0;
  }

  .block__container {
    margin-left: 0;
  }
  .tab-area .md-button-content .md-tab-label {
    color: #333 !important;
    font-size: 14px;
  }
}
</style>
