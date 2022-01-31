<template>
    <div>
        <h1>Cadastro de serviços</h1>
        <b-alert show v-for="mensagem in mensagens" :key="mensagem.texto"
            :variant="mensagem.tipo">{{mensagem.texto}}</b-alert>    
            
        <b-card id="form-cadastro">
            <span class="select">Escolha um serviço para editar ou cadastre um novo</span>
            <select class="form-select" v-model="service.id" @change="onChangeService($event)">
                <option v-for="s in services" :key="s.id" :value="s.id">
                    {{ s.name }} 
                </option>
            </select>
            <b-form-group label-form label="Nome:">
                <b-form-input type="text" size="lg"
                    v-model="service.name"
                    placeholder="Informe o Nome"></b-form-input>
            </b-form-group>
            <b-form-group label-form label="Valor:">
                <b-form-input type="number" size="lg"
                    v-model="service.value"
                    placeholder="Informe o Valor"></b-form-input>
            </b-form-group>
            <b-form-group label-form label="Dificuldade:">
                <b-form-input type="text" size="lg"
                    v-model="service.dificulty"
                    placeholder="Informe a Dificuldade"></b-form-input>
            </b-form-group>
            <hr>
            <b-button @click="saveService"
                size="lg" variant="success"
                >Salvar</b-button>
            <b-button class="ml-3" to="/"
                size="lg" variant="primary"
                >Voltar</b-button>
            <b-button v-if="service.id!=''" class="ml-3" @click="deleteService"
                size="lg" variant="danger"
                >Excluir</b-button>
        </b-card>
    </div>
</template>
<script>
export default {
    mounted(){
        this.getServices()
    },
    data(){
        return{
            mensagens:[],
            services:[],
            service:{
                id:0,
                name:'',
                value:0,
                dificulty:''
            }
        }
    },
    methods:{
        onChangeService(event)
        {
            this.$http.get('services/'+event.target.value)
            .then( res =>  {
                this.service = { ...res.data}
            }).catch(console.error())
        },
        getServices()
        {
            this.$http.get('services')
            .then( res =>  {
                this.services = res.data
            }).catch(console.error())
        },
        saveService()
        {
            if(this.service.id>0)
            {
                this.$http.put('services/'+this.service.id, this.service)
                .then( ()=>  {
                    this.mensagens.push({
                        texto:"Serviço salvo com sucesso",
                        tipo:"success"
                    })
                    setTimeout(() => {
                        window.location.reload()}, 2000)
                }).catch((error)=>{
					var texto = JSON.stringify(error.response.data.errors)
                    this.mensagens.push({
                        texto:"Erro ao inserir o serviço:"+texto,
                        tipo:"danger"
                    })
                    }
                )
            }
            else
            {
                this.$http.post('services', this.service)
                .then( ()=>  {
                    this.mensagens.push({
                        texto:"Serviço salvo com sucesso",
                        tipo:"success"
                    })
                    setTimeout(() => {
                        window.location.reload()}, 2000)
                }).catch((error)=>{
					var texto = JSON.stringify(error.response.data.errors)
                    this.mensagens.push({
                        texto:"Erro ao inserir o serviço:"+texto,
                        tipo:"danger"
                    })
                    }
                )
            }

        },
        deleteService()
        {
            this.$swal({
                title: "Deletar",
                text: "Apagar esse serviço?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Sim"
            }).then((result) => { 
                if (result.value) {
                    this.$http.delete('services/'+this.service.id)
                    .then(()=>{
                        this.mensagens.push({
                        texto:"Serviço deletado com sucesso",
                        tipo:"danger"})
                        setTimeout(() => {
                        window.location.reload()}, 2000)}
                    ).catch(console.error())
                }
            });
        }
    }
    
}
</script>
<style>

</style>