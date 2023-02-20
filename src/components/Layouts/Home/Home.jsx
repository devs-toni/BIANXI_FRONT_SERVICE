import React, { useContext, useState } from 'react'
import Image from './Image';
import Section from './Section';
import LanguageContext from '../../../context/LanguageContext';
import logoImage from '../../../assets/images/logo-image.png';
import Advantage from './Advantage';
import Footer from '../../Footer/Footer';
import { faTruckFast, faMoneyBill1Wave, faTriangleExclamation, faBicycle, faRoad, faMountain, faBolt, faCity } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  const { text } = useContext(LanguageContext);

  const initSections = [{
    name: text.header.road,
    icon: faRoad
  },
  {
    name: text.header.mtb,
    icon: faMountain,
  },
  {
    name: text.header.ebike,
    icon: faBolt,
  },
  {
    name: text.header.city,
    icon: faCity
  }];

  const initAdvantages = [{
    name: text.home.advantages.advantage1.name,
    icon: faTruckFast,
    description: text.home.advantages.advantage1.description
  },
  {
    name: text.home.advantages.advantage2,
    icon: faMoneyBill1Wave
  },
  {
    name: text.home.advantages.advantage3,
    icon: faTriangleExclamation,
  },
  {
    name: text.home.advantages.advantage4,
    icon: faBicycle

  }];

  const [sections, setSections] = useState(initSections);
  const [advantages, setAdvantages] = useState(initAdvantages);

  return (
    <div className='home'>
      <Image />
      <div className='sections'>
        {sections.map(({ name, icon }, index) => {
          return <Section key={index} name={name} icon={icon} />
        })}
      </div>
      <div className="home__creation">
        <div className="home__creation--logo">
          <img src={logoImage} alt="Logo" />
        </div>
        <div className="home__description">
          <div className="home__description--title">
            <p>ITALIAN CREATIVITY SINCE 1885</p>
          </div>
          <div className="home__description--text">
            <p>{text.home.creation.description1}</p>
            <p>{text.home.creation.description2}</p>
          </div>
        </div>
      </div>
      <div className='advantages'>
        {advantages.map(({ name, icon, description}, index) => {
          return <Advantage key={index} name={name} icon={icon} description={description} />
        })}
      </div>
    </div>
  )
}

export default Home;