const app=Vue.createApp({
    data(){
        return {
            menu: 0
        }
    },
    methods: { 
}
})

app.component("guardar-usuario", {
    data(){
        return {
            documento:"",
            nombre:"",
            apellido:"",
            correo:"",
            telefono:"",
            genero:""
        };
    }, 
    template:`
    <div>
        <h2>Guardar Usuario</h2>
        <h3>Aquí te vas a registrar</h3>
        <form class="form-control d-flex flex-column" v-on:submit.prevent="guardarUsuario">
            <label>N° de Identificación</label>
            <input type="text" v-model="documento">
            <label>Nombre</label>
            <input type="text" v-model="nombre">
            <label>Apellido</label>
            <input type="text" v-model="apellido">
            <label>Correo</label>
            <input type="email" v-model="correo">
            <label>Telefono</label>
            <input type="text" v-model="telefono">
            <label>Genero</label>
            <input type="text" v-model="genero">
            <input type="submit" class="btn btn-warning rounded" value="Registrarte">
        </form>
    </div>    
`,
    methods:{
        guardarUsuario(){
            const endpoint="https://depappbackendf-production.up.railway.app/usuario/guardar";
            const opcion={
                method:"POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        documento:this.documento,
                        nombre:this.nombre,
                        apellido:this.apellido,
                        correo:this.correo,
                        telefono:this.telefono,
                        genero:this.genero
                    }
                )
            };
            fetch(endpoint,opcion).then(async response =>{
                alert("Te registraste correctamente");
                this.verUsuarios(); 
                this.documento="";
                this.nombre="";
                this.apellido="";
                this.correo="";
                this.telefono="";
                this.genero="";
            })
        }
    }
})

app.component("consultar-usuario", {
    data(){
        return {
            usuarios:[],
            apellidoBuscado:"",
            listaApellidos:[]
        }
    },
    template:`
    <div>
    <h2>Consultar Usuario</h2>
        <div class="d-flex flex-column justify-content-center align-items-center mb-4">
            <table class="table rounded p-4 shadow mb-4">
                <thead>
                    <th>N° Identificación</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th>Género</th>
                </thead>
                <tbody>
                    <tr v-for="user in usuarios">
                        <td>{{ user.documento }}</td>
                        <td>{{ user.nombre }}</td>
                        <td>{{ user.apellido }}</td>
                        <td>{{ user.correo }}</td>
                        <td>{{ user.telefono }}</td>
                        <td>{{ user.genero }}</td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" v-on:click="verUsuarios" class="btn btn-success rounded" value="Consultar Usuarios Registrados">
            <br>
            <h2 class="text-dark">Buscar por Apellido</h2>
            <div class="d-flex align-items-center justify-content-center mb-4">
                <label class="mx-1">Apellido:</label>
                <input type="text" v-model="apellidoBuscado">
                <input type="button" class="btn btn-warning" value="Buscar por Apellido" v-on:click="buscarxApellido">
            </div>
            <p class="mb-4 text-align-start">
                <p v-for="user in listaApellidos">
                    Documento: {{user.documento}}<br>
                    Nombre: {{user.nombre}}<br>
                    Apellido: {{user.apellido}}<br>
                    Correo: {{user.correo}}<br>
                    Telefono: {{user.telefono}}<br>
                    Genero: {{user.genero}}
                    </p>
    </div>
    `,
    methods:{
        verUsuarios() {
            const endpoint="https://depappbackendf-production.up.railway.app/usuario/consultar";
            const opcion={method:"GET"};
            fetch(endpoint,opcion).then(async response => {this.usuarios=await response.json()}); 
        },
        buscarxApellido() {
            const endpoint="https://depappbackendf-production.up.railway.app/usuario/buscarxapellido"+this.apellidoBuscado;
            const opcion={method:"GET"};
            fetch(endpoint,opcion).then(async response => {
                this.listaApellidos=await response.json();
            })
        }
    }
})

