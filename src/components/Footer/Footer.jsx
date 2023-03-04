import React from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

const Footer = () => {

  const { text } = useLanguage();

  return (
    <>
      <div className='footer'>
        <div className="footer__contact">
          <p className="footer__contact--title">{text.footer.contact.title.toUpperCase()}</p>
          <div className="footer__contact--data-phone">
            <FontAwesomeIcon icon={faMobileScreen} />
            <p>{text.footer.contact.phone}</p>
          </div>
          <div className="footer__contact--data-email">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>{text.footer.contact.mail}</p>
          </div>
          <p className="footer__contact--payment-title">{text.footer.pay.title.toUpperCase()}</p>
          <div className="footer__cards"></div>
          <p className='footer__contact--opinions-title'>{text.footer.opinions.title.toUpperCase()}</p>
          <div className="footer__companys"></div>
        </div>
        <div className="footer__utils">
          <div className="section">
            <p className='footer__utils--title'>{text.footer.utils.title}</p>
            <p className='footer__utils--link'>{text.footer.utils.contact}</p>
            <p className='footer__utils--link'>{text.footer.utils.about}</p>
            <p className='footer__utils--link'>{text.footer.utils.faq}</p>
            <p className='footer__utils--link'>{text.footer.utils.pay}</p>
            <p className='footer__utils--link'>{text.footer.utils.warranty}</p>
          </div>
          <div className="section">
            <p className='footer__utils--title'>{text.footer.know.title}</p>
            <p className='footer__utils--link'>{text.footer.know.history}</p>
            <p className='footer__utils--link'>{text.footer.know.color}</p>
            <p className='footer__utils--link'>{text.footer.know.models}</p>
            <p className='footer__utils--link'>{text.footer.know.counter}</p>
          </div>
        </div>
        <div className="footer__shipments">
          <div className="section">
            <p className='footer__utils--title'>{text.footer.shipments.title}</p>
            <p className='footer__utils--link'>{text.footer.shipments.shipment}</p>
            <p className='footer__utils--link'>{text.footer.shipments.time}</p>
            <p className='footer__utils--link'>{text.footer.shipments.free}</p>
            <p className='footer__utils--link'>{text.footer.shipments.change}</p>
          </div>
        </div>
      </div>
      <div className='footer__privacy'>
        <p className='footer__privacy--title'>{text.footer.privacy.title}</p>
        <div className="footer__privacy--terms">
          <p>{text.footer.privacy.conditions.toUpperCase()}</p>
          <p>{text.footer.privacy.politic.toUpperCase()}</p>
        </div>
      </div>
    </>
  )
}

export default Footer;