<template>
<div>
    <h1>Cadastro de clientes</h1>
    <b-alert show v-for="mensagem in mensagens" :key="mensagem.texto"
         :variant="mensagem.tipo">{{mensagem.texto}}</b-alert>    
    <b-card id="form-cadastro">
        <span class="select">Escolha o cliente para editar ou cadastre um novo</span>
        <select class="form-select" v-model="client.id" @change="onChangeClient($event)">
            <option v-for="c in clients" :key="c.id" :value="c.id">
                {{ c.name }} 
            </option>
        </select>
        <b-form-group label-form label="Nome:">
            <b-form-input type="text" size="lg"
                v-model="client.name"
                placeholder="Informe o Nome"></b-form-input>
        </b-form-group>
        <b-form-group label-form label="E-mail:">
            <b-form-input type="email" size="lg"
                v-model="client.email"
                placeholder="Informe o E-mail"></b-form-input>
        </b-form-group>
        <b-form-group label-form label="Endereço:">
            <b-form-input type="text" size="lg"
                v-model="client.adress"
                placeholder="Informe o Endereço"></b-form-input>
        </b-form-group>
        <b-form-group label-form label="CEP:">
            <b-form-input type="text" size="lg"
                v-model="client.zipcode"
                placeholder="Informe o CEP"></b-form-input>
        </b-form-group>
        <b-form-group label-form label="Cidade:">
            <b-form-input type="text" size="lg"
                v-model="client.city"
                placeholder="Informe o Cidade"></b-form-input>
        </b-form-group>
        <hr>
        <b-button @click="saveClient"
            size="lg" variant="success"
            >Salvar</b-button>
        <b-button class="ml-3" to="/"
            size="lg" variant="primary"
            >Voltar</b-button>
        <b-button v-if="client.id!=''" class="ml-3" @click="deleteClient"
            size="lg" variant="danger"
            >Excluir</b-button>
    </b-card>
</div>
    
</template>
<script>
export default {
    mounted(){
        this.getClients()
    },
    data(){
        return{
            mensagens:[],
            clients:[],
            client:{
                id:0,
                city:'',
                zipcode:'',
                address:'',
                email:'',
                name:''
            }
        }
    },
    methods:{
        onChangeClient(event)
        {
            this.$http.get('clients/'+event.target.value)
            .then( res =>  {
                this.client = { ...res.data}
            }).catch(console.error())
        },
        getClients()
        {
            this.$http.get('clients')
            .then( res =>  {
                this.clients = res.data
            }).catch(console.error())
        },
        saveClient()
        {
            if(this.client.id>0)
            {
                this.$http.put('clients/'+this.client.id, this.client)
                .then( res=>  {
                    console.log(res);
                    this.mensagens.push({
                        texto:"Cliente salvo com sucesso",
                        tipo:"success"
                    })
                    setTimeout(() => {
                        window.location.reload()}, 2000)
                }).catch((error)=>{
					var texto = JSON.stringify(error.response.data.errors)
                    this.mensagens.push({
                        texto:"Erro ao inserir o atendimento:"+texto,
                        tipo:"danger"
                    })
                    }
                )
            }
            else
            {
                this.$http.post('clients', this.client, {headers:{"Accept":"application/json"}})
                .then( ()=>  {
                    this.mensagens.push({
                        texto:"Cliente salvo com sucesso",
                        tipo:"success"
                    })
                    setTimeout(() => {
                        window.location.reload()}, 2000)
                }).catch((error)=>{
					var texto = JSON.stringify(error.response.data.errors)
                    this.mensagens.push({
                        texto:"Erro ao inserir o atendimento:"+texto,
                        tipo:"danger"
                    })
                    }
                )
            }

        },
        deleteClient()
        {
            this.$swal({
                title: "Deletar",
                text: "Apagar esse cliente?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Sim"
            }).then((result) => { 
                if (result.value) {
                    this.$http.delete('clients/'+this.client.id)
                    .then(()=>{
                        this.mensagens.push({
                        texto:"Cliente deletado com sucesso",
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