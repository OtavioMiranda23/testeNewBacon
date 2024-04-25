<template>
<div class="details">
  <div class="details-top">
    <span>{{ user.id }}</span>
    <router-link :to="`/`">
      <button>Voltar</button>
    </router-link>
  </div>

  <div class="datails-content">
    <div class="details-middle-wrapper">
      <div>
        <img :src="user.avatar ? user.avatar : require('@/assets/avatar.png')"
        :alt="'Avatar do usuário ' + user.first_name + ' ' + user.last_name">
      </div>
      <div class="details-first-name">
        <span>Primeiro nome</span>
        <strong>{{ user.first_name }}</strong>
      </div>
      <div v-if="user.first_name" class="details-last-name">
        <span>Último nome</span>
        <strong>{{ user.last_name }}</strong>
      </div>
    </div>

    <div class="details-bottom-wrapper">
      <div class="details-mail">
        <span>Endereço de email</span>
        <span>george.bluth@reqres.in</span>
      </div>
      <div v-if="user.email" class="details-avatar">
        <span>Link do avatar</span>
        <a :href="user.email" target="_blank">{{ user.email }}</a>
      </div>
    </div>
    <div class="details-support">
      <span>Link de suporte</span>
      <a href="https://reqres.in/#support-heading" target="_blank">https://reqres.in/#support-heading</a >
    </div>
    <div class="details-description">
      <span>Descrição do usuário</span>
      <span>To keep ReqRes free, contributions towards server costs are appreciated!</span>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: []
    }
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUserData(userId);
  },
  methods: {
    async fetchUserData(userId) {
      try {
        // Verifique se os dados do usuário estão no localStorage
        const storedUserData = window.localStorage.getItem('userData');
        console.log('6666', storedUserData)
        if (storedUserData) {
          alert()
          const parse = JSON.parse(storedUserData);
          console.log(parse.id);
          this.user = parse;
          return;
        }

        // Se não estiverem no localStorage, faça a solicitação à API
        const res = await axios.get(`https://reqres.in/api/users/${userId}`);
        this.user = res.data.data;
      }catch(error) {
        console.error(error);
      }    
    }
  }
}
</script>
