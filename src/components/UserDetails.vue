<template>
<div class="details section">
  <div class="details-top">
    <span>#{{ user.id }}</span>
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
      <div class="details-name">
        <span class="details-title">Primeiro nome</span>
        <strong class="details-subtitle">{{ user.first_name }}</strong>
      </div>
      <div class="details-name" v-if="user.first_name">
        <span>Último nome</span>
        <strong class="details-subtitle">{{ user.last_name }}</strong>
      </div>
    </div>

    <div class="details-bottom-wrapper">
      <div class="details-mail">
        <span class="details-title">Endereço de email</span>
        <span class="details-subtitle">george.bluth@reqres.in</span>
      </div>
      <div v-if="user.email" class="details-avatar">
        <span class="details-title">Link do avatar</span>
        <a class="details-subtitle" :href="user.email" target="_blank">{{ user.email }}</a>
      </div>
      <div class="details-support">
        <span class="details-title">Link de suporte</span>
        <a class="details-subtitle" href="https://reqres.in/#support-heading" target="_blank">https://reqres.in/#support-heading</a >
      </div>
      <div class="details-description">
        <span class="details-title">Descrição do usuário</span>
        <span class="details-subtitle">To keep ReqRes free, contributions towards server costs are appreciated!</span>
      </div>
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

<style scoped>
.details-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}
.details-top button {
  width: 185px;
  height: 55px;
  background-color: #F7F7F7;
  font-weight: 600;
  font-size: 0.938rem;
  border: none;
  cursor: pointer;
}
.details-top span {
  font-size: 3.125rem;
  font-weight: 700;
}
.details-middle-wrapper {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.details-name {
  display: flex;
  flex-direction: column;
}

.details-title {
  font-size: 0.875rem;
  font-weight: 400;
  color: #797979;
}
.details-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: #000;
}
.details-bottom-wrapper {
  display: flex;
  flex-direction: column;
}
.details-bottom-wrapper div {
  display: flex;
  flex-direction: column;
}
</style>
