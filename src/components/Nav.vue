<template>
  <nav class="navbar navbar-expand-md bg-light">
    <div class="container-fluid mx-5">
      <router-link to="/" class="navbar-brand"><img src="https://mybillbook.in/static-assets/images/mybillbook-logo.webp" height="20" /></router-link>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <span class="nav-item h6 orange">Why Use My BillBook?</span>
          <span class="nav-item h6">Who is it For?</span>
          <span class="nav-item h6">Online Store?</span>
          <span class="nav-item h6">Pricing</span>
          <span class="nav-item h6">FAQs</span>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Nav'
};
</script>
<style>
span.nav-item {
  padding-left: 2rem;
}
</style>
