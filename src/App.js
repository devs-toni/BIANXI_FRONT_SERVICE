import Navbar from './components/Header/Navbar';
import { MyRouter } from './router/MyRouter';
import './assets/styles/scss/index.scss';
import Footer from './components/Footer/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';

function App() {

  return (
    <>
      {<LanguageProvider>
        <CartProvider>
          <Navbar />
          <MyRouter />
        </CartProvider>
        <Footer />
      </LanguageProvider>}
    </>
  );
}

export default App;
