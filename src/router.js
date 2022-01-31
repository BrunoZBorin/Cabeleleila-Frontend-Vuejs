import Vue from 'vue'
import Router from 'vue-router'
import Agendar from './components/pages/AgendarServico'
import CadastrarCliente from './components/pages/CadastrarCliente'
import Login from './components/pages/Login'
import Gerencial from './components/pages/Gerencial'
import GerenciarClientes from './components/pages/GerenciarClientes'
import GerenciarServicos from './components/pages/GerenciarServicos'
import GerenciarAtendimentos from './components/pages/GerenciarAtendimentos'

Vue.use(Router)

export default new Router({
    routes:[{
        path:'/',
        component:Login
    },{
        path:'/cadastrarcliente',
        component:CadastrarCliente
    },{
        path:'/agendarservico/:id',
        component:Agendar,
        props:true
    },
    {
        path:'/gerencial',
        component:Gerencial,
        props:true
    },
    {
        path:'/gerenciarclientes',
        component:GerenciarClientes,
        props:true
    },
    {
        path:'/gerenciarservicos',
        component:GerenciarServicos,
        props:true
    },
    {
        path:'/gerenciaratendimentos',
        component:GerenciarAtendimentos,
        props:true
    }]
})