app.component("consultar-documento", {
    data(){
        return {
            buscarDoc:"",
            docuConsultado:{}
        }
    },
    template: `
    <div>
    <h2>Consultar Usuarios por ID</h2>
    <div class="d-flex justify-content-start align-items-center">
        <label class="mx-2 bg-light">N° Documento:</label>
        <input class="mx-2" type="text" v-model="buscarDoc">
        <input type="button" value="Buscar" class="btn btn-primary rounded" v-on:click="buscarPorId">
    </div>
    <p class="mb-4 bg-light p-3">Documento: {{docuConsultado.documento}}<br>
        Nombre: {{docuConsultado.nombre}}<br>
        Apellido: {{docuConsultado.apellido}}<br>
        Correo: {{docuConsultado.correo}}<br>
        Telefono: {{docuConsultado.telefono}}<br>
        Genero: {{docuConsultado.genero}}</p>
    </div>
    `,
    methods: {
        buscarPorId() {
            const endpoint="https://depappbackendf-production.up.railway.app/usuario/buscar-por-id" + this.buscarDoc;
            const opcion={method: "GET"};
            fetch(endpoint,opcion).then(async response => {
                this.docuConsultado=await response.json();
                this.buscarDoc="";
            })
        }
    }
})

app.component("eliminar-usuario", {
    data(){
        return {
            borrarDoc:""
        }
    },
    template: `
    <div>
    <h2>Eliminar Usuario por Documento</h2>
    <div class="mb-3 d-flex justify-content-start align-items-center">
        <label class="mx-2">Nro documento:</label>
        <input class="mx-2" type="text" v-model="borrarDoc">
        <input type="button" value="Eliminar Usuario" class="btn btn-danger rounded" v-on:click="eliminarDocUsuario">
    </div>
    </div>
    `,
    methods: {
        eliminarDocUsuario() {
            const endpoint="https://depappbackendf-production.up.railway.app/usuario/eliminar/"+this.borrarDoc;
            const opcion={method: "DELETE"};
            alertify.confirm ("Última oportunidad", "Estás seguro de eliminar este usuario?", function() {
                fetch(endpoint,opcion).then(async response => {
                    var respuesta=await response.json();
                    if (respuesta) {
                        alertify.success("Has eliminado al usuario correctamente.")
                        this.verUsuarios();
                        this.borrarDoc="";
                    } else {
                        alertify.error("Ups! Algo no salió bien")
                    }
            },
            function() {
                alertify.error("Cancelado");
            })
        })
    }
    }
})

//EQUIPOS

app.component("guardar-equipo", {
    data(){
        return {
            codigo:"",
            nombre:"",
            ciudad:"",
            fundacion:"",
            propietario:"",
            presidente:"",
            entrenador:""
        };
    }, 
    template:`
    <div>
    <h2>Registrar Equipo</h2>
    <h3>Aquí Registras un Nuevo Equipo</h3>
        <form class="form-control p-3 d-flex flex-column" v-on:submit.prevent="guardarEquipos">
            <label>Identificación</label>
            <input type="text" v-model="codigo">
            <label>Nombre del Equipo</label>
            <input type="text" v-model="nombre">
            <label>Ciudad del Equipo</label>
            <input type="text" v-model="ciudad">
            <label>Fundación del Equipo</label>
            <input type="text" v-model="fundacion">
            <label>Propietario del Equipo</label>
            <input type="text" v-model="propietario">
            <label>Presidente del Equipo</label>
            <input type="text" v-model="presidente">
            <label>Entrenador del Equipo</label>
            <input type="text" v-model="entrenador">
            <input type="submit" class="btn btn-danger rounded" value="Registrar Equipo">
        </form>
        </div>
`,
    methods:{
        guardarEquipos(){
            const endpoint="https://depappbackendf-production.up.railway.app/equipo/guardar";
            const opcion={
                method:"POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        codigo:this.codigo,
                        nombre:this.nombre,
                        ciudad:this.ciudad,
                        fundacion:this.fundacion,
                        propietario:this.propietario,
                        presidente:this.presidente,
                        entrenador:this.entrenador
                    }
                )
            };
            fetch(endpoint,opcion).then(async response =>{
                alert("Has registrado un equipo correctamente");
                this.verEquipos(); 
                this.codigo="";
                this.nombre="";
                this.ciudad="";
                this.fundacion="";
                this.propietario="";
                this.presidente="";
                this.entrenador="";
            })
        }
    }
})

