import './App.css';
import Navbar from './components/Header/Navbar';
import Home from './components/Layouts/Home';
import { MyRouter } from './router/MyRouter';
import './assets/styles/scss/index.scss';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Home />
      <MyRouter />
    </div>
  );
}

export default App;
