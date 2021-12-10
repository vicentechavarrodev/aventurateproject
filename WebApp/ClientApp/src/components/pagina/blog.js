import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Col, Image } from 'react-bootstrap';
import Footer from '../footer';
import Header from '../header';
import { loader } from '../helpers/loader';
import { connect } from 'react-redux';
import { HeaderActions } from '../header/actions';
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Parser from 'html-react-parser';

class Blog extends Component {

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
                                        <Col sm={12} md={5} >

                                            <Image src="https://i.imgur.com/UvcCoFi.jpg" fluid />
                                        </Col>
                                        <Col sm={12} md={7} className="justify-content-center ">
                                            <h5>{Parser(this.props.t('Blog.Titulo1'))}</h5>
                                            <p className="text-justify ">
                                               <h6> {Parser(this.props.t('Blog.Descripcion1'))}</h6>
                                            </p>

                                        </Col>
                                    </Row>
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Row>
                                        <Col sm={12} md={7} className="justify-content-center ">
                                            <h5> {Parser(this.props.t('Blog.Titulo2'))}</h5>
                                            <p className="text-justify ">
                                                <h6> {Parser(this.props.t('Blog.Descripcion2'))}</h6>
                                            </p>
                                        </Col>
                                        <Col sm={12} md={5} >

                                            <Image src="https://i.imgur.com/BKsinds.jpg" fluid />
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


const compo = withTranslation('common')(Blog)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(compo));