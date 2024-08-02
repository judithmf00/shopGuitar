import { useState } from "react"

export default function Guitar({guitar,setCart,cart}) {
    const{id,name,image,description,price} = guitar
    const [comprado,setComprado] = useState(false)

    function addCart(id) {
        //Marcar que esta comprado para cambiar de icono
        setComprado(true)

        // Comprobar que el elemento no esta en el Array, si está, agragamos uno a la cantidad
        const itemExists = cart.findIndex((guitar)=>guitar.id === id)

        //La guitarra existe
        if (itemExists != -1) {
            const copiaCart =[...cart]
            copiaCart[itemExists].quantity++
            setCart(copiaCart)
        //No existe
        }else{
            guitar.quantity=1
            setCart([...cart,guitar]) // Crea un nuevo array que contiene todos los elementos del array cart original, seguido por el nuevo elemento guitar 
        }

        //Grabar en el localStorage el carrito
        
    }

    return(
        <article className="guitar d-flex flex-column ">
            <figure className="d-flex guitar-description m-0">
                <img src={`/img/${image}.jpg`} alt="guitarra" className="m-auto"/>
                <p className="description pt-5 text-center">
                    {description}  
                </p>
            </figure>
            
            <div className="guitar-info d-flex h-25 p-2 justify-content-between">
                <div className="mx-3">
                    <h4>{name}</h4>
                    <p className="price m-0">{price}€</p> 
                </div>
                
                <button onClick={()=>addCart(id)}>
                    {comprado ?
                            <img src="/img/add.png" alt="Agregar al carrito" />
                        :
                            <img src="/img/carrito.png" alt="Comprar" />
                    }
                </button>
            </div>
        </article>
    )
}