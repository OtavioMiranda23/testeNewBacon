<template>
    <main class="section">
        <div>
            <div class="title-wrapper">
                <h1>Usuários</h1>
                <button class="btn-new-usr">Novo Usuário</button>
            </div>
            <div class="card-wrapper" v-if="users.length">
                <Card v-for="user in users" :key="user.id" :userId="user.id" @delete-user="deleteUser(user.id)">
                    <template #imgCard>
                        <img 
                        :src="user.avatar" 
                        :alt="'Avatar do usuário ' + user.first_name + ' ' + user.last_name" />
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
                console.error(error)
            }
        },
            deleteUser(id) {
                console.log(this.users);
                this.users = this.users.filter((user) => user.id !== id);
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
  