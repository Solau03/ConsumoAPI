fetch("https://fake-api-vq1l.onrender.com/posts", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJlbWFpbCI6ImxhdXJhLnF1aW5hQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY3MjEyNTAsImV4cCI6MTc0NDAwMTI1MH0.7oVmPZW4gE09vhQKVvWySb_TOW3vr6NHghs-ytjLzJs"
  }
})
//pasarlo a json
.then(response => response.json())
//procesar la info
.then(data => {

  const list = document.getElementById("productos");


  data.forEach( product => {
    const images = JSON.parse(product.images)
    // const img = document.createElement("img");
    // img.src = images[0];
    const myhtml = document.createRange().createContextualFragment(` 
      <div class="container">
        <div class="card">
          <div class="imgBx">
            <img src="${images[0]}" class="card-img-top" alt="...">
          </div>
          <div class="card-body">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-text">${product.description}</p>
            <h6 class="card-text">${product.value}</h6>
            <a class="btn btn-warning">Edit</a>
            <a onclick="deletePost(${product.id})" class="btn btn-danger">Delete</a>
          </div>
        </div>
      </div>
    `);
    
    
    list.append(myhtml); 
  })
});


function sendForm(){
const title = document.getElementById("title");
const description = document.getElementById("description");
const value = document.getElementById("value");
const image = document.getElementById("image");
const body ={
  title: title.value,
  description: description.value,
  value: value.value,
  images: [image.value] 
}


fetch("https://fake-api-vq1l.onrender.com/posts", {
  method: "POST", 
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJlbWFpbCI6ImxhdXJhLnF1aW5hQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY3MjEyNTAsImV4cCI6MTc0NDAwMTI1MH0.7oVmPZW4gE09vhQKVvWySb_TOW3vr6NHghs-ytjLzJs",
    "Content-type": "application/json"
  },
  body: JSON.stringify(body)
})
.then( res => res.json())
.then( res => {
  console.log(
    "respuesta de la api", res
  )
  title.value = "";
  description.value = "";
  value.value = "";
  image.value = "";
  location.reload();
})

}

function deletePost(id){
fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
  method: "DELETE", 
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJlbWFpbCI6ImxhdXJhLnF1aW5hQHV0cC5lZHUuY28iLCJpYXQiOjE3MjY3MjEyNTAsImV4cCI6MTc0NDAwMTI1MH0.7oVmPZW4gE09vhQKVvWySb_TOW3vr6NHghs-ytjLzJs",
  },
})
.then( res => res.json())
.then( res => {
  console.log(
    "respuesta de la api", res
  )
  location.reload();
})
}

