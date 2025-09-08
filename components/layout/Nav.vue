<template>
  <nav class="navbar" @mouseleave="isOpen = false">
    <div class="block__container">
      <LocalizedLink to="/" style="background-color: #fff !important">
        <img src="@/assets/img/vue-logo.png" width="160" srcset="" alt="PDFDEN Logo" />
      </LocalizedLink>
      <div class="navbar-toggle" @click="toggleNavbar">
        <!-- <md-icon>menu</md-icon> -->
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
      <ul class="nav-lists">
        <li class="nav-item" style="position: relative; right: 10%">
          <ul class="nav-list">
            <li>
              <LocalizedLink
                to="/merge-pdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/merge-pdf') }"
              >
                {{ $t("features.merge.title") }}
              </LocalizedLink>
            </li>

            <li>
              <LocalizedLink
                to="/split-pdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/split-pdf') }"
              >
                {{ $t("features.split.title") }}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                to="/compress-pdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/compress-pdf') }"
              >
                {{ $t("features.compress.title") }}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                to="/sign-pdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/sign-pdf') }"
              >
                {{ $t("features.sign.title") }}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                to="/edit-pdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/edit-pdf') }"
              >
                {{ $t("features.edit.title") }}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                to="/rotate-pdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/rotate-pdf') }"
              >
                {{ $t("features.rotate.title") }}
              </LocalizedLink>
            </li>
            <li style="margin-top: -10px">
              <md-speed-dial
                class="dropdown-tooltip"
                md-direction="bottom"
                style="padding: 0; position: absolute; right: -140px"
              >
                <button
                  class="nav-btn dropdown-btn"
                  md-menu-trigger
                  style="
                    min-width: 38px;
                    font-weight: 600 !important;
                    font-family: Montserrat;
                  "
                >
                  {{ $t("other_features.convert_pdf.title") }}
                </button>

                <md-speed-dial-content
                  style="z-index: 1000"
                  class="nab-dropdown-content"
                >
                  <LocalizedLink to="word-to-pdf">
                    <md-button class="nav-btn dropdown-btn">
                      {{ $t("features.word_pdf.title") }}
                    </md-button>
                  </LocalizedLink>
                  <LocalizedLink to="pdf-to-word">
                    <md-button class="nav-btn dropdown-btn">
                      {{ $t("features.pdf_word.title") }}
                    </md-button>
                  </LocalizedLink>
                </md-speed-dial-content>
              </md-speed-dial>
            </li>
          </ul>
        </li>
        <li class="nav-item" v-if="user">
          <img
            class="user_avatar"
            :src="user.avatar"
            alt="User Avatar"
            v-if="user"
            @click="showUserPanel = true"
          />
          <div
            class="user-panel"
            v-if="showUserPanel"
            @mouseleave="showUserPanel = false"
          >
            <div
              class="user-panel-item"
              @click="$router.push('/admin_dashboard')"
              v-if="user.isAdmin"
            >
              Admin Panel
            </div>
            <div class="user-panel-item" @click="changePassword">
              Change Password
            </div>
            <div class="user-panel-item" @click="logout">Log Out</div>
          </div>
          <ul class="nav-list" v-if="!user">
            <li
              class="md-list-item auth-btn login-btn"
              :class="{ 'active-auth': isActive('/login') }"
            >
              <LocalizedLink to="login">
                {{ $t("nav-links.login") }}
              </LocalizedLink>
            </li>
            <li
              class="md-list-item auth-btn signup-btn"
              :class="{ 'active-auth': !isActive('/login') }"
            >
              <LocalizedLink to="signup">
                {{ $t("nav-links.signup") }}
              </LocalizedLink>
            </li>
          </ul>
        </li>
      </ul>
      <div :class="{ 'navbar-open': isOpen }">
        <ul class="mobile-nav-list" @mouseleave="isOpen = false">
          <li :class="{ 'mobile-active-link': isActive('/merge-pdf') }">
            <LocalizedLink to="/merge-pdf">
              {{ $t("features.merge.title") }}
            </LocalizedLink>
          </li>
          <li :class="{ 'mobile-active-link': isActive('/split-pdf') }">
            <LocalizedLink to="/split-pdf">
              {{ $t("features.split.title") }}
            </LocalizedLink>
          </li>
          <li :class="{ 'mobile-active-link': isActive('/compress-pdf') }">
            <LocalizedLink to="/compress-pdf">
              {{ $t("features.compress.title") }}
            </LocalizedLink>
          </li>
          <li :class="{ 'mobile-active-link': isActive('/rotate-pdf') }">
            <LocalizedLink to="/rotate-pdf">
              {{ $t("features.rotate.title") }}
            </LocalizedLink>
          </li>

          <li :class="{ 'mobile-active-link': isActive('/word-to-pdf') }">
            <LocalizedLink to="/word-to-pdf">
              {{ $t("features.word_pdf.title") }}
            </LocalizedLink>
          </li>
          <li :class="{ 'mobile-active-link': isActive('/pdf-to-word') }">
            <LocalizedLink to="/pdf-to-word">
              {{ $t("features.pdf_word.title") }}
            </LocalizedLink>
          </li>
          <li :class="{ 'mobile-active-link': isActive('/sign-pdf') }">
            <LocalizedLink to="/sign-pdf">
              {{ $t("features.sign.title") }}
            </LocalizedLink>
          </li>
          <li :class="{ 'mobile-active-link': isActive('/edit-pdf') }">
            <LocalizedLink to="/edit-pdf">
              {{ $t("features.edit.title") }}
            </LocalizedLink>
          </li>
          <!-- <li>
            <LocalizedLink to="login">
              {{ $t("nav-links.login") }}
            </LocalizedLink>
          </li>
          <li>
            <LocalizedLink to="signup">
              {{ $t("nav-links.signup") }}
            </LocalizedLink>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { state, mutations, actions } from "@/store/index.js";

