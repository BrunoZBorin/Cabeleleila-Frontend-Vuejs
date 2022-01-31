<template>
    <div >
        <h1>Cadastro de clientes</h1>
        <b-alert show v-for="mensagem in mensagens"
			:key="mensagem.texto"
			:variant="mensagem.tipo">{{ mensagem.texto }}</b-alert>
		<b-card id="form-cadastro">
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
			<b-button @click="saveClient()"
				size="lg" variant="success"
                >Salvar</b-button>
			<b-button class="ml-3" @click="goToLogin"
				size="lg" variant="primary"
				>Voltar</b-button>
			<b-button v-if="client.id!=''" class="ml-3" @click="deleteClient"
				size="lg" variant="danger"
				>Excluir</b-button>
		</b-card>
    </div>
    
</template>
<script>

export default{
    data(){
        return {
            client:{
                name:"",
                city:"",
                datebirth:"2020-10-10",
                email:"",
                adress:"",
                zipcode:"",
				id:""
            },
			mensagens:[]

        }
    },
	methods: {

		saveClient() {
			this.$http.post('clients', this.client)
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
		},
		goToLogin(){
			this.$router.push('/', 1)
		}

	}
    
}

</script>
<style>

</style>
