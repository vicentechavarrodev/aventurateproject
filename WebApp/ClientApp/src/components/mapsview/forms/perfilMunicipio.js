import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import ReactDOM from "react-dom";
import '../style.css';
import { loader } from '../../helpers/loader';
import { ListGroup, ListGroupItem, Carousel, Row, Col, Image, Tabs, Tab } from 'react-bootstrap';
import { mapsActions } from '../actions';
import { Icon } from '@material-ui/core';
import Header from '../../header';
import Footer from '../../footer';
import { FacebookProvider, Comments, ShareButton, Like } from 'react-facebook';
import Parser from 'html-react-parser';
import {
    FacebookShareButton, FacebookIcon, WhatsappShareButton, FacebookMessengerShareButton, FacebookMessengerIcon, WhatsappIcon
} from "react-share";
import { withTranslation } from "react-i18next";
import { municipio } from '../../municipios/reducers';
import ImageGallery from 'react-image-gallery';

class PerfilMunicipio extends Component {


    constructor(props) {
        super(props);
        this.volver = this.volver.bind(this);


        this.state = {
            municipio: {
                Nombre: '',
                Clima: '',
                Descripcion: '',
                CategoriaSubcategoria: '',
                Activa: '',
                Latitud: 0,
                Longitud: 0,
                IdMunicipio: '',
                UrlImagen: '',
                ImagenesMunicipio: [],
                Tips: '',
                Festividades: '',
                QueHacer: '',
                EnFestividades: '',
                EnQueHacer: '',
                EnTips: '',
                EnDescripcion: ''
            },
            showVideo: {},
            images_gallery: [],
           
                
        }


    }

    volver() {
        this.props.history.goBack();
    }

    async componentDidMount() {
        loader.show();
        window.scrollTo(0, 0);
        let param = this.props.match.params.id;
        const id = param.substring(param.indexOf("_") + 1, param.length)
        await this.props.obtener_municipio(parseInt(id));
        this.obtener_img_gall();
        loader.hide();



    }



    static getDerivedStateFromProps(props, state) {

        return {
            municipio: props.municipio
        };

    }

    _toggleShowVideo(url) {
        this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
        this.setState({
            showVideo: this.state.showVideo
        });

        if (this.state.showVideo[url]) {
            if (this.state.showPlayButton) {
                this.setState({ showGalleryPlayButton: false });
            }

            if (this.state.showFullscreenButton) {
                this.setState({ showGalleryFullscreenButton: false });
            }
        }
    }

    _renderVideo(item) {
        return (
            <div>
                {
                    this.state.showVideo[item.embedUrl] ?
                        <div className='video-wrapper'>
                            <a
                                className='close-video'
                                onClick={this._toggleShowVideo.bind(this, item.embedUrl)}

                            >
                            </a>
                            <iframe
                                width='560'
                                height='315'
                                src={item.embedUrl}
                                frameBorder='0'
                                allowFullScreen
                            >
                            </iframe>
                        </div>
                        :
                        <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
                            <div className='play-button'></div>
                            <img className='image-gallery-image' src={item.original} />
                            {
                                item.description &&
                                <span
                                    className='image-gallery-description'
                                    style={{ right: '0', left: 'initial' }}
                                >
                                    {item.description}
                                </span>
                            }
                        </a>
                }
            </div>
        );
    }

    obtener_img_gall() {
        const images = [];



        this.state.municipio.ImagenesMunicipio.map((item, index) => {
            if (!item.EsPrincipal) {
                if (item.EsVideo) {
                    images.push({
                        original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
                        thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
                        embedUrl: item.UrlImagen,
                        renderItem: this._renderVideo.bind(this)
                    })
                } else {
                    images.push({
                        original: item.UrlImagen,
                        thumbnail: item.UrlImagen,
                    })
                }
            }


        })

        

        this.setState({ images_gallery: images });

    }


