const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


let conexion = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    database :'formulario',
    password:'',
});


conexion.connect((err) => {
    if(!err){
        console.log("exito --");
    }else{
        console.log("no conectado ");
    };
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/css",express.static(__dirname +'/form/css'));
app.use("/img",express.static(__dirname +'/form/img'));
app.use("/js",express.static(__dirname +'/form/js'));


app.get("/",function(req,res){ 
    var filePath = path.join(__dirname, '/form/index.html');
    res.sendFile(filePath);
});
app.get("/index.html",function(req,res){ 
    var filePath = path.join(__dirname, '/form/index.html');
    res.sendFile(filePath); 
});

app.get("/sesion.html",function(req,res){ 
    var filePath = path.join(__dirname, '/form/sesion.html');
    res.sendFile(filePath);
});

app.post("/validar", (req, res)=>{
    let data= req.body;

    const carrera = data.carrera;
    const name = data.nombre;
    const ape = data.apellido;
    const dni = data.dni;
    const naci = data.nacimiento;
    const email = data.correo;
    const password = data.password;

    const registro = "INSERT INTO estudiante (carrera,nombres,apellido,dni,fechaN,email,password) VALUES('"+carrera+"','"+ name +"','"+ ape +"','"+ dni +"','"+ naci +"','"+email+"','"+password+"')";

    conexion.query(registro, function (error) {
        if (error) {
          throw error;
        } else {
          console.log("Datos almacenados correctamente")
          console.log(req.body);
        }
      });
});

app.listen(3000,(req,res)=>{
    console.log("servidor escuchando el puerto http://localhost:3000");
});