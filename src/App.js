import './assets/styles/scss/index.scss';
import Layout from './components/Layout';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';

function App() {

  return (
    <>
      <LanguageProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </LanguageProvider>
    </>
  )
}

export default App;