    render() {


        return (
            <div className="container-menu ">
                <div id="content" >
                    <div className="table-responsive">
                        <Header iconMenuVisible="1" align="text-right" />
                        <div className=" jumbotron-form">
                            {this.state.municipio !== null ?


                                <ListGroup className="list-group-flush  ">
                                    <ListGroupItem>
                                        <Row className=" m-0 ">
                                            <Col sm={12} md={2}>

                                            </Col>
                                            <Col sm={12} md={8}>
                                                <Row className="font-weight-bold d-flex justify-content-center" >

                                                    <h5>{this.props.t('Municipio.Titulo')} {Parser(this.state.municipio.Nombre)}  </h5>

                                                </Row>

                                            </Col>
                                            <Col sm={12} md={2}>
                                                <Row className="font-weight-bold" >
                                                    <button className="btn btn-default btn-3d-style  btn-block" onClick={() => this.volver()} > {this.props.t('Generales.IrMapa')} </button>
                                                </Row>

                                            </Col>

                                        </Row>



                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Carousel>
                                            {
                                                this.state.municipio.ImagenesMunicipio.map((item, index) => {

                                                    return (
                                                        item.EsPrincipal ? <Carousel.Item className="item" key={index} >
                                                            <img
                                                                className="d-block w-100 rounded img-custom"
                                                                src={item.UrlImagen}
                                                                alt="slide"

                                                            />

                                                        </Carousel.Item> : ""
                                                    );
                                                })

                                            }
                                        </Carousel>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row className=" m-0 ">
                                            <Col sm={12} md={12}>
                                                <Row className="text-justify ">
                                                    {Parser(this.props.i18n.language === "en" ? this.state.municipio.EnDescripcion : this.state.municipio.Descripcion)}
                                                </Row>
                                            </Col>

                                        </Row>
                                        <Row className=" m-2 " >

                                            <h5 className="mr-1"><u>  {this.props.t('Municipio.Clima')}: </u></h5>   {Parser(this.state.municipio.Clima)}
                                        </Row>

                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Tabs defaultActiveKey="hacer" variant="pills" transition={false} id="noanim-tab-example">
                                            <Tab eventKey="hacer" title={this.props.t('Municipio.QueHacer')}>
                                                <ListGroup className="list-group-flush  ">
                                                    <ListGroupItem>
                                                        <Row className="p-3 m-0 justify-content-center">
                                                            <p>  {Parser(this.props.i18n.language === "en" ? this.state.municipio.EnQueHacer : this.state.municipio.QueHacer)}</p>
                                                        </Row>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Tab>

                                            <Tab eventKey="tips" title={this.props.t('Municipio.Tips')}>
                                                <ListGroup className="list-group-flush  ">
                                                    <ListGroupItem>
                                                        <Row className="p-3 m-0">
                                                            <p>   {Parser(this.props.i18n.language === "en" ? this.state.municipio.EnTips : this.state.municipio.Tips)} </p>
                                                        </Row>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Tab>


                                            <Tab eventKey="ferias" title={this.props.t('Municipio.Ferias')}>
                                                <ListGroup className="list-group-flush  ">
                                                    <ListGroupItem>
                                                        <Row className="p-3 m-0">
                                                            <p>{Parser(this.props.i18n.language === "en" ? this.state.municipio.EnFestividades : this.state.municipio.Festividades)} </p>
                                                        </Row>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Tab>

                                            <Tab eventKey="gal" title={this.props.t('Sede.Galeria')}>
                                                <ListGroup className="list-group-flush  ">
                                                    <ListGroupItem>
                                                        <Row className="p-3 m-0">
                                                            <ImageGallery items={this.state.images_gallery} />
                                                        </Row>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Tab>



                                        </Tabs>
                                    </ListGroupItem>

                                    <ListGroupItem>

                                        <Row className="p-0 m-0">
                                            <Col sm={12} md={6} className="mb-1">
                                                <button className="btn btn-default btn-3d-style  btn-block" onClick={() => this.volver()} >{this.props.t('Generales.IrMapa')}</button>
                                            </Col>
                                            <Col sm={12} md={6} className="mb-1">
                                                <a target="_blank" href={"https://maps.google.com?q=" + this.state.municipio.Latitud + "," + this.state.municipio.Longitud} className="btn btn-default btn-3d-style  btn-block" >{this.props.t('Generales.Comollegar')}</a>
                                            </Col>
                                        </Row>

                                    </ListGroupItem>


                                    <ListGroupItem>

                                        <ListGroup>
                                            <ListGroupItem >
                                                <h5><u>{this.props.t('Municipio.Compartir')}</u></h5>
                                                <div className="d-flex justify-content-center">
                                                    <div className="row  w-100">
                                                        <div className="col d-flex justify-content-center">
                                                            <FacebookProvider appId="137904151817325">
                                                                <Like href={"http://www.facebook.com/sharer.php?u=" + window.location.href} />
                                                            </FacebookProvider>
                                                        </div>
                                                        <div className="col d-flex justify-content-center">
                                                            <FacebookShareButton url={window.location.href} >
                                                                <FacebookIcon size={42} round={true} />
                                                            </FacebookShareButton>

                                                            <WhatsappShareButton url={window.location.href} >
                                                                <WhatsappIcon size={42} round={true} />
                                                            </WhatsappShareButton>

                                                            <FacebookMessengerShareButton url={window.location.href} >
                                                                <FacebookMessengerIcon size={42} round={true} />
                                                            </FacebookMessengerShareButton>
                                                        </div>
                                                    </div>
                                                </div>

                                            </ListGroupItem>

                                            <ListGroupItem >
                                                <h5><u>{this.props.t('Municipio.Comentar')}</u></h5>
                                                <div className="d-flex justify-content-center">
                                                    <FacebookProvider appId="137904151817325">

                                                        <Comments href={window.location.href} />

                                                    </FacebookProvider>
                                                </div>
                                            </ListGroupItem>


                                        </ListGroup>

                                    </ListGroupItem>
                                </ListGroup>



                                : ""
                            }



                        </div>
                    </div >
                </div>
                <Footer />
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { user_location, empresas, idEmpresaseleccionada, municipio } = state.mapsReducer;
    const { menuLateralVisible } = state.lateralMenuReducer;
    return {
        menuLateralVisible,
        user_location,
        empresas,
        idEmpresaseleccionada,
        municipio
    };
}


const mapDispatchToProps = {

    obtener_municipio: mapsActions.obtener_municipio,
};

const compo = withTranslation('common')(PerfilMunicipio)



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(compo));