import LocalizedLink from "@/components/LocalizedLink";

export default {
  data() {
    return {
      isOpen: false,
      showUserPanel: false,
    };
  },

  components: { LocalizedLink },
  computed: {
    user() {
        return this.$store.state.user;
    },
},
  methods: {
    setUser(user) {
      this.$store.commit("setUser", user);
    },
    toggleNavbar() {
      this.isOpen = !this.isOpen;
    },
    isActive(route) {
      return this.$route.path === route;
    },
    logout() {
      this.showUserPanel = false;
        if (process.client) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("vuex");
        }
        this.$store.dispatch("setUser", null);
        this.$router.push("/");
    },
    changePassword() {
      if (this.user.isAdmin) {
        this.$router.push("/admin_dashboard/changepassword");
      }
    },
  },
};
</script>
<style scoped>
.user_avatar {
  width: 40px;
  position: absolute;
  right: 15%;
  top: 15%;
  border-radius: 50%;
  cursor: pointer;
}
.user-panel {
  position: absolute;
  border-radius: 10px;
  z-index: 500;
  background: #fefefe;
  -webkit-box-shadow: 0 5px 5px 2px #6e6c6c;
  box-shadow: 0 5px 5px 2px #6e6c6c;
  min-width: 143px;
  font-size: 15px;
  font-weight: 500;
  right: 182px;
  top: 56px;
  padding: 10px;
}
.user-panel-item {
  padding-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
}
.user-panel-item:hover {
  background-color: #0000ff;
  color: #fefefe;
}
a {
  border-radius: 8px !important;
}
.block__container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 91%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.md-speed-dial {
  display: block;
  flex-direction: column;
}
.md-speed-dial .md-button {
  margin: 1px 0;
  padding: 0;
  background: #fefefe !important;
  height: 40px;
  width: 150px;
  border-radius: 8px;
  border: 1px solid #0000ff;
}
.md-speed-dial .md-button .md-button-content {
  color: #495057 !important;
  font-weight: 600 !important;
}

