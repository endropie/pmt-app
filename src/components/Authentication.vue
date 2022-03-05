<template>
  <fieldset :disabled="loading">
    <q-card class="w-full max-w-xs rounded-xl">
      <!-- BOX -->
      <q-card-section v-if="user" class="items-center">
        <div class="flex flex-col items-center justify-center font-inter mb-5">
          <q-avatar
            size="80px"
            font-size="40px"
            square
            color="primary"
            text-color="white"
            icon="person"
            class="rounded-xl mb-2"
          />
          <div class="ml-2 mb-5 text-center">
            <div class="text-primary text-xl leading-none">{{ user.name }}</div>
            <q-chip dense color="blue-3 text-white text-medium" class="italic"
              >verified</q-chip
            >
          </div>
        </div>
        <div class="flex flex-row justify-center gap-4">
          <q-btn color="primary" label="Dashboard" to="/account" />
          <q-btn outline color="primary" label="Logout" @click="submitLogout()" />
        </div>
      </q-card-section>
      <!-- REGISTER -->
      <q-card-section v-else-if="isRegister">
        <div class="flex flex-col justify-center items-center pt-8 text-primary">
          <q-avatar
            size="72px"
            font-size="30"
            text-color="white"
            color="primary"
            icon="verified_user"
          />
          <h2 class="text-2xl font-bold text-uppercase leading-tight mt-2">
            REGISTER
          </h2>
        </div>

        <form class="mt-6" action="#" method="POST">
          <div class="mb-5">
            <q-input v-model="newRecord.name" type="text" label="Full name"
              :error="error.response.has('name')"
              :error-message="error.response.first('name')"
            />
            <q-input v-model="newRecord.email" type="text" label="Email"
              :error="error.response.has('email')"
              :error-message="error.response.first('email')"
            />
            <q-input v-model="newRecord.phone" type="text" label="Phone"
              :error="error.response.has('phone')"
              :error-message="error.response.first('phone')"
            />
            <q-input v-model="newRecord.password" type="password" label="Password"
              :error="error.response.has('password')"
              :error-message="error.response.first('password')"
            />
            <q-input type="password" label="Password Confirm"
              v-model="newRecord.password_confirmation"
              :error="error.response.has('password_confirmation')"
              :error-message="error.response.first('password_confirmation')"
            />
          </div>

          <q-btn
            color="positive"
            label="Register"
            class="py-2 w-full mb-4"
            @click="submitRegister()"
          />
        </form>
        <q-separator spaced inset />

        <q-btn flat @click="() => (isRegister = false)"
          >Are you have account ?</q-btn
        >
      </q-card-section>
      <!-- LOGIN -->
      <q-card-section v-else>
        <div class="flex flex-col justify-center items-center pt-4 text-primary">
          <q-avatar
            size="72px"
            font-size="30"
            text-color="white"
            color="primary"
            icon="verified_user"
          />
          <h2 class="text-2xl font-bold text-uppercase leading-tight mt-2">
            <!-- <q-icon name="verified_user" size="28px" /> -->
            LOGIN
          </h2>
        </div>
        <form class="mt-6" action="#" method="POST">
          <div class="mb-5">
            <q-input
              v-model="record.username"
              type="text"
              label="Email / Phone"
            />
            <q-input v-model="record.password" type="password" label="Password" />

            <div class="text-right mt-2">
              <q-btn
                dense
                flat
                size="sm"
                color="grey-8"
                label="Forgot Password?"
                tabindex="-1"
                class="font-semibold"
              />
            </div>
          </div>

          <q-btn
            color="primary"
            label="Log In"
            class="py-2 w-full mb-4"
            @click="submitLogin()"
          />
          <q-btn
            color="primary"
            label="Register"
            class="py-2 w-full"
            outline
            @click="isRegister = true"
          />
        </form>
        <q-separator spaced inset />
        <div class="mb-4 flex flex-row justify-center gap-4">
          <q-btn class="flex-grow" text-color="primary" outline>
            <div class="flex items-center justify-center">
              <q-icon name="mdi-google" />
              <span class="ml-4">Google</span>
            </div>
          </q-btn>

          <q-btn class="flex-grow" text-color="primary" outline>
            <div class="flex items-center justify-center">
              <q-icon name="mdi-facebook" />
              <span class="ml-4">Facebook</span>
            </div>
          </q-btn>
        </div>
      </q-card-section>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from 'src/composables/auth';

export default defineComponent({
  name: 'Authentication',
  setup() {
    const $router = useRouter();
    const { error, loading, user, login, register, authenticated, logout } = useAuth();
    void authenticated();

    const isRegister = ref(false);

    const record = ref({
      username: 'admin@example.com',
      password: 'password',
      remember: false,
    });

    const newRecord = ref({
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
    });

    const submitLogout = () => {
      return logout()
    };

    const submitLogin = () => {
      error.value.response.reset()
      return login({ ...record.value })
        .then(() => {
          void $router.push({ path: '/account' });
        })
    };

    const submitRegister = () => {
      error.value.response.reset()
      return register({ ...newRecord.value })
        .then(() => {
          void $router.push({ path: '/account' });
        })
    };

    return {
      error,
      submitLogin,
      submitRegister,
      submitLogout,
      loading,
      isRegister,
      user,
      record,
      newRecord,
    };
  },
});
</script>
