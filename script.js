fetch("https://fake-api-vq1l.onrender.com/posts", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJlbWFpbCI6ImxhdXJhLnF1aW5hQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY3MjEyNTAsImV4cCI6MTc0NDAwMTI1MH0.7oVmPZW4gE09vhQKVvWySb_TOW3vr6NHghs-ytjLzJs"
  }
})
.then(response => response.json())
.then(data => {
  const list = document.getElementById("productos");
  data.forEach(product => {
    const images = JSON.parse(product.images);
    const myhtml = document.createRange().createContextualFragment(` 
                    <div class="container">
                        <div class="card">
                          <div class="imgBx">
                            <img src="${images[0]}" class="card-img-top" alt="...">
                          </div>
                          <div class="card-body">
                            <h3 class="card-title">${product.title}</h3>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">$ ${product.value}</p>
                            <button onclick="editar(${product.id})" class="btn-warning"> <img src="imagenes/pencil-square.svg" alt="editar"> Edit</button>
                            <button onclick="deletePost(${product.id})" class="btn-danger"> <img src="imagenes/trash3-fill.svg" alt="eliminar"> Delete</button>
                          </div>
                        </div>
                      </div>
    `);
    list.append(myhtml); 
  })
});

function sendForm() {
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const value = document.getElementById("value");
    const image = document.getElementById("image");
    const editId = document.getElementById("editId").value; // Obtener el id de edición

    const body = {
        title: title.value,
        description: description.value,
        value: value.value,
        images: [image.value]
    };

    const method = editId ? "PATCH" : "POST"; // Utilizar PATCH si se edita, en caso contrario POST
    const url = editId ? `https://fake-api-vq1l.onrender.com/posts/${editId}` : "https://fake-api-vq1l.onrender.com/posts";

    fetch(url, {
        method: method,
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJlbWFpbCI6ImxhdXJhLnF1aW5hQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY3MjEyNTAsImV4cCI6MTc0NDAwMTI1MH0.7oVmPZW4gE09vhQKVvWySb_TOW3vr6NHghs-ytjLzJs",
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
        console.log("respuesta de la api", res);
        title.value = "";
        description.value = "";
        value.value = "";
        image.value = "";
        document.getElementById("editId").value = ""; // Restablecer el Id de edición
        location.reload();
    });
}

function deletePost(id) {
    fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJlbWFpbCI6ImxhdXJhLnF1aW5hQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY3MjEyNTAsImV4cCI6MTc0NDAwMTI1MH0.7oVmPZW4gE09vhQKVvWySb_TOW3vr6NHghs-ytjLzJs",
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log("respuesta de la api", res);
        location.reload();
    });
}

function editar(id) {
    fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJlbWFpbCI6ImxhdXJhLnF1aW5hQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY3MjEyNTAsImV4cCI6MTc0NDAwMTI1MH0.7oVmPZW4gE09vhQKVvWySb_TOW3vr6NHghs-ytjLzJs"
        }
    })
    .then(response => response.json())
    .then(product => {
        document.getElementById("title").value = product.title;
        document.getElementById("description").value = product.description;
        document.getElementById("value").value = product.value;
        document.getElementById("image").value = JSON.parse(product.images)[0]; // Suponiendo que la primera imagen es la que hay que editar
        document.getElementById("editId").value = product.id; // Establecer el id de edición
    });
}

