import Navbar from './components/Header/Navbar';
import { MyRouter } from './router/MyRouter';
import './assets/styles/scss/index.scss';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
      <Navbar />
      <MyRouter />
      <Footer />
    </>
  );
}

export default App;
