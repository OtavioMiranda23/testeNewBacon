<template>
    <main>
        <div>
            <h1>Olar</h1>
            <button>Novo Usuário</button>
            <Card>
                <template #idCard>
                    <span>1</span>
                </template>
                <template #nameCard>
                    <span>Otavio Miranda</span>
                </template>
                <template #mailCard>
                    <span>otaviomiranda@lala.com</span>
                </template>
            </Card>
        </div>
    </main>
</template>
<script>
import Card from "../components/CardUser"
export default {
    components: {
        Card
    }
}
</script>
  
  <style>
  </style>
  