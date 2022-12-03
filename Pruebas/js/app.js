const app= Vue.createApp({
    data(){
        return {
            saludo: "Hola Bienvenidos a Plataforma de Información Deportiva",
            edad:5,
            id:"",
            nombre:"",
            apellido:"",
            telefono:"",
            correo:"",
            navegadoresWeb:["Firefox","Crhome","Edge","Brave","Safari"],
            usuarios:[
                {
                    id:1,
                    nombre:"Geral",
                    apellido:"Morales",
                    telefono:"322146554",
                    correo:"geral@geral.com"
                },
                {
                    id:2,
                    nombre:"Julian",
                    apellido:"Moreno",
                    telefono:"322445554",
                    correo:"juli@geral.com"
                },
                {
                    id:3,
                    nombre:"Cecilia",
                    apellido:"Garzon",
                    telefono:"3224554554",
                    correo:"ceci@geral.com"
                },
                {
                    id:4,
                    nombre:"David",
                    apellido:"Morales",
                    telefono:"3225454554",
                    correo:"david@geral.com"
                },
                {
                    id:5,
                    nombre:"Cris",
                    apellido:"Alvarado",
                    telefono:"5646541635",
                    correo:"caf@geral.com"
                },
            ]
        }
    },
    methods:{
        incrementar(){
            this.edad=this.edad+1
        },

        decrementar(){
            this.edad=this.edad-1;
        },

        actualizarNavegadoresWeb(){
            this.navegadoresWeb.push(this.navegador);
            this.navegador="";
        },

        agregarUsuario(){
            this.usuarios.push({
                id:this.id,
                nombre:this.nombre,
                apellido:this.apellido,
                telefono:this.telefono,
                correo:this.correo,
            });
            console.log(this.usuarios)
            this.id="";
            this.nombre="";
            this.apellido="";
            this.telefono="";
            this.correo="";
        },

        verUsuarios(){
            enpoint="http://localhost:8080/usuario/consultar";
            opciones={method:"GET"}
            fetch(endpoint,opciones).then(async response=>{
                this.usuarios=await response.json();
            })
        }
    }
    
});
app.mount("#aplicacion")