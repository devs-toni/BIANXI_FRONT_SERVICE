import React, { useContext } from 'react'
import LanguageContext from '../../context/LanguageContext';

const Footer = () => {

  const { text } = useContext(LanguageContext);

  return (
    <div className='footer'>
      <div className="footer__contact">
        <p className="footer__contact--title">{text.footer.contact.title}</p>
        <div className="footer__contact--data-phone">
          <p>{text.footer.contact.phone}</p>
        </div>
        <div className="footer__contact--data-whatsapp">
          <p>{text.footer.contact.whatsapp}</p>
        </div>
        <div className="footer__contact--data-email">
          <p>{text.footer.contact.mail}</p>
        </div>
        <p className="footer__contact--payment-title">{text.footer.pay.title}</p>
        <div className="footer__cards"></div>
        <p className='footer__contact--opinions-title'>{text.footer.opinions.title}</p>
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
        <div className="section">
          <p className='footer__utils--title'>{text.footer.shipments.title}</p>
          <p className='footer__utils--link'>{text.footer.shipments.shipment}</p>
          <p className='footer__utils--link'>{text.footer.shipments.time}</p>
          <p className='footer__utils--link'>{text.footer.shipments.free}</p>
          <p className='footer__utils--link'>{text.footer.shipments.change}</p>
        </div>
      </div>
      <div className="footer__shipments"></div>
    </div>
  )
}

export default Footer;