<template>
  <div class="smart-footer">
    <div class="smart-copyright">© {{ $t("nav-links.copyright") }}</div>
  </div>
</template>
<style>
.smart-footer {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  background-color: #ffffff;
  height: 4vh;
  padding-top: 9px;
  text-align: left;
  padding-left: 30px;
  text-align: center;
}
@media (max-width: 991px) {
  .smart-footer {
    text-align: center;
    padding-left: 0;
  }
}
</style>
