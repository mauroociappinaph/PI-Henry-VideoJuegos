import React from "react"


export default function Card ({name , background_image, genres}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <img src = {background_image} alt="imagen no disponible" width="200px" height="250px" />
        </div>
    )
}
