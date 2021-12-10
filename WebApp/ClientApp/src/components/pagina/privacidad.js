import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Carousel, Row, Col, Image } from 'react-bootstrap';
import Footer from '../footer';
import Header from '../header';
import { loader } from '../helpers/loader';
import { connect } from 'react-redux';
import { HeaderActions } from '../header/actions';
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Parser from 'html-react-parser';

class Privacidad extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        loader.hide();
        window.scrollTo(0, 0);
    }

    volver() {
        this.props.history.push("/");
        localStorage.setItem('item_menu_header', 'inicio');
        this.props.seleccionar_id_item('inicio');
    }

    render() {

        return (

            <div className="container-menu ">
                <div id="content" >
                    <div className="table-responsive">
                        <Header iconMenuVisible="1" align="text-right" />
                        <div className="jumbotron">

                            <ListGroup className="list-group-flush  ">


                                <ListGroupItem>
                                    <Row>
                                        <Col className="justify-content-center pr-0" sm={12} md={8} >
                                            <ListGroup className="list-group-flush  ">
                                                <ListGroupItem>
                                                    <h5><b>{Parser(this.props.t('Privacidad.Titulo1'))}</b> </h5>
                                                    <p className="text-justify "><h6>{Parser(this.props.t('Privacidad.Descripcion1'))}</h6></p>

                                                    <h5><b>{Parser(this.props.t('Privacidad.Titulo2'))}</b></h5>
                                                    <p className="text-justify "><h6>{Parser(this.props.t('Privacidad.Descripcion2'))}</h6></p>

                                                    <h5><b>{Parser(this.props.t('Privacidad.Titulo3')) }</b></h5>
                                                    <p className="text-justify "><h6>{Parser(this.props.t('Privacidad.Descripcion3'))}</h6></p>

                                                    <p className="text-justify "><h6>Aventúrate {Parser(this.props.t('Privacidad.Descripcion4'))}</h6></p>
                                                    <h5><b>{Parser(this.props.t('Privacidad.Titulo5'))}</b> </h5>

                                                    <p className="text-justify "><h6>{Parser(this.props.t('Privacidad.Descripcion5'))}</h6></p>
                                                  
                                                    <h5><b>{Parser(this.props.t('Privacidad.Titulo6'))}</b> </h5>
                                                    <p className="text-justify "><h6>{Parser(this.props.t('Privacidad.Descripcion6'))}</h6></p>
                                                    <h5><b>{this.props.t('Privacidad.Titulo7')}</b> </h5>
                                                    <p className="text-justify "><h6>{Parser(this.props.t('Privacidad.Descripcion7'))}</h6></p>
                                                      

                                                </ListGroupItem>
                                               

                                            </ListGroup>

                                        </Col>
                                        <Col sm={12} md={4} className="justify-content-center ">
                                            <ListGroup variant="flush">
                                                <ListGroup.Item><h5><u>{this.props.t('Generales.Siguenos')}</u></h5></ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row className="justify-content-md-center ">
                                                        <Col sm={12} md={2} ><h4><i className="fa fa-facebook" aria-hidden="true" /></h4></Col>
                                                        <Col sm={12} md={10} ><a target="_blank" href="https://www.facebook.com/coaventurate/"> Coaventurate</a></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row className="justify-content-md-center ">
                                                        <Col sm={12} md={2} ><h4><i className="fa fa-instagram" aria-hidden="true" /></h4></Col>
                                                        <Col sm={12} md={10} ><a target="_blank" href="https://www.instagram.com/coaventurate/"> Coaventurate</a></Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    <Row className="justify-content-md-center ">
                                                        <Col sm={12} md={2} ><h4><i className="fa fa-twitter" aria-hidden="true" /></h4></Col>
                                                        <Col sm={12} md={10} ><a target="_blank" href="https://www.twitter.com/coaventurate/"> Coaventurate</a></Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    <Row className="justify-content-md-center ">
                                                        <Col sm={12} md={2} ><h4><i className="fa fa-envelope" aria-hidden="true" /></h4></Col>
                                                        <Col sm={12} md={10} > contacto@coaventurate.com</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row className="justify-content-md-center ">
                                                        <button className="btn btn-default btn-3d-style  btn-block" onClick={() => this.volver()} >{this.props.t('Generales.IrMapa')}</button>
                                                    </Row>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </ListGroupItem>


                            </ListGroup>


                        </div>
                    </div>


                </div>
                <Footer />
            </div>

        );
    }
}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {

    const { id_item_menu } = state.HeaderReducer;

    return {
        id_item_menu
    };

};

const mapDispatchToProps = {

    seleccionar_id_item: HeaderActions.seleccionar_id_item,

};


const compo = withTranslation('common')(Privacidad)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(compo));