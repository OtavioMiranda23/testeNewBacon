<template>
    <main class="section">
        <div>
            <div class="title-wrapper">
                <h1>Usuários</h1>
                <button @click="handleAddNewUser" class="btn-new-usr">Novo Usuário</button>
            </div>
            <div v-show="isNewUserOpen || isEditUserOpen">
            <div>
                <span>Nome do usuário</span>
                <input type="text" v-model="newUser.name">
            </div>
            <div>
                <span>Função do usuário</span>
                <select v-model="newUser.role">
                    <option value="Desenvolvedor">Desenvolvedor</option>
                    <option value="Gerente de Projetos">Gerente de Projetos</option>
                    <option value="Tech Lead">Tech Lead</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                </select>
            </div>
            <button @click="isNewUserOpen ? handleSubmitNewUser() : updateUser(newUser.id)">
                {{ isNewUserOpen ? 'Adicionar Usuário' : 'Salvar Alterações' }}
            </button>            
            </div>
            <div class="card-wrapper" v-if="users.length">
                <Card v-for="user in users" 
                :key="user.id" 
                :userId="user.id" 
                @delete-user="deleteUser(user.id)"
                @update-user="updateUser(user.id)"
                
                >
                    <template #imgCard>
                        <img
                        :src="user.avatar ? user.avatar : require('@/assets/avatar.png')" 
                        :alt="user.first_name ? 
                        'Avatar do usuário ' + user.first_name + ' ' + user.last_name :
                        'Avatar com foto genérica'" />
                    </template>
                    <template #idCard>
                        <span>#{{ user.id }}</span>
                    </template>
                    <template #nameCard>
                        <strong v-if="user.last_name">{{ user.first_name }} {{ user.last_name }} </strong>
                        <strong v-else>{{ user.name }}</strong>
                    </template>
                    <template #mailCard>
                        <span>{{ user.email }}</span>
                    </template>
                    <template #roleCard>
                        <span>{{ user.role }}</span>
                    </template>
                </Card>

            </div>
        </div>
    </main>
</template>
<script>  
import axios from "axios";
import Card from "../components/CardUser"
export default {
    components: {
        Card
    },
    data() {
        return {
            users: [],
            isNewUserOpen: false,
            isEditUserOpen: false,
            newUser: {
                name: '',
                role: ''
            }
        }
    },

    async created() {
        await this.getUsers(1, 6);
        console.log(this.users);
    },
    methods: {
        async getUsers(page, per_page) {
            try {
                const res = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${per_page}`);
                this.users = res.data.data; 

            } catch(error) {
                console.error(error);
            }
        },
        async deleteUser(id) {
            try {
                const res = await axios.delete(`https://reqres.in/api/users/${id}`);
                console.log(res)
                this.users = this.users.filter(user => user.id !== id);
            } catch (error) {
            console.error('Error deleting user:', error);
            }
        },
        handleAddNewUser() {
            this.isNewUserOpen = !this.isNewUserOpen;
        },
        async handleSubmitNewUser() {
            try {
                const res = await axios.post('https://reqres.in/api/users', {
                    name: this.newUser.name,
                    role: this.newUser.role
                });
                console.log(res)
                this.users.unshift(res.data);
                this.isNewUserOpen = false; 
                this.newUser.name = ''; 
                this.newUser.role = ''; 
            } catch(error) {
                console.error('Error creating new user:', error);
            }
        },
        async updateUser(id) {
            this.isEditUserOpen = !this.isEditUserOpen;
            try {
                const userDataToUpdate = {
                    name: this.newUser.name,
                    role: this.newUser.role
                };

                const res = await axios.patch(`https://reqres.in/api/users/${id}`, userDataToUpdate);
                console.log(res);

                const updatedUserIndex = this.users.findIndex(user => user.id === id);
                if (updatedUserIndex !== -1) {
                    this.users[updatedUserIndex] = { ...this.users[updatedUserIndex], ...res.data };
                }
            } catch(error) {
                console.error('Error updating user:', error);
            }
}

    } 
}
</script>
  
  <style lang="css" scoped>
  main {
    margin: 96px auto 0;
  }
    .title-wrapper {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 32px;
    }
    .title-wrapper h1 {
        font-size: 3.125rem;            
    }
    .btn-new-usr {
        width: 100%;
        max-width: 185px;
        background-color: #000;
        color: #fff;
        border-radius: 5px;
        text-transform: capitalize;
        font-weight: 600;
        font-size: 0.938rem;
    }
    .card-wrapper {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
  </style>