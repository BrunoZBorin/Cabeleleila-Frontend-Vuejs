<template>
  <div>
		<b-card id="login">
			<b-form-group label="E-mail:">
				<b-form-input type="email" size="lg"
					v-model="user.email"
					placeholder="Informe o E-mail"></b-form-input>
			</b-form-group>
			<hr>
			<b-button @click="login"
				size="lg" variant="success"
                >Login</b-button>
		</b-card>
    <!-- <div class="row justify-content-between"> -->
      <b-button to="cadastrarcliente" size="lg" variant="primary" class="button-login">Cadastro de Clientes</b-button>
      <b-button to="gerencial" size="lg" variant="dark" class="button-login">Gerencial</b-button>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      user:{
        email:''
      }
    }
  },
  mounted(){
    console.log(this.$route.params)
  },
  methods:{
    login(){
      this.$http.get(`/clients/searchEmail/`+ this.user.email)
				.then( res =>  {
           if(res.data.length > 0)
           {
              console.log(res)
             this.$router.push('/agendarservico/'+res.data[0].id)
           }else{
             this.$swal({
                title: "Email não encontrado",
                text: "Gostaria de se cadastrar agora?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Sim"
            }).then((result) => { 
                if (result.value) {
                  this.$router.push('cadastrarcliente')    
                }
            });
           }	
				}).catch(console.error())
    }
  }

}
</script>
<style>
.button-login{
  min-width: 250px;
}
</style>