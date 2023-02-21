import Navbar from './components/Header/Navbar';
import { MyRouter } from './router/MyRouter';
import './assets/styles/scss/index.scss';
import Footer from './components/Footer/Footer';
import { LanguageProvider } from './context/LanguageContext';
import CartContext from './context/CartContext';
import { useContext, useEffect } from 'react';

function App() {

  const { setTotalProducts } = useContext(CartContext);

  useEffect(() => {
    // Get products saved in navigator
    const items = JSON.parse(localStorage.getItem('cart'));
    items ? setTotalProducts(items) : setTotalProducts([]);
  }, [setTotalProducts])


  return (
    <>
      {<LanguageProvider>
        <Navbar />
        <MyRouter />
        <Footer />
      </LanguageProvider>}
    </>
  );
}

export default App;
