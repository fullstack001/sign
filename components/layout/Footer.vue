<template>
  <div class="footer">
    <div class="block__container">
      <!-- <LangSelector /> -->
      <div class="footer_menus">
       
        <div class="footer-links">
          
          <div class="footer-link border-right">
            <router-link to="/"> {{ $t("nav-links.about") }} </router-link>
          </div>
          <div class="footer-link border-right">
            <LocalizedLink
              to="/merge-pdf"
              class="nav-btn"
              :class="{ 'active-link': isActive('/merge-pdf') }"
            >
              {{ $t("features.merge.title") }}
            </LocalizedLink>
          </div>
          <div class="footer-link border-right">
            <LocalizedLink
              to="/split-pdf"
              class="nav-btn"
              :class="{ 'active-link': isActive('/split-pdf') }"
            >
              {{ $t("features.split.title") }}
            </LocalizedLink>
          </div>
          <div class="footer-link border-right">
            <LocalizedLink
              to="/compress-pdf"
              class="nav-btn"
              :class="{ 'active-link': isActive('/compress-pdf') }"
            >
              {{ $t("features.compress.title") }}
            </LocalizedLink>
          </div>
          <div class="footer-link border-right">
            <LocalizedLink to="word-to-pdf" class="nav-btn">
              {{ $t("features.word_pdf.title") }}
            </LocalizedLink>
          </div>
          <div class="footer-link border-right">
            <LocalizedLink to="sign-pdf" class="nav-btn">
              {{ $t("features.sign.title") }}
            </LocalizedLink>
          </div>
          <div class="footer-link border-right">
            <LocalizedLink to="edit-pdf" class="nav-btn">
              {{ $t("features.edit.title") }}
            </LocalizedLink>
          </div>
          <div class="footer-link border-right">
            <LocalizedLink to="pdf-to-word" class="nav-btn">
              {{ $t("features.pdf_word.title") }}
            </LocalizedLink>
          </div>
          <div class="footer-link border-right">
            <LocalizedLink to="rotate-pdf" class="nav-btn">
              {{ $t("features.rotate.title") }}
            </LocalizedLink>
          </div>
          <div class="footer-link">
            <LocalizedLink to="blog" class="nav-btn">
              {{ $t("nav-links.blog") }}
            </LocalizedLink>
          </div>
        </div>
      </div>
      <!-- <div class="footer-social">
        <div class="social">
          <i class="fa-brands fa-facebook-f"></i>
        </div>
        <div class="social">
          <i class="fa-brands fa-instagram"></i>
        </div>
        <div class="social">
          <i class="fa-brands fa-twitter"></i>
        </div>
        <div class="social">
          <i class="fa-brands fa-youtube"></i>
        </div>
      </div> -->
    </div>
    <div class="footer-links policy-links">
        <div class="footer-link">
          <LocalizedLink to="/privacy-policy" class="nav-btn">
            Privacy Policy
          </LocalizedLink>
        </div>
        <div class="footer-link">|</div>
        <div class="footer-link">
          <LocalizedLink to="/tos" class="nav-btn">
            Terms of Use
          </LocalizedLink>
        </div>
      </div>
    <div class="block__container desktop">
      <div class="footer-link footer-logo">
            <LocalizedLink to="/">
              <img
                src="@/assets/img/vue-logo.png"
                width="100"
                srcset=""
                alt="PDFDEN Logo"
              />
            </LocalizedLink>
          </div>
      
      <div class="copyright">© {{ $t("nav-links.copyright") }}</div>
      <LocaleSwitcher />
    </div>
    <div class="block__container mobile">
      <div class="footer-link footer-logo">
            <LocalizedLink to="/">
              <img
                src="@/assets/img/vue-logo.png"
                width="100"
                srcset=""
                alt="World"
              />
            </LocalizedLink>
      </div>
      <LocaleSwitcher />
      <div class="copyright">© {{ $t("nav-links.copyright") }}</div>
    </div>
  </div>
</template>
<script>
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
import LocalizedLink from "@/components/LocalizedLink";

export default {
  components: {
    LocaleSwitcher,
    LocalizedLink,
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>
<style scoped>
.block__container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 91%;
  position: relative;
  display: flex;
}

.footer_menus {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.footer-links {
  display: inline-flex;
  margin: 10px 0;
}

.footer-social {
  display: inline-flex;
  position: absolute;
  right: 0;
}

.social {
  background-color: #fff;
  border-radius: 50%;
  margin-right: 10px;
  width: 35px;
  height: 35px;
  padding: 7px 5px 6px 10px;
  color: #e34f4f;
}

.footer {
  padding-top: 10px;
  border-top: solid 1px;
}

.footer-link {
  padding: 0px 10px 0 10px;
}

.footer-link a {
  color: #000 !important;
  font-weight: 600;
}
.copyright {
  padding-bottom: 20px;
  margin-right: auto;
  margin-left: auto;
}

.login-btn,
.signup-btn {
  font-size: 12px !important;
  font-weight: 600 !important;
}

.signup-btn {
  border-radius: 8px !important;
  background: #0000ff !important;
  padding: 10px 15px;
  color: #fff;
  border: none;
  cursor: pointer;
}

.border-right {
  border-right: solid 1px;
}
.mobile{
  display: none;
}
@media only screen and (max-width: 1025px) {
  .copyright {
    margin-right: auto;
    margin-left: auto;
  }
  .block__container {
    max-width: 100%;
  }
  .footer-social {
    top: 0px;
    right: -10px;
  }
  .footer_menus {
    display: flow !important;
  }
  
}
@media (max-width: 640px) {
  .footer{
    padding-top:20px;
  }
  .desktop{
    display: none;
  }
  .mobile{
    display:ruby
  }
  .footer-links {
    display: -webkit-box;
    display: -ms-flexbox;
    display: inline-flex;
    width: 100%;
    flex-wrap: wrap;
    text-align: center;
  }
  .footer-link {
    font-size: 12px !important;
    margin: 5px 0px;
    text-align: center;
  }
  .policy-links {
    justify-content: center;
    width: 100%;
    margin: 10px 0;
    text-align: center;
    padding-left: 10px;
  
  }
 
 
  
}

.policy-links {
     margin: 0 15px;
    font-size: 14px;
    padding-right: auto;
    padding-left: 56px;
    /* margin-left: auto; */
    /* margin-right: auto; */
    width: 97%;
    text-align: center;
    justify-content: center;
    margin-bottom: 10px;
    font-weight:300 !important;
}

.policy-links .footer-link {
  padding: 0 5px;
}

</style>
