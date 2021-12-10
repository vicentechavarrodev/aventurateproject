import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from "react-router-dom";
import { LateralMenuActions } from '../lateral_bar/actions';
import { HeaderActions } from '../header/actions';
import {  Row, Col} from 'react-bootstrap';
import { usuarioActions } from '../users/actions';
import { Link } from "react-router-dom";
import Spain from '../../img/generales/espana.png';
import English from '../../img/generales/eeuu.png';
import { withTranslation } from "react-i18next";
import Parser from 'html-react-parser';


class Header extends Component {

   

    constructor() {
        super();
        this.MostrarMenu = this.MostrarMenu.bind(this);
        this.MostrarLogin = this.MostrarLogin.bind(this);
        this.Logout = this.Logout.bind(this);
        this.ItemClick = this.ItemClick.bind(this);
        this.TranslateSpanish = this.TranslateSpanish.bind(this);
        this.TranslateEnglish = this.TranslateEnglish.bind(this);
        
        
    }

    ItemClick = e => {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.id_item_menu !== '') {

            document.getElementById(this.props.id_item_menu).classList.remove("active");
        }
        this.props.seleccionar_id_item(e.target.id);
        localStorage.setItem('item_menu_header', e.target.id);
        document.getElementById(e.target.id).classList.add("active");

       
        
    }

    async componentDidMount() {
        

        localStorage.setItem('descripcion', "Esta es una descipcion de ejemplo");

       
    }
    async TranslateSpanish() {
        this.props.i18n.changeLanguage('es')
    }
    async TranslateEnglish() {
        this.props.i18n.changeLanguage('en')
    }

  
    
    MostrarMenu(e) {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.menuLateralVisible === 'noActive') {
            this.props.lateral_menu_visible('active');

        } else {
            this.props.lateral_menu_visible('noActive');
        }

    }

    MostrarLogin(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.history.push('/login');

    }

    Logout(e) {
        e.preventDefault();
        this.props.logout(this.props.history);

    }

    abrirMenu(e) {
        e.preventDefault();
    var x = document.getElementById("menuTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

    render() {

        return (
            <nav className="navbar-header navbar-expand-sm navbar-dark fixed-top ">
                <Row className="content-logo pt-2 pb-2 justify-content-center">
                    <Col sm={1} md={1} className="text-center" ><a target="_blank" href="https://www.facebook.com/coaventurate/"> <i className="fa fa-facebook" aria-hidden="true" /></a></Col>
                    <Col sm={1} md={1} className="text-center" ><a target="_blank" href="https://www.instagram.com/coaventurate"> <i className="fa fa-instagram" aria-hidden="true" /></a></Col>
                    <Col sm={1} md={1} className="text-center" ><a target="_blank" href="https://www.twitter.com/coaventurate/"> <i className="fa fa-twitter" aria-hidden="true" /></a></Col>
                    <Col sm={1} md={1} className="text-center" >
                        <Link to="/"  >
                            <img className="logo" src={"/app-images/generales/logo_main.png"} alt="logo" />
                        </Link>
                   </Col>
                    <Col sm={1} md={1} className="text-center" ><a target="_blank" href="https://www.youtube.com/channel/UCV2sfnegKuPQsgxo9XfhXEA"> <i className="fa fa-youtube-play" aria-hidden="true" />  </a></Col>
                    <Col sm={1} md={1} className="text-center" ><a target="_blank" href={"https://api.whatsapp.com/send?phone=57" + "3227052777" + "&text= Hola!%20Quiero%20mas%20información!"}><i className="fa fa-whatsapp"></i></a></Col>
                    <Col sm={1} md={1} className="text-center" >
                        <Link to="/contacto"  >

                            <i className="fa fa-envelope" aria-hidden="true" />

                        </Link>

                   </Col>
                </Row>
               
               

                    <Row>
                    <Col xs={3} lg={12} md={3}>
                        <div className={`justify-content-center ${this.props.align}`}  >
                                {this.props.iconMenuVisible === "2" ?

                                <button type="button" id="sidebarCollapse" onClick={this.MostrarMenu} value="collapse" className="btn  " style={{ "color": "#97BF13" }}>
                                        <MenuIcon id="btncollapse" visibility={this.props.iconMenuVisible} />
                                    </button> :
                                    ""
                                }
                            </div>

                            {this.props.iconMenuVisible === "1" ?
                                <div className="topnav" id="menuTopnav">
                                    <a href="#" className="icon" onClick={this.abrirMenu}>
                                        <i className="fa fa-bars"></i>
                                    </a>
                                    <div onClick={this.ItemClick} id='blog'  >
                                        <Link to="/blog" id='blog' className={this.props.id_item_menu === "blog" ? "active" : ""} >
                                        <Row>
                                            <Col xs={12} md={12} className="text-center" id='blog'>{this.props.t('Index.Blog')}</Col>
                                            </Row>
                                        </Link>
                                    </div>


                                    <div onClick={this.ItemClick} id='fotos' >
                                        <Link to="/galeria" id='fotos' className={this.props.id_item_menu === "fotos" ? "active" : ""}  >
                                        <Row>
                                            <Col xs={12} md={12} className="text-center" id='fotos'>{this.props.t('Index.Fotos')}</Col>
                                            </Row>
                                        </Link>
                                    </div>



                                    <div onClick={this.ItemClick} id='inicio'  >
                                        <Link to="/" id='inicio' className={this.props.id_item_menu === "inicio" ? "active" : ""} >
                                        <Row>
                                            <Col xs={12} md={12} className="text-center" id='inicio'>{this.props.t('Index.Inicio')}</Col>
                                            </Row>
                                        </Link>
                                    </div>



                                    <div onClick={this.ItemClick} id='quienes'  >
                                        <Link to="/quienes_somos" id='quienes' className={this.props.id_item_menu === "quienes" ? "active" : ""} >
                                        <Row>
                                            <Col xs={12} md={12} className="text-center" id='quienes'>{this.props.t('Index.Somos')}</Col>
                                            </Row>
                                        </Link>
                                    </div>

                                    <div onClick={this.ItemClick} id='contacto'>
                                        <Link to="/contacto" id='contacto' className={this.props.id_item_menu === "contacto" ? "active" : ""}  >
                                        <Row>
                                            <Col xs={12} md={12} className="text-center" id='contacto'>{this.props.t('Index.Contacto')}</Col>
                                            </Row>
                                        </Link>
                                </div>
                                <div>
                                    <Row>
                                        <Col xs={12} md={12} className="div-spain" id='contacto'>
                                            <button className="react-share__ShareButton menu-button" onClick={this.TranslateEnglish}  >
                                                <img src={English} alt="Spain" className="spain" />
                                            </button>

                                            <button className="react-share__ShareButton menu-button" onClick={this.TranslateSpanish}  >
                                                <img src={Spain} alt="Spain" className="spain" />
                                            </button>
                                           
                                        </Col>

                                    </Row>
                                </div>
                                </div>
                                :

                                ""
                            }
                    </Col>
                    <Col xs={6} md={6} lg={0}  >
                            <Link to="/"  >
                                 <img className="logo content-logo-sm  pt-1 pb-1" src={"/app-images/generales/logo_main.png"} alt="logo" />
                            </Link>
                            </Col>
               
                    <Col xs={3} md={3} lg={0}  >
                   
                    </Col>
                  </Row>
              
            </nav>

        )
    }

}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {

    const { id_item_menu } = state.HeaderReducer;
    const { user_address, layerSeleccionado } = state.mapsReducer;
    const { menuLateralVisible } = state.lateralMenuReducer;
    return {
        menuLateralVisible,
        user_address,
        layerSeleccionado,
        id_item_menu
    };

};

const mapDispatchToProps = {
    lateral_menu_visible: LateralMenuActions.lateral_menu_visible,
    logout: usuarioActions.logout,
    seleccionar_id_item: HeaderActions.seleccionar_id_item,
};


const compo = withTranslation('common') (Header)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(compo));
