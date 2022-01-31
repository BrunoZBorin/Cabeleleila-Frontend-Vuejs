<template>
    <div>
        <h1>Cadastro de atendimentos</h1>
        <b-alert show v-for="mensagem in mensagens" :key="mensagem.texto"
            :variant="mensagem.tipo">{{mensagem.texto}}</b-alert>    
            
        <b-card id="form-cadastro">
            <span class="select">Escolha um atendimento para editar ou cadastre um novo</span>
            <select class="form-select" v-model="attendance.id" @change="onChangeAttendance($event)">
                <option v-for="a in attendances" :key="a.id" :value="a.id">
                    {{a.client+" "+a.service+" "+a.dateservice+" "+a.hour }} 
                </option>
            </select>
            <span class="select">Escolha um cliente</span>
            <select class="form-select" v-model="client.id" @change="onChangeClient($event)">
                <option v-for="c in clients" :key="c.id" :value="c.id">
                    {{ c.name }} 
                </option>
            </select>
            <div v-if="attendance.client!=''" >
                <span class="select">Cliente {{attendance.client}}</span>
                <br>
            </div>
            <span class="select">Escolha um serviço</span>
            <select class="form-select" v-model="service.id" @change="onChangeService($event)">
                <option v-for="s in services" :key="s.id" :value="s.id">
                    {{ s.name }} 
                </option>
            </select>
            <div v-if="attendance.service!=''">
                <span class="select">Serviço: {{attendance.service}}</span>
                <br>
            </div>
            <span class="select">Escolha a data</span>
            <b-form-datepicker id="example-datepicker" v-model="attendance.dateservice" class="mb-2"></b-form-datepicker>
            <span class="select">Escolha o horário</span>
            <select class="form-select" v-model="attendance.hour" @change="onChangeHour($event)">
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
            </select>
            <hr>
            <b-button @click="saveAttendance"
                size="lg" variant="success"
                >Salvar</b-button>
            <b-button class="ml-3" to="/"
                size="lg" variant="primary"
                >Voltar</b-button>
            <b-button v-if="attendance.id!=''" class="ml-3" @click="deleteAttendance"
                size="lg" variant="danger"
                >Excluir</b-button>
        </b-card>
    </div>
</template>
<script>
export default {
    mounted(){
        this.getAttendances();
        this.getServices();
        this.getClients()
    },
    data(){
        return{
            mensagens:[],
            attendances:[],
            attendance:{
                id:0,
                client_id:0,
                service_id:0,
                dateservice:"",
                hour:"",
                service:"",
                client:""
            },
            client:{
                id:0
            },
            service:{
                id:0
            },
            clients:[],
            services:[]
        }
    },
    methods:{
        onChangeAttendance(event)
        {
            this.$http.get('showAttendance/'+event.target.value)
            .then( res =>  {
                console.log(res)
                this.attendance = { ...res.data[0]}
            }).catch(console.error())
        },
        onChangeClient(event)
        {
            this.attendance.client_id = event.target.value;
        },
        onChangeService(event)
        {
            this.attendance.service_id = event.target.value;
        },
        getAttendances()
        {
            this.$http.get('attendancesList')
            .then( res =>  {
                console.log(res)
                this.attendances = res.data
            }).catch(console.error())
        },
        getServices()
        {
            this.$http.get('services')
            .then( res =>  {
                this.services = res.data
            }).catch(console.error())
        },
        getClients()
        {
            this.$http.get('clients')
            .then( res =>  {
                this.clients = res.data
            }).catch(console.error())
        },
        saveAttendance()
        {
            if(this.attendance.id>0)
            {
                this.$http.put('attendances/'+this.attendance.id, this.attendance)
                .then( ()=>  {
                    this.mensagens.push({
                        texto:"Atendimento salvo com sucesso",
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
                this.$http.post('attendances', this.attendance)
                .then( ()=>  {
                    this.mensagens.push({
                        texto:"Atendimento salvo com sucesso",
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
        deleteAttendance()
        {
            this.$swal({
                title: "Deletar",
                text: "Apagar esse attendancee?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Sim"
            }).then((result) => { 
                if (result.value) {
                    this.$http.delete('attendances/'+this.attendance.id)
                    .then(()=>{
                        this.mensagens.push({
                        texto:"Atendimento deletado com sucesso",
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