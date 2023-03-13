import { Link } from 'react-router-dom';
import { useLanguage } from '../context/GlobalContext';

const Error404 = () => {

  const { text } = useLanguage();

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>:(</h1>
        </div>
        <div className="content">
          <h2>404 - {text.error.title}</h2>
          <p>{text.error.description}</p>
          <Link to='/'>{text.error.home}</Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;