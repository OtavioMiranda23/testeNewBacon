<template>
  <form id="form">
    <div class="form-title">
        <span>Nome do usuário</span>
        <input :class="{ 'error': isError }" name="name" type="text" v-model="name" > 
    </div>
    <div class="form-content">
        <span>Função do usuário</span>
        <select :class="{ 'error': isError }" name="role" v-model="role">
            <option value="Desenvolvedor">Desenvolvedor</option>
            <option value="Gerente de Projetos">Gerente de Projetos</option>
            <option value="Tech Lead">Tech Lead</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
        </select>
    </div>
    <button @click="userSubmitted(userId)">
        Salvar dados do Usuário
    </button>            
  </form>
</template>

<script>
export default {
    props: {
        userId: Number
    },
    data() {
      return {
        name: "",
        role: "",
        isError: false,
      }
    },
    methods: {
      userSubmitted(){
        this.isError = false;
        let user = {
          name: this.name,
          role: this.role,
        }
        if(!user.name && !user.role) {
            this.isError = true;
            return
        }
        if(this.userId) user.id = this.userId;
        this.$emit('submit-user', user);
        this.name = "";
        this.role = "";
      }
    }
}
</script>
<style scoped >
#form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
#form span {
  font-size: 1rem;
  font-weight: 600;
}
#form input, #form select {
  width: 100%;
  height: 55px;
  max-width: 584px;
  border-radius: 5px;
  padding: 1rem;
  font-size: 0.938rem;
  border: 1px solid #E5E5E5;
}
#form button {
  background-color: #000;
  height: 55px;
  font-weight: 600;
  font-size: 0.938rem;
  color: #fff;
  cursor: pointer;
  margin: 2rem 0;
  transition: background-color 0.3s ease;

}
#form button:hover {
  background-color: #333;
}
.form-title, .form-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
#form input.error, #form select.error {
  border-color: red; 
}
</style>