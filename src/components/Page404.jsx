import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import LanguageContext from '../context/LanguageContext';



const Page404 = () => {

  const { text } = useContext(LanguageContext);

  return (

    <div id="notfound">
      <div className="notfound">
        <div className="notfound__notfound-404">
          <h1>{text.error.ops} :(</h1>
        </div>
        <div className="notfound__content">
          <h2>404 - {text.error.notFound}</h2>
          <p>{text.error.dontExist}</p>
          <Link to='/'>{text.error.home}</Link>
        </div>
      </div>
    </div>
  )
}

export default Page404;