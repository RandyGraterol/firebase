const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
//recursos que se van a cargar en el server 
app.use(express.static(__dirname+'/static'));

//Configuración de las plantillas
app.set('view engine','ejs');//definimos el motor de plantilla con archivos ejs
app.set('views',path.join(__dirname,"./views"));//definimos la ruta del motor de plantilla

app.use(express.urlencoded({extended:false}));//permite recuperar los valores publicados en un request
app.use(express.json());

app.get('/',(req,res)=>{
res.render('index.ejs');
});

app.listen(port,()=>{
console.log(`Servidor escuchando en el puerto ${port}`);
})