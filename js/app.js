const app=Vue.createApp({
    data(){
        return{
            documento:"",
            nombre:"",
            apellido:"",
            correo:"",
            telefono:"",
            genero:"",
            buscaDoc:"",
            usuarios:[],
            usuario:{},
            borrarDoc:"",
            buscaApellido:""
        }
    },

    methods:{
        guardarUsuario(){
            const endpoint="http://localhost:8080/usuario/guardar";
            const opciones={
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    documento:this.documento,
                    nombre:this.nombre,
                    apellido:this.apellido,
                    correo:this.correo,
                    telefono:this.telefono,
                    genero:this.genero
                })
            };

            fetch(endpoint,opciones).then(async response=>{
                alert("Usuario Guardado");
                this.consultarUsuarios();
                this.documento="";
                this.nombre="";
                this.apellido="";
                this.correo="";
                this.telefono="";
                this.genero="";
            })
        },
        consultarUsuarios(){
            const endpoint="http://localhost:8080/usuario/consultar";
            const opciones={method:"GET"}

            fetch(endpoint,opciones).then(async response=>{
                this.usuarios=await response.json();
            })
        },
        buscarDoc(){
            const endpoint="http://localhost:8080/usuario/buscar-por-id/"+this.buscaDoc;
            const opciones={method:"GET"};

            fetch(endpoint,opciones).then(async response=>{
                this.usuario=await response.json();
            })
        },
        eliminaUsuario(){
            const endpoint="http://localhost:8080/usuario/eliminar/"+this.borrarDoc;
            const opciones={method:"DELETE"};

            fetch(endpoint,opciones).then(async response=>{
                var respuesta=await response.json();
                if(respuesta){
                    alert("Usuario Eliminado!!");
                    this.consultarUsuarios();
                    this.borrarDoc="";

                }
                else{
                    alert("El Usuario no fue encontrado")
                }
            })
        },
        buscarApellido(){
            const endpoint="http://localhost:8080/usuario/buscarxapellido/"+this.buscaApellido;
            const opciones={method:"GET"};

            fetch(endpoint,opciones).then(async response=>{
                this.usuarios=await response.json();
            })
        }
    }
})
app.component("guardar-usuario",{
    data(){
        return{};
    },
    template:
})
app.mount("#aplicacion")