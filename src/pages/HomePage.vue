<template>
  <main class="section">
    <div>
      <div class="title-wrapper">
        <h1>Usuários</h1>
        <button @click="toggleForm(null)" class="btn-new-usr" :class=" formOpen ? 'gray' : ''">
          {{ formOpen ? "Cancelar" : "Novo Usuário"}} 
        </button>
      </div>
      <CreateUserForm
        v-show="formOpen"
        @submit-user="handleUserSubmit"
        :userId="this.currId"
      />
      <div class="card-wrapper" v-if="users.length">
        <Card
          v-for="user in users"
          :key="user.id"
          :userId="user.id"
          @delete-user="deleteUser(user.id)"
          @update-user="toggleForm(user.id)"
        >
          <template #imgCard>
            <img
              :src="user.avatar ? user.avatar : require('@/assets/avatar.png')"
              :alt="
                user.first_name
                  ? 'Avatar do usuário ' +
                    user.first_name +
                    ' ' +
                    user.last_name
                  : 'Avatar com foto genérica'
              "
            />
          </template>
          <template #idCard>
            <span>#{{ user.id }}</span>
          </template>
          <template #nameCard>
            <strong>{{ user.first_name }} {{ user.last_name }} </strong>
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
import CreateUserForm from "../components/CreateUserForm"
export default {
    components: {
        Card,
        CreateUserForm
    },
    data() {
        return {
            users: [],
            formOpen: false,
            currId: null,
        }
    },

    async created() {
        await this.getUsers(1, 6);
    },

    methods: {
        handleUserSubmit(info){
            if(info.id){
                this.updateUser(info.id, info);
                return;
            }

            this.createUser(info);
        },
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
                await axios.delete(`https://reqres.in/api/users/${id}`);
                this.users = this.users.filter(user => user.id !== id);
            } catch (error) {
            console.error('Error deleting user:', error);
            }
        },
        async createUser(user) {
            try {
                let {first_name, last_name} = this.handleName(user.name);

                const userDataToCreate = {
                    first_name,
                    role: user.role,
                };

                if(last_name) userDataToCreate.last_name = last_name;

                const res = await axios.post('https://reqres.in/api/users', userDataToCreate);
                this.users.unshift(res.data);
                this.toggleForm(null);

            } catch(error) {
                console.error('Error creating new user:', error);
            }
        },

        /**
         * @param {number} id
         * @returns {void}
         */
        toggleForm(id){
            
            this.currId = id;
            this.formOpen = !this.formOpen;
        },

        /**
         * @param {string} nome 
         * @returns {string}
         */
        handleName(nome){
            let split = nome.split(" ");
            let result = {first_name: this.capitalize(split[0])};
            if(split.length > 1){
                result.last_name = this.capitalize(split.at(-1));
            }

            return result;
        },
        
        /**
         * @param {string} name 
         * @returns {string}
         */
        capitalize(name){
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        /**
         * @param {number} id 
         * @param {Object} user 
         * @returns {void}
         */
        async updateUser(id, user) {
            try {
                let {first_name, last_name} = this.handleName(user.name);
                const userDataToUpdate = {
                    first_name,
                    role: user.role,
                };
                if(last_name) userDataToUpdate.last_name = last_name;
                const res = await axios.patch(`https://reqres.in/api/users/${id}`, userDataToUpdate);
                const updatedUserIndex = this.users.findIndex(user => user.id === id);
                if (updatedUserIndex === -1) {
                    console.error(`Usuário com id ${id} não encontrado no state users`);
                    return;
                }
                this.users[updatedUserIndex] = {...this.users[updatedUserIndex], ...res.data};

            } catch(error) {
                console.error('Error updating user:', error);
            } finally {
                this.currId = null;
                this.toggleForm(null);
            }
        }
    }
}
</script>

<style lang="css" scoped>
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
  cursor: pointer;
  transition: background-color 0.2s ease;

}
.btn-new-usr.gray {
  background-color: #F7F7F7;
  color: #000;
  border: none;
  transition: background-color 0.2s ease;

}
.btn-new-usr:hover {
  background-color: #333;
}
.btn-new-usr.gray:hover {
  background-color: #e4e4e4;
}
.card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
