<template>
  <Nav />
  <div class="light-orange">
    <div class="d-flex p-5">
      <div class="col-8">
        <h1 class="h3 mb-3">Simple GST Billing & Stock Management</h1>
        <h1 class="h3 mb-3 fw-normal">Software for your business</h1>
        <br />
        <h1 class="h5 mb-3 fw-normal">Atma Nirbhar Vyapaari bane</h1>
      </div>
      <div class="card col-4 card-design">
        <form @submit.prevent="getOtp(false)" class="p-5">
          <h1 class="h4 mb-3 fw-normal text-muted">Login to myBillBook</h1>
          <div class="form-group">
            <label for="basic-addon1">Enter Mobile Number</label>
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">+91</span>
              </div>
              <input
                v-model="data.mobile_number"
                type="number"
                max="9999999999"
                min="1000000000"
                placeholder="9543625478"
                class="form-control"
                aria-label="Mobile No."
                aria-describedby="basic-addon1"
                required
              />
            </div>
          </div>

          <div v-if="showOtpInput" class="form-group">
            <label for="basic-addon2">Enter OTP</label>
            <div class="input-group">
              <input v-model="data.otp_code" type="number" class="form-control" aria-label="OTP" aria-describedby="basic-addon2" required />
            </div>
            <label class="text-muted mb-3 resend-btn" @click="getOtp(true)">Resend OTP in {{ interval }} sec</label>
          </div>
          <button class="w-100 btn btn-primary" type="submit">{{ message }}</button>
        </form>
      </div>
    </div>
    <div class="iso-logo">
      Made with ❤️ in India &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
        ><img src="https://mybillbook.in/static-assets/images/landing-page/iso-black.webp" alt="iso logo"
      /></span>
    </div>
  </div>
  <div class="marker orange-background"></div>
  <Pricing></Pricing>
</template>
<script lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Pricing from '../components/Pricing.vue';
import Nav from '../components/Nav.vue';
import { useStore } from 'vuex';

export default {
  name: 'Login',
  components: { Pricing: Pricing, Nav: Nav },
  setup() {
    const message = ref('Get Otp');
    const showOtpInput = ref(false);
    const data = reactive({
      mobile_number: '',
      otp_code: ''
    });

    const router = useRouter();
    const store = useStore();
    const interval = ref(60);

    const getOtp = async (resend = false) => {
      if (!showOtpInput.value || (resend && interval.value <= 0)) {
        await fetch('https://niobooks.in/api/web/request_otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json', Client: 'web' },
          body: JSON.stringify({ mobile_number: data.mobile_number })
        });
        message.value = 'Login';
        showOtpInput.value = true;
        if (resend) {
          interval.value = 60;
        }
        const intervalTimer = () => {
          interval.value = interval.value - 1;
          if (interval.value <= 0) {
            clearInterval(counter);
          }
        };
        const counter = setInterval(intervalTimer, 1000);
      } else if (!resend) {
        authenticateOtp();
      }
    };

    const authenticateOtp = async () => {
      try {
        const response = await fetch('https://niobooks.in/api/web/authenticate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json', Client: 'web' },
          body: JSON.stringify({ mobile_number: data.mobile_number, otp_code: data.otp_code })
        });
        const content = await response.json();
        localStorage.setItem('login', JSON.stringify(content));
        await store.dispatch('setAuth', true);
        await router.push('/createTable');
      } catch (e) {
        await store.dispatch('setAuth', false);
      }
    };

    return {
      data,
      message,
      showOtpInput,
      interval,
      getOtp
    };
  }
};
</script>

<style>
.orange-background {
  background-color: #ff8c00;
}
.resend-btn {
  cursor: pointer;
}
.light-orange {
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 100px;
  padding-bottom: 20px;

  background-color: #fff9f0;
}
.iso-logo {
  padding-top: 80px;
}
.marker {
  height: 4px;
  width: 15%;
}
.card-design {
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgb(0 0 0 / 13%);
}
</style>
