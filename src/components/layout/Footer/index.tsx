import { Col, Row } from 'antd';
import './Footer.scss';
const Footer = () => {
  return (
    <div className='footer spacing-h-md'>
      <div className='container'>
        <Row className='footer__row'>
          <Col md={8}>
            <div className='footer__col'>
              <div className='footer__logo'>
                <img
                  src='https://cdn.mycourse.app/images/site-templates/5eacfe0d804d3c71aef6fe9da29f202b.png'
                  alt=''
                  className='footer__logo-img'
                />
              </div>
              <p className='footer__text'>
                We are an online educational platform that helps professionals and aspiring individuals to succeed in
                their goals.
              </p>
            </div>
          </Col>

          <Col md={8}>
            <div className='footer__col'>
              <h3 className='footer__title'>Featured links</h3>
              <Row>
                <Col md={12}>
                  <ul className='featured-list'>
                    <li className='featured-list__item'>
                      <a className='featured-list__item-link' href='#'>
                        Home
                      </a>
                    </li>
                    <li className='featured-list__item'>
                      <a className='featured-list__item-link' href='#'>
                        Courses
                      </a>
                    </li>
                    <li className='featured-list__item'>
                      <a className='featured-list__item-link' href='#'>
                        About Us
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col md={12}>
                  <ul className='featured-list'>
                    <li className='featured-list__item'>
                      <a className='featured-list__item-link' href='#'>
                        Contact Us
                      </a>
                    </li>
                    <li className='featured-list__item'>
                      <a className='featured-list__item-link' href='#'>
                        Term & Conditions
                      </a>
                    </li>
                    <li className='featured-list__item'>
                      <a className='featured-list__item-link' href='#'>
                        Cookie Policy
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>

          <Col md={8}>
            <div className='footer__col'>
              <h3 className='footer__title'>Connect with us</h3>
              <div className='social-list'>
                <button title='facebook' className='social-btn'>
                  <i className='social-icon fa-brands fa-facebook'></i>
                </button>
                <button title='twitter' className='social-btn'>
                  <i className='social-icon fa-brands fa-twitter'></i>
                </button>
                <button title='social' className='social-btn'>
                  <i className='social-icon fa-brands fa-twitter'></i>
                </button>
                <button title='facebook' className='social-btn'>
                  <i className='social-icon fa-brands fa-twitter'></i>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
