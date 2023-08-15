import { Col, Row } from 'antd';
import Button from '../../../components/Button';
import './About.scss';
const About = () => {
  return (
    <div className='about spacing-h-sm'>
      <div className='container about__intro text-center bg-slate-300 py-4  '>
        <h2 className='about__title '>About Us Page</h2>
        <p className='mt-8'>Some text about who we are and what we do.</p>
        <p>
          We are education organizations for helping students more grow up. With technology and modern methods, we
          confidently are able to create more things for the worlds
        </p>
      </div>
      <h3 className='about__sub-title mt-8' style={{ textAlign: 'center' }}>
        Our Team
      </h3>
      <div className='about__wrapper container '>
        <Row gutter={16}>
          <Col lg={8}>
            <div className='column text-center about__member-item bg-slate-200 '>
              <div className='card'>
                <img
                  src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
                  alt='Jane'
                  style={{ width: '100%' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc'>
                  <h2 className='mb-4 about__member-name text-3xl'>Jane Doe</h2>
                  <p className='mb-4 title about__member-title'>CEO &amp; Founder</p>
                  <p className='mb-4 about__member-info-desc'>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p className='mb-4 about__member-email'>jane@example.com</p>
                  <p>
                    <Button className='button btn btn-primary btn-sm'>Contact</Button>
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <div className='column text-center about__member-item bg-slate-200'>
              <div className='card'>
                <img
                  src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
                  alt='Mike'
                  style={{ width: '100%' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc'>
                  <h2 className='mb-4 about__member-name text-3xl'>Mike Ross</h2>
                  <p className='mb-4 title about__member-title'>Art Director</p>
                  <p className='mb-4 about__member-info-desc'>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p className='mb-4 about__member-email'>mike@example.com</p>
                  <p>
                    <Button className='button btn btn-primary btn-sm'>Contact</Button>
                  </p>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={8}>
            <div className='column text-center about__member-item bg-slate-200'>
              <div className='card'>
                <img
                  src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
                  alt='Mike'
                  style={{ width: '100%' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc'>
                  <h2 className='mb-4 about__member-name text-3xl'>John Doe</h2>
                  <p className='mb-4 title about__member-title'>Designer</p>
                  <p className='mb-4 about__member-info-desc'>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p className='mb-4 about__member-email'>john@example.com</p>
                  <p>
                    <Button className='button btn btn-primary btn-sm'>Contact</Button>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default About;
