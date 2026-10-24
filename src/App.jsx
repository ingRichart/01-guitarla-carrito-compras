import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {


  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  function addToCart(item) {
    const itemExists = cart.findIndex(cartItem => cartItem.id === item.id);

    //existe en el carrito
    if (itemExists >= 0) { 
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity += 1;
      setCart(updatedCart);
    }
    //no existe en el carrito
    else { 
      item.quantity = 1;
      setCart(cart => [...cart, item])
    }

    saveLocalStorage();
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity < MAX_QUANTITY) {
        return { ...guitar, quantity: guitar.quantity + 1 }
      }
      return guitar
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity > MIN_QUANTITY) {
        return { ...guitar, quantity: guitar.quantity - 1 }
      }
      return guitar
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(cart)
  }, [cart])

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {
              data.map((guitar) => (
                <Guitar 
                  key={guitar.id}
                  guitar = {guitar}
                  setCart = {setCart}
                  addToCart = {addToCart}
                  
                />
              ))
            }
              
          </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App