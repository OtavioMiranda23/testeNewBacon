<template>
  <div>
    <div>
        <span>Nome do usuário</span>
        <input name="name" type="text" v-model="name"> 
    </div>
    <div>
        <span>Função do usuário</span>
        <select name="role" v-model="role">
            <option value="Desenvolvedor">Desenvolvedor</option>
            <option value="Gerente de Projetos">Gerente de Projetos</option>
            <option value="Tech Lead">Tech Lead</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
        </select>
    </div>
    <button @click="userSubmitted(userId)">
        Salvar dados do Usuário
    </button>            
  </div>
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
      }
    },
    methods: {
      userSubmitted(){
        let user = {
          name: this.name,
          role: this.role,
        }

        if(this.userId) user.id = this.userId;
        this.$emit('submit-user', user);
        console.log("SUBMIT USER EMITIDO")

        this.name = "";
        this.role = "";
      }
    }
}
</script>