app.component("consultar-equipo", {
    data(){
        return {
            equipo:[],
            equipoBuscado:"",
            listaEquipos:[]
        }
    },
    template:`
    <div>
    <h2>Consultar Equipos</h2>
        <div class="d-flex flex-column justify-content-center align-items-center mb-4">
            <table class="table rounded p-4 shadow mb-4 mt-0 bg-light">
                <thead>
                    <th>Código Equipo</th>
                    <th>Nombre Equipo</th>
                    <th>Ciudad Equipo</th>
                    <th>Fundacion Equipo</th>
                    <th>Propietario Equipo</th>
                    <th>Presidente Equipo</th>
                    <th>Entrenador Equipo</th>
                </thead>
                <tbody>
                    <tr v-for="user in equipo">
                        <td>{{ user.codigo }}</td>
                        <td>{{ user.nombre }}</td>
                        <td>{{ user.ciudad }}</td>
                        <td>{{ user.fundacion }}</td>
                        <td>{{ user.propietario }}</td>
                        <td>{{ user.presidente }}</td>
                        <td>{{ user.entrenador }}</td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" v-on:click="verEquipos" class="btn btn-dark rounded " value="Consultar Equipos Registrados">
            <br>
            <h2 class="text-dark">Buscar por Nombre Equipo</h2>
            <div class="d-flex align-items-center justify-content-center mb-4">
                <label class="mx-2">Nombre Equipo:</label>
                <input type="text" v-model="equipoBuscado" class="me-2">
                <input type="button" class="btn btn-secondary" value="Buscar Equipo" v-on:click="buscarxNombreEquipo">
            </div>
            <p class="mb-4 text-align-start">
                <p v-for="user in listaEquipos" class="bg-white p-2">
                    Código Equipo: {{user.codigo}}<br>
                    Nombre Equipo: {{user.nombre}}<br>
                    Ciudad Equipo: {{user.ciudad}}<br>
                    Fundacion Equipo: {{user.fundacion}}<br>
                    Propietario Equipo: {{user.propietario}}<br>
                    Presidente Equipo: {{user.presidente}}<br>
                    Entrenador Equipo: {{user.entrenador}}<br>
                </p>
                </p>
                </div>   
    </div>
    `,
    methods:{
        verEquipos() {
            const endpoint="https://depappbackendf-production.up.railway.app/equipo/consultar";
            const opcion={method:"GET"};
            fetch(endpoint,opcion).then(async response => {this.equipo=await response.json()}); 
        },
        buscarxNombreEquipo() {
            const endpoint="https://depappbackendf-production.up.railway.app/equipo/consultarnombre/"+this.equipoBuscado;
            const opcion={method:"GET"};
            fetch(endpoint,opcion).then(async response => {
                this.listaEquipos=await response.json();
            })
        }
    }
})

app.component("consultar-codequipo", {
    data(){
        return {
            codigoEquipoBusc:"",
            equipoBusqueda:{}
        }
    },
    template: `
    <div>
    <h2>Consultar Equipo por Código</h2>
    <div class="d-flex justify-content-start align-items-center">
        <label class="mx-2 bg-light ">Código de Equipo a buscar:</label>
        <input class="mx-2" type="text" v-model="codigoEquipoBusc">
        <input type="button" value="Buscar Equipo" class="btn btn-info rounded" v-on:click="buscarxCodEquipo">
    </div>
    <p class="mb-4 bg-light p-3">Código Equipo: {{equipoBusqueda.codigo}}<br>
        Nombre Equipo: {{equipoBusqueda.nombre}}<br>
        Ciudad Equipo: {{equipoBusqueda.ciudad}}<br>
        Fundación Equipo: {{equipoBusqueda.fundacion}}<br>
        Propietario Equipo: {{equipoBusqueda.propietario}}<br>
        Presidente Equipo: {{equipoBusqueda.presidente}}<br>
        Entrenador Equipo: {{equipoBusqueda.entrenador}}<br>
    </div>
    `,
    methods: {
        buscarxCodEquipo() {
            const endpoint="https://depappbackendf-production.up.railway.app/equipo/consultarcodigo/" + this.codigoEquipoBusc;
            const opcion={method: "GET"};
            fetch(endpoint,opcion).then(async response => {
                this.equipoBusqueda=await response.json();
                this.codigoEquipoBusc="";
            })
        }
    }
})

