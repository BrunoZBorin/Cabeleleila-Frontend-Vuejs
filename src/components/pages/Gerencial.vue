<template>
    <div>
        <h1>Gerencial</h1>
        <b-card-group class="row">
            <b-card bg-variant="success" text-variant="white" header="Atendimentos último mês" class="text-center" id="box-header">
                <b-card-text>Total Atendimentos: {{this.totalAttendM}}</b-card-text>
                <hr/>
                <b-card-text>Faturamento: R$ {{parseFloat(this.totalValueM).toFixed(2)}}</b-card-text>
            </b-card>
            <b-card bg-variant="success" text-variant="white" header="Atendimentos última semana" class="text-center" id="box-header">
                <b-card-text>Total Atendimentos: {{this.totalAttendW}}</b-card-text>
                <hr/>
                <b-card-text>Faturamento: R$ {{parseFloat(this.totalValueW).toFixed(2)}}</b-card-text>
            </b-card>
            <hr>
            <b-button id="box-button" to="/gerenciaratendimentos" size="lg" variant="secondary">Gerenciar atendimentos</b-button>
            <b-button id="box-button" to="/gerenciarservicos" size="lg" variant="warning">Gerenciar serviços</b-button>
            <b-button id="box-button" to="/gerenciarclientes" size="lg" variant="danger">Gerenciar clientes</b-button>
            <b-button id="box-button" to="/" size="lg" variant="primary">Voltar</b-button>
        </b-card-group>
        
    </div>
</template>
<script>

export default {
    data(){
        return{
            totalAttendM:0,
            totalValueM:0,
            totalAttendW:0,
            totalValueW:0
        }
    },
    mounted(){
        this.loadMonth();
        this.loadWeek();
    },
    methods:{
        loadMonth()
        {
            this.$http.get('attendancesLastMonth')
            .then( res =>  {
                this.totalAttendM = res.data[0];
                this.totalValueM = res.data[1]
            }).catch(console.error())
        },
        loadWeek()
        {
            this.$http.get('attendancesLastWeek')
            .then( res =>  {
                this.totalAttendW = res.data[0];
                this.totalValueW = res.data[1]
            }).catch(console.error())
        }

    }
      
}

</script>
<style>
#box-header{
    font-family: Ubuntu-Regular;
	font-size: 25px;
    min-width: 50vh;
}

</style>