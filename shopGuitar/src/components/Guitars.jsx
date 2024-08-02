import { useMemo, useState } from "react";
import Guitar from "./Guitar";
import { db } from "../data/db"

export default function Guitars() {
    const [data] = useState(db)
    const [cart,setCart] = useState([])

    const isEmpty = useMemo(()=> cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total,item)=>total + (item.quantity * item.price) , 0),[cart])


    function increaseQuantity(guitar) {
        const itemExists = cart.findIndex((item)=>item.id === guitar.id)
        const cartCopy =[...cart]
        if (cartCopy[itemExists].quantity < 5) {
           cartCopy[itemExists].quantity++ 
        }
        setCart(cartCopy)
    }

    function decreaseQuantity(guitar) {
        const itemExists = cart.findIndex((item)=>item.id === guitar.id)
        const cartCopy =[...cart]

        if (cartCopy[itemExists].quantity > 1) {
           cartCopy[itemExists].quantity-- 
        }
        
        setCart(cartCopy)
    }

    function removeItem(guitar) {
        setCart(cart.filter((item)=>item.id != guitar.id))
    }

    return(
        <main>
            <h2 className="text-center py-4 h1">Nuestro catálogo</h2>
            <section className="guitars">
                {data.map((guitar)=>(
                    <Guitar
                        key={guitar.id} 
                        guitar={guitar}
                        setCart={setCart}
                        cart={cart}
                    /> 
                ))}
            </section>
            <section className="carrito">
                <div className="iconoContainer">
                    <img src="/img/carrito.png" alt="Comprar"/>
                </div>
                
                <div className="infoCompra">
                    { isEmpty ? 
                        <p>Ningún artículo en el carrito</p>
                    :  
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Imagen</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {cart.map((guitar)=>(
                                            <tr key={guitar.id}>
                                                <td className="w-25">
                                                    <img className="img-fluid w-75" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                </td>
                                                <td>{guitar.name}</td>
                                                <td className="fw-bold">        
                                                    {guitar.price}€
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={()=>decreaseQuantity(guitar)}
                                                    >
                                                        -
                                                    </button>
                                                        {guitar.quantity}
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={()=>increaseQuantity(guitar)}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        type="button"
                                                        onClick={()=>removeItem(guitar)}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <p className="text-end">Total pagar: <span className="fw-bold"></span>{cartTotal}€</p>
                        </>
                    } 
                </div>
            </section>
        </main>
    )
}