app.component("eliminar-equipo", {
    data(){
        return {
            borrarCodEquipo:""
        }
    },
    template: `
    <div>
    <h2>Eliminar Equipo por Código</h2>
    <div class="mb-3 d-flex justify-content-start align-items-center">
        <label class="mx-2">Código de Equipo a Eliminar:</label>
        <input class="mx-2" type="text" v-model="borrarCodEquipo">
        <input type="button" value="Eliminar Equipo" class="btn btn-danger rounded" v-on:click="eliminarEquipo">
    </div>
    </div>
    `,
    methods: {
        eliminarEquipo() {
            const endpoint="https://depappbackendf-production.up.railway.app/equipo/eliminar/"+this.borrarCodEquipo;
            const opcion={method: "DELETE"};
            alertify.confirm ("Última oportunidad", "Estás seguro de eliminar este equipo?", function() {
                fetch(endpoint,opcion).then(async response => {
                    var respuesta=await response.json();
                    if (respuesta) {
                        alertify.success("Has eliminado el equipo correctamente.")
                        this.verEquipos();
                        this.borrarCodEquipo="";
                    } else {
                        alertify.error("Ups! Algo no salió bien")
                    }
            },
            function() {
                alertify.error("Cancelado");
            })
        })
    }
    }
})

//EVENTOS

app.component("guardar-evento", {
    data(){
        return {
            id:"",
            equipoLocal:"",
            equipoVisitante:"",
            marcadorLocal:"",
            marcadorVisitante:""
        };
    }, 
    template:`
    <div>
    
    <h2>Guardar Evento</h2>
    <h3>Aquí registras nuevos Eventos</h3>
        <form class="form-control d-flex flex-column" v-on:submit.prevent="guardarEvento">
            <label>N° de Evento</label>
            <input type="text" v-model="id">
            <label>Equipo Local</label>
            <input type="text" v-model="equipoLocal">
            <label>Equipo Visitante</label>
            <input type="text" v-model="equipoVisitante">
            <label>marcadorLocal</label>
            <input type="text" v-model="marcadorLocal">
            <label>marcador Visitante</label>
            <input type="text" v-model="marcadorVisitante">
            <input type="submit" class="btn btn-warning rounded" value="Registrar Evento">
        </form>
        </div>
`,
    methods:{
        guardarEvento(){
            const endpoint="https://depappbackendf-production.up.railway.app/partidos/guardar";
            const opcion={
                method:"POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        id:this.id,
                        equipoLocal:this.equipoLocal,
                        equipoVisitante:this.equipoVisitante,
                        marcadorLocal:this.marcadorLocal,
                        marcadorVisitante:this.marcadorVisitante
                    }
                )
            };
            fetch(endpoint,opcion).then(async response =>{
                alert("Evento Registrado Correctamente");
                this.verEventos(); 
                this.id="";
                this.equipoLocal="";
                this.equipoVisitante="";
                this.marcadorLocal="";
                this.marcadorVisitante="";
            })
        }
    }
})

app.component("consultar-evento", {
    data(){
        return {
            eventos:[],
            }
    },
    template:`
    <div>
    <h2>Consultar Eventos</h2>
        <div class="d-flex flex-column justify-content-center align-items-center mb-4">
            <table class="table rounded p-4 shadow mb-4">
                <thead>
                    <th>Código de Evento</th>
                    <th>Equipo Local</th>
                    <th>Equipo Visitante</th>
                    <th>Marcador Local</th>
                    <th>Marcador Visitante</th>
                </thead>
                <tbody>
                    <tr v-for="user in eventos">
                        <td>{{ user.id }}</td>
                        <td>{{ user.equipoLocal }}</td>
                        <td>{{ user.equipoVisitante }}</td>
                        <td>{{ user.marcadorLocal }}</td>
                        <td>{{ user.marcadorVisitante }}</td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" v-on:click="verEventos" class="btn btn-success rounded" value="Consultar Eventos Registrados">
            <br>
            </div>
    </div>
    `,
    methods:{
        verEventos() {
            const endpoint="https://depappbackendf-production.up.railway.app/partidos/consultar";
            const opcion={method:"GET"};
            fetch(endpoint,opcion).then(async response => {this.eventos=await response.json()}); 
        }
    }
})

app.mount("#aplicacion")