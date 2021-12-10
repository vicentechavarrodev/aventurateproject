import React, { Component } from 'react';
import './style.css';
import {  Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lblTermino: '',
            lblPolitica: '',
        };

   
    }

    componentDidMount() {
       
    }

    render() {
      
        return (
            <div >
                <Row className="mr-0 ">
                    <Col sm={12} md={8} className="pr-0">
                        <ul className="footernav">

                            <li>   <Link to="/terminos_condiciones"  >{this.props.t('Index.TerminoCondiciones')}</Link></li>
                            <li> <Link to="/politicas_privacidad"  >{this.props.t('Index.PoliticasPrivacidad')}</Link> </li>

                        </ul>

                    </Col>
                    <Col sm={12} md={4} className="justify-content-center footer">
                        <h6 >Aventurate |  Copyright &reg;  {(new Date().getFullYear())}</h6>

                    </Col>
               

                </Row>
            </div>

        );
    }
}

export default withTranslation('common')(Footer);