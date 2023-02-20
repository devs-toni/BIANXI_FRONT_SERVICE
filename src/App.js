import './App.css';
import Navbar from './components/Header/Navbar';
import { MyRouter } from './router/MyRouter';
import './assets/styles/scss/index.scss';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className="App">
      <Navbar />
      <MyRouter />
      <Footer />
    </div>
  );
}

export default App;
