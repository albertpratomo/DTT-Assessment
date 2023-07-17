<template>
  <nav>
    <div class="logo">
      <img src="@/assets/image/img_logo_dtt@3x.png" alt="Logo" />
    </div>
    <ul>
      <li>
        <router-link class="nav-item" to="/">Houses</router-link>
      </li>
      <li><router-link class="nav-item" to="/about">About</router-link></li>
    </ul>
  </nav>
</template>
<style lang="scss">
@import "@/styles/navbar.scss";
</style>
