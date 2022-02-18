<template>
  <nav class="navbar navbar-expand-md">
    <div class="container-fluid mx-3">
      <h1 class="h4 fw-normal">{{ mobile_number }}</h1>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <h1 class="nav-link pointer h5" @click="logout">Logout</h1>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { onMounted, compute, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'NavCreateTable',
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginInfo = ref({});
    const mobile_number = ref('');

    const logout = async () => {
      localStorage.removeItem('items');
      localStorage.removeItem('login');
      await store.dispatch('setAuth', false);
      await router.push('/');
    };
    onMounted(() => {
      if (localStorage.login) {
        loginInfo.value = JSON.parse(localStorage.getItem('login') || '{}');
        mobile_number.value = loginInfo.value.mobile_number;
      }
    });
    return {
      logout,
      mobile_number
    };
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
