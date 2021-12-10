import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions } from '../../alert_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import { mapsActions  } from '../../mapsview/actions';

import { FacebookProvider, LoginButton, Status } from 'react-facebook';

class InicioSesion extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            categoria: {
                IdCategoria: 0,
                Nombre: '',
                UrlImagen: '',
                Orden: 0

            },
            file: null
        };


        this.InputChange = this.InputChange.bind(this);

        this.FileSelectChange = this.FileSelectChange.bind(this);
        this.CreateSubCategoria = this.CreateSubCategoria.bind(this);


    }

    InputChange(e) {
        const { name, value } = e.target;
        const { categoria } = this.state;
        this.setState({
            categoria: {
                ...categoria,
                [name]: value
            }
        });
    }

    CreateSubCategoria(e) {
        e.preventDefault();
        const {
            categoria,
            file
        } = this.state;


        if (!categoria.Nombre) {
            this.props.showMessage('Debe ingresar una nombre.', true, 'Información');
            return;

        } else if (file == null || file.get("Imagen") == null) {
            this.props.showMessage('Debe seleccionar una imagén', true, 'Información');
            return;
        } else if (!categoria.EnNombre) {
            this.props.showMessage('Debe ingresar una nombre en ingles.', true, 'Información');
            return;

        }else if (!categoria.Orden === 0) {
            this.props.showMessage('Debe ingresar un un numero de ordén.', true, 'Información');
            return;

        }

        file.append('Nombre', categoria.Nombre);
        file.append('EnNombre', categoria.EnNombre);
        file.append('Orden', categoria.Orden);
        this.props.crear_categoria(file, this);
        this.props.ver_crear_categoria(false);

    }

    FileSelectChange(e) {
        e.preventDefault();
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('Imagen', element);
        }
        this.setState({ file: form });
    }

    handleResponse = (data) => {
      
        this.props.ver_incio_facebook(false)
    }

    handleError = (error) => {
        this.setState({ error });
    }


    render() {
        const responseFacebook = () => {
           
            this.props.ver_incio_facebook(false)
        }

        return (
            <Modal
                show={this.props.show}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => this.props.ver_incio_facebook(false)}
            >
                <Modal.Header >
                   

                    <img className="logo" src={"/app-images/generales/logo_main.png"} alt="logo" />
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={this.CreateSubCategoria} >
                        <Form.Row sm={10}>


                            <Form.Group className="ml-3" >
                                <FacebookProvider appId={process.env.REACT_FACE_ID}>

                                    <Status>
                                        {({ loading, status }) => (
                                            <div>
                                                {status === "connected" ? this.handleResponse() :
                                                    
                                                    <LoginButton
                                                        scope="name,email,picture"
                                                        onCompleted={this.handleResponse}
                                                        onError={this.handleError}
                                                    >
                                                        <span>Login via Facebook</span>
                                                    </LoginButton>
                                                    
                                                    
                                                    }
                                            </div>
                                        )}
                                    </Status>

                                    
                                </FacebookProvider>


                              
                               
                            </Form.Group>
                        </Form.Row>

                        
                    </Form>
                    
                </Modal.Body>

            </Modal>

        );
    }
}




function mapStateToProps(state) {
    const { mostrar_crear_categoria } = state.categoria;
    return { mostrar_crear_categoria };
};


const mapDispatchToProps = {

    showMessage: alertActions.showMessage,
    ver_incio_facebook: mapsActions.ver_incio_facebook,
    
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InicioSesion));