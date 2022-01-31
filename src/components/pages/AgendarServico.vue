<template>
    <div >
        <h2>Agendar Serviço</h2>
        <b-alert show v-for="mensagem in mensagens" :key="mensagem.texto"
         :variant="mensagem.tipo">{{mensagem.texto}}</b-alert>    
        <span>Escolha o serviço</span>
        <select class="form-select" v-model="service.id" @change="onChangeService($event)">
            <option v-for="s in services" :key="s.id" :value="s.id">
                {{ s.name+" - R$"+s.value }} 
            </option>
        </select>
        <p>{{ service.name}}</p>
        <span>Escolha a data</span>
        <b-form-datepicker id="example-datepicker" v-model="attendance.dateservice" class="mb-2"></b-form-datepicker>
        <span>Escolha o horário</span>
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
        <b-button @click="saveAttendance()" size="lg" variant="success" class="button-login">Agendar</b-button>
        <b-button to="/" size="lg" variant="primary" class="button-login">Voltar</b-button>
        <br>
        <br>
        <p class="mb-0">Clique para editar</p>
        <b-card @click="editAttendance(a)" class="card-attendance" v-for="a in attendances" :key="a.id">
            <div>
                {{a.name+" Dia:"+a.dataservice+" às "+a.hour+" horas"}}
            </div>
            <b-button @click="deleteAttendance(a)" variant="danger"><i class="bi bi-trash-fill"></i></b-button>
        </b-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            service:{
                id:0,
                name:'',
                dificulty:'',
                value:0
            },
            services:[],
            mensagens:[],
            attendances:[],
            attendance:{
                id:0,
                dateservice:'',
                hour:'',
            }
        }
    },
    props:['id'],
    mounted(){
        this.getServices();
        this.getAttendances(this.id)
    },
    methods:{
        getServices()
        {
            this.$http.get('services')
            .then( res =>  {
                this.services = res.data
            }).catch(console.error())
        },
        onChangeService(event)
        {
            this.service.id = event.target.value
        },
        onChangeHour(event)
        {
            this.attendance.hour = event.target.value
        },
        saveAttendance()
        {
            let attendance = {
                dateservice: this.attendance.dateservice,
                client_id: this.id,
                service_id: this.service.id,
                hour: this.attendance.hour
            }
            this.$http.post('attendances', attendance)
            .then(()=> {
                        this.mensagens.push({
                        texto:"Serviço agendado com sucesso",
                        tipo:"success"
                    })
                    this.$router.push('/')
                }
            ).catch((error)=>{
					
                    this.mensagens.push({
                        texto:"Erro ao inserir o serviço, erro:"+error,
                        tipo:"danger"
                    })
                    }
                )
            setTimeout(() => {
                window.location.reload()}, 2000);
                
        },
        getAttendances(id)
        {
            this.$http.get('searchAttendances/'+id)
            .then( res =>  {
                if(res.data.length>0)
                {
                    this.attendances = res.data;
                    this.$swal("Você já possui atendimento marcado para essa semana, gostaria de marcar para a mesma data?");
                    this.attendance.dateservice = this.attendances[0].dateservice;
                }
                
            }).catch(console.error())
            
        },
        editAttendance(a)
        {
            var myDate = new Date();
            
            myDate.setDate(myDate.getDate() + 2)
            let servico = new Date(a.dateservice.replace(/-/g,'/'))
            if(servico<myDate)
            {
                return this.$swal("Não é possível alterar atendimentos com menos de 2 dias de antecedência");
            }
            this.$http.get('services/'+a.service_id)
            .then( res =>  {
                this.service = { ...res.data}
            }).catch(console.error())
            this.attendance = {...a}
        },
        deleteAttendance(a)
        {
            var myDate = new Date();
            
            myDate.setDate(myDate.getDate() + 2)
            let servico = new Date(a.dateservice.replace(/-/g,'/'))
            if(servico<myDate)
            {
                return this.$swal("Não é possível cancelar atendimentos com menos de 2 dias de antecedência");
            }
            this.$swal({
                title: "Cancelar",
                text: "Apagar esse atendimento?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Sim"
            }).then((result) => { 
                if (result.value) {
                    this.$http.delete('attendances/'+a.id)
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
    },
}
</script>

<style>

</style>
