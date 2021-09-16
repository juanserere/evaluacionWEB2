let uri="https://accounts.spotify.com/api/token";

let dato1="grant_type=client_credentials";
let dato2="client_id=e4cb18f041e248668049c93bc957c270";
let dato3="client_secret=bbe79758e44747c6a1aa59b6eddddc04";

let parametrosPOST={
    method:"POST",
    headers:{
        "Content-Type": 'application/x-www-form-urlencoded'

    },
    body:dato1+"&"+dato2+"&"+dato3
}

fetch(uri,parametrosPOST)
.then(function(respuesta){
    return(respuesta.json())
})
.then(function(respuesta){
    console.log(respuesta)
    generarToken(respuesta)
})
.catch(function(respuesta){
    console.log(respuesta)
    
})

function generarToken(respuesta){

    const token=respuesta.token_type+" "+respuesta.access_token;
    console.log(token)
    buscarCanciones(token)


}

function buscarCanciones(token){  

    let uri="https://api.spotify.com/v1/artists/0k17h0D3J5VfsdmQ1iZtE9/top-tracks?market=us";

    let parametrosEnvio={
        method:"GET",
        headers:{
            Authorization:token
        }
    }
    fetch(uri,parametrosEnvio)
        .then(function(respuesta){
            return(respuesta.json())
        })
        .then(function(respuesta){
            console.log(respuesta)
            pintarDatos(respuesta)
        })
        .catch(function(error){
            console.log(error)
        })

}

function pintarDatos(datos){

    let fila=document.getElementById("fila")

    datos.tracks.forEach(function(cancion){
        console.log(cancion.name)
        console.log(cancion.preview_url)
        console.log(cancion.album.images[0].url)

        //crear un div con js
        let columna=document.createElement("div")
        columna.classList.add("col")

        //creo un div que sirve de tarjeta
        let tarjeta=document.createElement("div")
        tarjeta.classList.add("card")
        tarjeta.classList.add("h-100")

        //crear cuerpo de la tarjeta c
        let cuerpo=document.createElement("div")
        cuerpo.classList.add("card-body")
        //crear el nombre de la canción
        let nombre=document.createElement("h5")
        nombre.textContent=cancion.name
        nombre.classList.add("text-center")

        //popularidad
        let popularidad=document.createElement("h6")
        popularidad.textContent="popularidad: "+cancion.popularity
        popularidad.classList.add("text-center")


        //creo una img de tarjeta
        let imagen=document.createElement("img")
        imagen.classList.add("card-img-top")
        imagen.src=cancion.album.images[0].url

        //creo una etiquetra de audio
        let audio=document.createElement("audio")
        audio.classList.add("w-100")
        audio.classList.add("mt-5")
        audio.setAttribute("controls","controls")
        audio.src=cancion.preview_url

        //PADRES E HIJOS
        tarjeta.appendChild(cuerpo)
        cuerpo.appendChild(imagen)
        cuerpo.appendChild(audio)
        cuerpo.appendChild(nombre)
        cuerpo.appendChild(popularidad)
        columna.appendChild(tarjeta)
        fila.appendChild(columna)



        

    })

}