.navbar {
  background-color: #fff; /* Material Design Blue */
  z-index: 11;
  position: relative;
  height: 60px !important;

  box-shadow: 0px 4px 17px 0px rgb(81 65 65 / 38%);
}
button {
  background: #fefefe;
  margin: 2px 0px;
  height: 38px;
  font-weight: 600;
}
a {
  color: #000000 !important;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.nav-lists {
  list-style: none;
  display: flex;
  margin: 0;
}

.nav-item {
  display: block;
  margin-top: 20px;
  margin-bottom: 10px;
}

.nav-list {
  list-style: none;
  display: flex;
  margin: 0;
}

.nav-list li {
  margin: 0 10px;
}

.nav-list li a:hover {
  color: #fff !important;
  background-color: #0000ff !important;
}
.nav-btn {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #0000ff;
  margin-left: 0px;
  font-size: 13px;
  cursor: pointer;
  color: #495057 !important;
  font-weight: 700;
}

.nav-btn:hover {
  color: #0000ff;
  color: #fefefe !important;
}

.active-link {
  color: #fff !important;
  background: #0000ff !important;
}
a.nav-btn.nuxt-link-exact-active.nuxt-link-active.active-link:hover {
  color: #fff !important;
}

.auth-btn {
  font-size: 13px !important;
  font-weight: 600 !important;
  cursor: pointer;
  display: none;
}

.active-auth {
  border-radius: 8px !important;
  background: #0000ff !important;
  padding: 10px 15px;
  color: #fff;
  border: none;
  margin-top: -10px !important;
}

.mobile-nav-list {
  display: none;
}

.router-link-active {
  color: #fff !important;
  background-color: #0000ff !important;
}
.dropdown-btn:hover {
  background-color: #0000ff !important;
  color: #ffffff !important;
}
@media (max-width: 1570px) {
  .nav-btn {
    padding: 10px 5px;
  }
  .block__container {
    max-width: 100%;
  }
  .user_avatar {
    right: 10%;
  }
}
@media (max-width: 1710px) {
  .user_avatar {
    right: 12%;
  }
  .user-panel {
    right: 60px;
  }
}

@media only screen and (max-width: 991px) {
  .navbar {
    padding-top: 15px;
  }
  .navbar-toggle {
    display: flex;
    position: absolute;
    cursor: pointer;
    right: 18px;
  }

  .navbar-open {
    display: block !important;
    z-index: 10;
  }

  .nav-lists {
    display: none;
  }

  .nav-list {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #fff; /* Material Design Blue */
  }

  .nav-list.show {
    display: flex;
  }

  .nav-list li {
    text-align: left;
    margin: 20px 0;
  }

  .navbar-open .mobile-nav-list {
    display: block;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: absolute;
    color: #000;
    top: 30px;
    right: 7px;
    width: 48%;
    background-color: #fff;
    list-style: none;
    font-size: 20px;
    border-radius: 7px;
    box-shadow: 0px 1px 2px 2px #28212145;
    font-weight: 700;
    z-index: 999;
    padding: 10px;
  }
  .mobile-nav-list li {
    padding: 10px 15px;
  }
  .mobile-nav-list li:hover {
    background-color: #3e3ed3;
    border-radius: 7px;
  }
  .mobile-nav-list li:hover > a {
    color: #fefefe !important;
  }
  .mobile-active-link {
    background-color: #3e3ed3;
    color: #fefefe !important;
    border-radius: 7px;
  }
  .mobile-active-link > a {
    color: #fff !important;
  }

  .nav-btn {
    margin-left: 0;
    width: fit-content;
    border: none;
  }

  .auth-btn {
    width: fit-content;
    display: none;
  }
  .user_avatar {
    right: 8%;
  }
  .user-panel {
    right: 20px;
  }
  .router-link-active,
  .router-link-exact-active {
    background-color: #fff !important;
    color: #0000ff !important;
  }
}
</style>
