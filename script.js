// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAhqSzGUzvtFzvaC3tCC-HTngfgDWStsO0",
    authDomain: "dijan-f575f.firebaseapp.com",
    projectId: "dijan-f575f",
    storageBucket: "dijan-f575f.appspot.com",
    messagingSenderId: "750051142877",
    appId: "1:750051142877:web:476dc02193149702303f34"
  };
       
        
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        
        const form = document.getElementById('Formulario con Crud'); 
        

        const userList = document.getElementById('user-list');

        db.collection('Bodega').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const userId = doc.id;
    
                const userElement = document.createElement('div');
                userElement.innerHTML = `<p>ID: ${userId}, Nombre: ${userData.Nombre}, Duracion: ${userData.Duracion}</p>`;
    
                userList.appendChild(userElement);
            });
        })
        .catch((error) => {
            console.error("Error getting Registro: ", error);
        });
        





// Evento de envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const Nombre = form.Nombre.value;
    const Duracion = form.Duracion.value;
    const docId = form['doc-id'].value;

        if (docId) {
            // Para Actualizar un documento existente
            db.collection('Anime').doc(docId).update({
                Nombre: Nombre,
                Duracion: parseInt(Duracion)
            })
            .then(() => {
                console.log("Se ha Actualizado Correctamente");
                form.reset();
                form['doc-id'].value = '';
            })
            .catch((error) => {
                console.error("Error Al Actualizar: ", error);
            });
        } else {
            // Crear nuevo documento
            db.collection('Anime').add({
                Nombre: Nombre,
                Duracion: parseInt(Duracion)
            })
            .then((docRef) => {
                console.log("ID del Documentos es: ", docRef.id);
                form.reset();
            })
            .catch((error) => {
                console.error("Error Al Agregar el Documento: ", error);
            });
        }
    });

// Funcion Para Editar
function loadDocument(docId, Nombre, Duracion) {
    form['doc-id'].value = docId;
    form.Nombre.value = Nombre;
    form.Duracion.value = Duracion;
}

const updateForm = document.getElementById('update-form');

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docId = updateForm.querySelector('#update-id').value;
    const newNombre = updateForm.querySelector('#update-Nombre').value;
    const newDuracion = parseInt(updateForm.querySelector('#update-Duracion').value);

    // Actualizar el documento en Firestore
    db.collection('Anime').doc(docId).update({
        Nombre: newNombre,
        Duracion: newDuracion
    })
    .then(() => {
        console.log("Se ha Actualizado Correctamente");
        updateForm.reset();
    })
    .catch((error) => {
        console.error("Error Al Actualizar: ", error);
    });
});

const deleteForm = document.getElementById('delete-form');

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docId = deleteForm.querySelector('#delete-id').value;

    // Eliminar el documento en Firestore
    db.collection('Anime').doc(docId).delete()
    .then(() => {
        console.log("Se ha Borrado Correctamente");
        deleteForm.reset();
    })
    .catch((error) => {
        console.error("Error Eliminando el Documento: ", error);
    });
});



       
        