
var firebaseConfig = {
  // acá va la configuración de tu proyecto mano
  apiKey: "AIzaSyBjncC__n4_Iq2A2KGkdhDb47-G858AI7w",
  authDomain: "segundointento-b3723.firebaseapp.com",
  databaseURL: "https://segundointento-b3723-default-rtdb.firebaseio.com",
  projectId: "segundointento-b3723",
  storageBucket: "segundointento-b3723.appspot.com",
  messagingSenderId: "45404261080",
  appId: "1:45404261080:web:61951b93692f96aa9165ad"
};

firebase.initializeApp(firebaseConfig);

//Persistencia de datos de firebase , que ladilla bro
firebase.database().ref().on('value', function() {});


let db = firebase.database();
let estudiantesRef = db.ref("estudiantes");


  const studentForm = document.getElementById('studentForm');
  const nameInput = document.getElementById('nameInput');
  const lastNameInput = document.getElementById('lastNameInput');
  const emailInput = document.getElementById('emailInput');
  const cedulaInput = document.getElementById('cedulaInput');
  const studentListForm = document.getElementById('studentList');

 ///////////////////////////////////////////////////////////
  if (!navigator.onLine) {
  firebase.database().goOffline();
  alert('Estás trabajando de manera local sin conexión a Internet. Los cambios se almacenarán localmente y se sincronizarán cuando haya conexión nuevamente.');
}
///////////////////////////////////////////////////////////

   

let contador = parseInt(localStorage.getItem('contador') || '0'); // Obtener el valor del contador y convertirlo a número
  // Función para agregar un estudiante
 function addStudent(event) {
  const name = nameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const cedula = cedulaInput.value; 

  const studentData = {
    nombre: name,
    apellido: lastName,
    correo: email,
    cedula: cedula
  };

  if (navigator.onLine) {
    event.preventDefault();
    alert(name, lastName, email, cedula, 'datos del formulario recuperados con éxito según Randy');

    // Supuestamente este es el método para agregar un registro según Randy
    let estudentInsert = estudiantesRef.push(studentData);
  } else {
    event.preventDefault();

    contador++; // Incrementar el contador
    localStorage.setItem('contador', contador); // Almacenar el nuevo valor del contador en el localStorage

    localStorage.setItem(contador.toString(), JSON.stringify(studentData)); // Almacenar los datos del estudiante usando el contador como clave
    mostrarOffline(); // Actualizar la interfaz de usuario
  }
}

