import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import '../style.css';
import { loader } from '../../helpers/loader';
import { ListGroup, ListGroupItem, Carousel, Row, Col, Image, Tabs, Tab } from 'react-bootstrap';
import { mapsActions } from '../actions';
import { Icon } from '@material-ui/core';
import Header from '../../header';
import Footer from '../../footer';

import { FacebookProvider, Comments, Like } from 'react-facebook';
import Parser from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import {FacebookShareButton, FacebookIcon, WhatsappShareButton,FacebookMessengerShareButton,FacebookMessengerIcon, WhatsappIcon   
} from "react-share";
import inst from '../../../img/generales/instagram.png';
import { withTranslation } from "react-i18next";
import Metatags from '../../helpers/metatags';




class PerfilSede extends Component {


    constructor(props) {
        super(props);
        this.volver = this.volver.bind(this);
       

        this.state = {
            sede: {
                Nombre: '',
                Horarios: '',
                FechaRegistro: '',
                Celular: 0,
                CategoriaSubcategoria: '',
                Activa: '',
                IdCategoriaSubcategoria: '',
                IdEmpresa: '',
                IdMunicipio: '',
                IdSede: '',
                IdTipoSede: '',
                Imagen: '',
                Telefono: 0,
                ImagenesEmpresa: [],
                Latitud: '',
                Longitud: '',
                Descripcion: '',
                Precio: '',
                InstagramUrl: '',
                NombreInstagram: '',
                FacebookUrl: '',
                NombreFacebook: '',
                Correo: '',
                Tips: '',
                Direccion: '',
                SubCategoria: null,
                TwitterUrl: '',
                NombreTwitter: '',
                Pagina: '',
                EnDescripcion: '',
                EnTips: '',
                EnAnexo: '',
             
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
        await this.props.obtener_sede(id, this);
        this.obtener_img_gall();
        await this.props.obtener_sede(parseInt(localStorage.getItem('IdSede')), this);

    
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



        this.state.sede.ImagenesEmpresa.map((item, index) => {
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

                <Metatags title={this.state.sede.Nombre} description={this.state.sede.Descripcion} url={window.location.href} image={"https://coaventurate.com/app-images/generales/logo_main.png" } />
                <div id="content" >
                    <div className="table-responsive">
                        <Header iconMenuVisible="1" align="text-right" />
                         <div className=" jumbotron-form">
               
                  
                   
                            <ListGroup className="list-group-flush  ">
                                <ListGroupItem>
                                    <div className=" p-0 " >
                                        <Row className=" m-0 ">
                                            <Col sm={12} md={2}>
                                                <div className="text-center " >
                                                    {
                                                        this.state.sede.SubCategoria ?
                                                            <img id="item-f-1" style={{ width: "24px", heigth: "24px" }} alt={"image"} src={`/app-images/${this.state.sede.SubCategoria.UrlImagen}`} /> 

                                                          :  ""
                                                    }
                                                 
                                                </div>
                                            </Col>
                                            <Col sm={12} md={8}>
                                                <Row className="font-weight-bold d-flex justify-content-center" >
                                                  
                                                    <h5 className="text-center ">
                                                            {this.state.sede.Nombre}
                                                    </h5>
                                                    {
                                                        this.state.sede.TipoSede ?
                                                            <p className="mr-2" style={{ "fontSize": "1.2vw" }} >
                                                                {this.state.sede.TipoSede.Nombre !== "Unica" ? "( "+ this.state.sede.TipoSede.Nombre+")" :""}
                                                     </p> : ""
                                                           
                                                    }
                                                      -
                                                    {
                                                        this.state.sede.Municipio ?
                                                            <h5 className="ml-2">
                                                                {this.state.sede.Municipio.Nombre}
                                                            </h5> : ""

                                                    }
                                                  
                                                  
                                                </Row>
                                              
                                            </Col>
                                            <Col sm={12} md={2}>
                                                <Row className="font-weight-bold" >
                                                    <button className="btn btn-default btn-3d-style  btn-block" onClick={() => this.volver()} >{this.props.t('Generales.IrMapa')}</button>
                                                </Row>

                                            </Col>

                                        </Row>
                                    </div>
                                </ListGroupItem>    
                                <ListGroupItem>
                                         <Carousel>
                            {
                                            this.state.sede.ImagenesEmpresa.map((item, index) => {
                                            
                                                    return (
                                                       item.EsPrincipal ? <Carousel.Item className="item" key={index} >
                                                            <img
                                                                className="d-block w-100 rounded img-custom"
                                                                src={item.UrlImagen}
                                                                alt="slide"

                                                            />

                                                        </Carousel.Item>:""
                                                    );

                                                
                                    
                                })

                            }
                        </Carousel>
                                     </ListGroupItem>
                                <ListGroupItem>
                                     <div className="shadow-box p-3 rounded-sm" >
                            <Row className=" m-0 ">
                                <Col sm={12} md={5}>
                                    <div className="text-center ">
                                                    <Image className="perfil-logo rounded-sm" src={this.state.sede.Imagen === "" ? Icon : `/app-images/${this.state.sede.Imagen}`} />
                                    </div>
                                </Col>
                                <Col sm={12} md={7}>
                                  
                                <Row className="text-justify " >
                                    {Parser( this.props.i18n.language === "en" ? this.state.sede.EnDescripcion : this.state.sede.Descripcion )}
                                </Row>
                                </Col>

                            </Row>
                        </div>
                                </ListGroupItem>    
                                <ListGroupItem>
                                    <Tabs defaultActiveKey="info" variant="pills" transition={false} id="noanim-tab-example">
                                        <Tab eventKey="info" title={this.props.t('Sede.Information') } className="p-3">
                                            <h5><u> {this.props.t('Sede.Detalles')}</u></h5>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroupItem>
                                                    <Row className="p-1 m-0">
                                                        <Col sm={12} md={6}>
                                                            <Row className="justify-content-md-center text-social ">
                                                                <Col sm={12} md={2} ><h4><i className="fa fa-money" aria-hidden="true" /></h4></Col>
                                                                <Col sm={12} md={10} >{Parser(this.state.sede.Precio)} </Col>
                                                            </Row>

                                                        </Col>
                                                        <Col sm={12} md={6}>
                                                            <Row className="justify-content-md-center text-social">
                                                                <Col sm={12} md={2} ><h4><i className="fa fa-clock-o" aria-hidden="true" /></h4></Col>
                                                                <Col sm={12} md={10} >{Parser(this.state.sede.Horarios)} </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                    </ListGroupItem>
                                            </ListGroup>
                                            <h5><u>{this.props.t('Sede.Contacto')}</u></h5>
                                            <ListGroup className="list-group-flush  ">
                                                <ListGroupItem>
                                                    {this.state.sede.Direccion !== "" ?
                                                    <Row className="p-2 m-0">
                                                        <Col sm={12} md={4}>
                                                            <Row className="justify-content-md-center text-social">
                                                                    <Col sm={12} md={2} ><h4 className="no-margin-mobile"><i className="fa fa-map-marker" aria-hidden="true" /></h4></Col>
                                                                    <Col sm={12} md={10} >{Parser(this.state.sede.Direccion)}  </Col>
                                                            </Row>

                                                        </Col>
                                                        </Row>
                                                        : ""
                                                    }
                                                    <Row className="p-2 m-0">
                                                    {this.state.sede.Telefono !=="" ?
                                                        <Col sm={12} md={4}>
                                                                    <Row className="justify-content-md-center text-social">
                                                                    <Col sm={12} md={2} ><h4 className="no-margin-mobile"><i className="fa fa-phone" aria-hidden="true" /></h4></Col>
                                                                        <Col sm={12} md={10} > {this.state.sede.Telefono}</Col>
                                                            </Row>

                                                            </Col>
                                                            :""
                                                    }

                                                            {this.state.sede.Celular !== "" ?
                                                                <Col sm={12} md={4}>
                                                                    <Row className="justify-content-md-center text-social">
                                                                    <Col sm={12} md={2} ><h4 className="no-margin-mobile"><i className="fa fa-whatsapp" aria-hidden="true" /></h4></Col>
                                                                        <Col sm={12} md={10} > <a target="_blank" href={"https://api.whatsapp.com/send?phone=57" + this.state.sede.Celular + "&text= Hola!%20Quiero%20mas%20información!"}> {this.state.sede.Celular}</a></Col>
                                                                    </Row>
                                                                </Col>
	                                                            :    ""
                                                            }
                                                     

                                                        {this.state.sede.Pagina !== "" ?
                                                                <Col sm={12} md={4}>
                                                                    <Row className="justify-content-md-center text-social">
                                                                    <Col sm={12} md={2} ><h4 className="no-margin-mobile"><i className="fa fa-globe" aria-hidden="true"></i></h4></Col>
                                                                        <Col sm={12} md={10} > <a target="_blank" href={this.state.sede.Pagina}> {this.state.sede.Pagina}</a></Col>
                                                                    </Row>

                                                                </Col>

	                                                            : ""
                                                            }
                                               
                                                
                                                    </Row>
                                                    <Row className="p-2 m-0">

                                                        {this.state.sede.InstagramUrl !== "" ?
                                                            <Col sm={12} md={4}>
                                                                <Row className="justify-content-md-center text-social">
                                                                    <Col sm={12} md={2} ><h4 className="no-margin-mobile"><i className="fa fa-instagram" aria-hidden="true" /></h4></Col>
                                                                    <Col sm={12} md={10} ><a target="_blank" href={this.state.sede.FacebookUrl}> {this.state.sede.NombreInstagram}</a></Col>
                                                                </Row>

                                                            </Col>
                                                            : ""
                                                        }


                                                        {this.state.sede.FacebookUrl !== "" ?
                                                            <Col sm={12} md={4}>
                                                                <Row className="justify-content-md-center text-social">
                                                                    <Col sm={12} md={2} ><h4 className="no-margin-mobile"><i className="fa fa-facebook" aria-hidden="true" /></h4></Col>
                                                                    <Col sm={12} md={10} ><a target="_blank" href={this.state.sede.FacebookUrl}> {this.state.sede.NombreFacebook}</a></Col>
                                                                </Row>

                                                            </Col>
	                                                         : ""
                                                        }

                                                       
                                                        {this.state.sede.TwitterUrl !== "" ?
                                                            <Col sm={12} md={4}>
                                                                <Row className="justify-content-md-center text-social">
                                                                    <Col sm={12} md={2} ><h4 className="no-margin-mobile"><i className="fa fa-twitter" aria-hidden="true" /></h4></Col>
                                                                    <Col sm={12} md={10} ><a target="_blank" href={this.state.sede.TwitterUrl}> {this.state.sede.NombreTwitter}</a></Col>
                                                                </Row>

                                                            </Col>
	                                                             : ""
                                                        }
                                                    </Row>
                                                    {this.state.sede.Correo !== "" ?
                                                    <Row className=" p-2 m-0">

                                                        <Col sm={12} md={4}>
                                                            <Row className="justify-content-md-center text-social">
                                                                    <Col sm={12} md={2} ><h4 className="no-margin-mobile"><i className="fa fa-envelope" aria-hidden="true" /></h4></Col>
                                                                <Col sm={12} md={10} > {this.state.sede.Correo}</Col>
                                                            </Row>

                                                        </Col>
                                                        </Row>
                                                        : ""
                                                    }
                                                </ListGroupItem>
                                            </ListGroup>
                                        </Tab>
                                        <Tab eventKey="recom" title={this.props.t('Sede.Tips')}>
                                            <ListGroup className="list-group-flush  ">
                                                <ListGroupItem>
                                                    <Row className="p-3 m-0">
                                                        <p>{ Parser(this.props.i18n.language === "en" ? this.state.sede.EnTips : this.state.sede.Tips )} </p>
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
                               

                      
                    </ListGroup>
                            <Row className="p-3 m-0">

                                <Col sm={12} md={6} className="mb-1">
                                    <button className="btn btn-default btn-3d-style  btn-block" onClick={() => this.volver()} >{this.props.t('Generales.IrMapa')}</button>

                                </Col>
                                <Col sm={12} md={6} className="mb-1">

                                    <a target="_blank" href={"https://maps.google.com?q=" + this.state.sede.Latitud + "," + this.state.sede.Longitud} className="btn btn-default btn-3d-style  btn-block" >{this.props.t('Generales.Comollegar')}</a>
                                  
                                </Col>
                            </Row>
                             <ListGroup>
                                <ListGroupItem >
                                    <h5><u>{this.props.t('Sede.Compartir')}</u></h5>


                                    <div className="d-flex justify-content-center">
                                        <div className="row  w-100">
                                            <div className="col d-flex justify-content-center">
                                                <FacebookProvider appId="137904151817325">
                                            <Like href={"http://www.facebook.com/sharer.php?u=" + window.location.href}   />
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
                                    <h5><u>{this.props.t('Sede.Comentar')}</u></h5>
                                    <div className="d-flex justify-content-center">
                                        <FacebookProvider appId="137904151817325">
                                        
                                            <Comments href={"http://www.facebook.com/sharer.php?u=" + window.location.href} />

                                        </FacebookProvider>
                                    </div>
                                </ListGroupItem>

                      
                            </ListGroup>
                           
               
            </div>
                    </div >

                   
                   
                </div>
                <Footer />
            </div>

        );
    }
}


function mapStateToProps(state) {
    const { user_location, empresas, idEmpresaseleccionada,sede } = state.mapsReducer;
    const { menuLateralVisible } = state.lateralMenuReducer;
    return {
        menuLateralVisible,
        user_location,
        empresas,
        idEmpresaseleccionada,
        sede
    };
}


const mapDispatchToProps = {

    obtener_sede: mapsActions.obtener_sede,
};


const compo = withTranslation('common')(PerfilSede)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(compo));