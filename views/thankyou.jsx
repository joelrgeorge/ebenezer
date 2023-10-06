import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  const thankYouStyles = {
    textAlign: 'center',
    paddingTop: '5rem',
  };

  const iconStyles = {
    fontSize: '4rem',
    color: 'green',
  };

  const headingStyles = {
    marginBottom: '1.5rem',
    fontWeight: 'bold',
    fontSize: '2.5rem',
  };

  const messageStyles = {
    marginBottom: '2rem',
    fontSize: '1.8rem',
  };

  const buttonStyles = {
    width: '25%',
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" style={thankYouStyles}>
            <div className="thank__you">
              <span>
                <i className="ri-checkbox-circle-line" style={iconStyles}></i>
                <h1 className="mb-3" style={headingStyles}>
                  Thank You
                </h1>
                <h3 className="mb-4" style={messageStyles}>
                  Thank You for enquiring with us..<br />We will reach back to you shortly in an hour
                </h3>
                <Button className="btn primary__btn" style={buttonStyles}>
                  <a href='https://www.ebenezerservicedapartments.com' target='_blank' rel='noopener noreferrer'>
                    Home
                  </a>
                </Button>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;