///////////////////////////////////////////////////////////
//funcion para mostrar estudiantes
function mostrar(){
   
    // Referencia a la collección de estudiantes
const estudiantesRef = db.ref("estudiantes");

  while (studentListForm.firstChild) {
    studentListForm.removeChild(studentListForm.firstChild);
  }
// Detectar cambios en los datos
estudiantesRef.on("value", function(snapshot) {
studentListForm.innerHTML = "";
  // snapshot es los datos actuales
  snapshot.forEach(function(child){
    
    // child son los hijos (cada registro)
    let estudiante = child.val();
    
    let formulario = document.querySelector(`form[data-id="${child.key}"]`);
 
    if (!formulario){

    let form = document.createElement('form');
    form.classList.add('form');
    form.setAttribute('data-id',child.key);
    let fragmento = document.createDocumentFragment();
    

    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');
    let div5 = document.createElement('div');

    let label1 = document.createElement('label');
    let label2 = document.createElement('label');
    let label3 = document.createElement('label');
    let label4 = document.createElement('label');

    let input1 = document.createElement('input');
    let input2 = document.createElement('input');
    let input3 = document.createElement('input');
    let input4 = document.createElement('input');

    let buttonUpdate = document.createElement('button');
    let buttonDelete = document.createElement('input');

    buttonDelete.type='button';

    buttonUpdate.textContent='actualizar';
    buttonDelete.value='Eliminar';

    buttonUpdate.style='cursor:pointer';
    buttonDelete.style='margin-left:.5rem;cursor:pointer';

    label1.innerHTML=`Nombre`;
    label2.innerHTML=`Apellido`;
    label3.innerHTML=`Correo`;
    label4.innerHTML=`Cedula`;

    input1.type='text';
    input2.type='text';
    input3.type='text';
    input4.type='number';

    input1.style='border:none';
    input2.style='border:none';
    input3.style='border:none';
    input4.style='border:none';

    input1.value=`${estudiante.nombre}`;
    input2.value=`${estudiante.apellido}`;
    input3.value=`${estudiante.correo}`;
    input4.value=`${estudiante.cedula}`;

    // Agregar el atributo data con el id del estudiante (muy util chaval)

    input1.setAttribute('data-id',child.key);

    //Agregar name a cada input
    // Establecer el atributo name
    input1.setAttribute('name', 'nombre');
    input2.setAttribute('name', 'apellido');
    input3.setAttribute('name', 'correo');
    input4.setAttribute('name', 'cedula');
    

    div1.classList.add('column');
    div2.classList.add('column');
    div3.classList.add('column');
    div4.classList.add('column');
    div5.classList.add('column');

    div1.append(label1);
    div1.append(input1);
    
    div2.append(label2);
    div2.append(input2);

    div3.append(label3);
    div3.append(input3);

    div4.append(label4);
    div4.append(input4);

    div5.append(buttonUpdate);
    div5.append(buttonDelete);

    
    form.append(div1);
    form.append(div2);
    form.append(div3);
    form.append(div4);
    form.append(div5);
    
    studentListForm.append(form);
    // Aquí puedes mostrar el estudiante en pantalla
    console.log(estudiante,"estudiante"); 

      //////////////////////////////////////////////////////////////
    form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const id = input1.getAttribute('data-id');
   
    const formData = new FormData(form);

    const nombre = formData.get('nombre');
    const apellido = formData.get('apellido');
    const correo = formData.get('correo');
    const cedula = formData.get('cedula');
    
    const datos={
      nombre,
      apellido,
      correo,
      cedula
    }

      let ref = db.ref("estudiantes/" + id);
      await ref.update(datos);
      alert('¡¡datos actualizados!!');
      
     });
    //////////////////////////////////////////////////////
    buttonDelete.addEventListener('click', () => {

    let id = input1.getAttribute('data-id');
  
    // Referencia al registro
    let ref = db.ref(`estudiantes/${id}`);

    ref.remove()
    .then(() => {

      alert("Eliminado exitosamente!");
    })
    .catch((error) => {
      formulario.remove();
      console.log(error); 
    });

    });
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    }else{
       const inputs = formulario.getElementsByTagName("input");
        inputs[0].value = estudiante.nombre;
        inputs[1].value = estudiante.apellido;
        inputs[2].value = estudiante.correo;
        inputs[3].value = estudiante.cedula;
    }

  });

});
   
}
/////////////////////////////////////////////////////////////////
function mostrarOffline(){
  
  let studentList = document.getElementById('studentList');
  studentList.style='display:none';
  const sDiv = document.getElementById('segundoDiv');
  sDiv.style='display:flex;flex-direction:column;justify-content:center;align-items:center';
  sDiv.innerHTML = '';
    let vector=[];
/////////////////////////////////////////////////////////////////
    for (let i = 1; i <= localStorage.length -1; i++) {

    vector[i] = JSON.parse(localStorage.getItem(i.toString()));

    console.log(`Estudiante del vector en la posicion : ${vector[i].nombre}`);
    
    let formula = document.createElement('form');
    formula.classList.add('form');
    formula.setAttribute('data-id', i); // Agregar atributo data-id al formulario

    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');

    let label1 = document.createElement('label');
    let label2 = document.createElement('label');
    let label3 = document.createElement('label');
    let label4 = document.createElement('label');

    let input1 = document.createElement('input');
    let input2 = document.createElement('input');
    let input3 = document.createElement('input');
    let input4 = document.createElement('input');

    let buttonUpdate = document.createElement('button');
    let buttonDelete = document.createElement('input');
 
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$//+//
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    buttonUpdate.addEventListener('click', () => {
      // Obtener la referencia del registro desde localStorage
      const referencia = i.toString();
      const registro = JSON.parse(localStorage.getItem(referencia));

      // Actualizar los valores del registro
      registro.nombre = input1.value;
      registro.apellido = input2.value;
      registro.correo = input3.value;
      registro.cedula = input4.value;

      // Guardar el registro actualizado en localStorage
      localStorage.setItem(referencia, JSON.stringify(registro));
      alert('El estudiante ha sido actualizado.');

      // Puedes realizar aquí cualquier otra acción necesaria después de la actualización
    });
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    //<[*_*]>-----------------Tu papa soy yo----------------<[*_*]>
    ///////////////////////////////////////////////////////////////
  
    ////////////////////////////////////////////////////////////////

    buttonDelete.type='button';

    buttonUpdate.textContent='actualizar';
    buttonDelete.value='Eliminar';

    buttonUpdate.style='cursor:pointer';
    buttonDelete.style='margin-left:.5rem;cursor:pointer';

    label1.innerHTML=`Nombre`;
    label2.innerHTML=`Apellido`;
    label3.innerHTML=`Correo`;
    label4.innerHTML=`Cedula`;

    input1.type='text';
    input2.type='text';
    input3.type='email';
    input4.type='number';

    input1.style='border:none';
    input2.style='border:none';
    input3.style='border:none';
    input4.style='border:none';

    input1.value=`${vector[i].nombre}`;
    input2.value=`${vector[i].apellido}`;
    input3.value=`${vector[i].correo}`;
    input4.value=`${vector[i].cedula}`;


    // Agregar name a cada input
    // Establecer el atributo name
    input1.setAttribute('name', 'nombre');
    input2.setAttribute('name', 'apellido');
    input3.setAttribute('name', 'correo');
    input4.setAttribute('name', 'cedula');
    

    div1.classList.add('column');
    div2.classList.add('column');
    div3.classList.add('column');
    div4.classList.add('column');

    div1.append(label1);
    div1.append(input1);
    
    div2.append(label2);
    div2.append(input2);

    div3.append(label3);
    div3.append(input3);

    div4.append(label4);
    div4.append(input4);
    
    formula.append(div1);
    formula.append(div2);
    formula.append(div3);
    formula.append(div4);
    formula.append(buttonUpdate);
    formula.append(buttonDelete);
    
    sDiv.append(formula);

    }//fin bucle for
      // Agregar event listener para el botón "Eliminar" fuera del bucle
  sDiv.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' && e.target.type === 'button' && e.target.value === 'Eliminar') {
      let form = e.target.closest('.form'); // Obtener el formulario padre
      let id = form.getAttribute('data-id'); // Obtener el atributo data-id del formulario

      // Eliminar el registro de localStorage
      localStorage.removeItem(id);

      alert('El estudiante ha sido eliminado.');

      // Eliminar el formulario actual del DOM
      form.remove();
    }
  });

///////////////////////
}
/////////////////////////////////////////////////////////  
/////////////////////////////////////
////////////////////////////////////
///////////////////////////////////////////////////////
studentForm.addEventListener('submit', addStudent);
  
window.addEventListener('storage', (e) => {
  if (e.key.startsWith('localStorage')) {
    mostrarOffline();
  }
});
///////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', () => {
  if (navigator.onLine) {
    mostrar();
  } else {
    mostrarOffline();
  }
});