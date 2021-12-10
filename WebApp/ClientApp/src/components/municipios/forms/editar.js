import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { municipiosActions } from '../actions';
import { alertActions } from '../../alert_message/actions';
import { Modal, Form, Col, Image, ListGroup} from 'react-bootstrap';
import L, { map } from 'leaflet';
import { icons } from '../../helpers/mapIcons';
import { loader } from '../../helpers/loader';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

class EditarMunicipio extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            municipio: {
                IdMunicipio: 0,
                Nombre: '',
                UrlImagen: '',
                Clima: '',
                Descripcion: '',
                Festividades: '',
                Latitud: '',
                Longitud: '',
                URLImagen1: '',
                URLImagen2: '',
                URLImagen3: '',
                URLImagen4: '',
                URLImagen5: '',
                URLImagen6: '',
                URLImagen7: '',
                URLImagen8: '',
                URLImagen9: '',
                URLImagen10: '',
                URLImagen11: '',
                URLImagen12: '',
                URLImagen13: '',
                URLImagen14: '',

                EsVideo1: false,
                EsVideo2: false,
                EsVideo3: false,
                EsVideo4: false,
                EsVideo5: false,
                EsVideo6: false,
                EsVideo7: false,
                EsVideo8: false,
                EsVideo9: false,
                EsVideo10: false,
                EsVideo11: false,
                EsVideo12: false,
                EsVideo13: false,
                EsVideo14: false,
                Tips: '',
                QueHacer: '',
                EnDescripcion: '',
                EnFestividades: '',
                EnTips: '',
                EnQueHacer: '',
            },
            file: null
        };


        this.InputChange = this.InputChange.bind(this);
        this.FileSelectChange = this.FileSelectChange.bind(this);
        this.EditarMunicipio = this.EditarMunicipio.bind(this);
        this.AsignarUbicacion = this.AsignarUbicacion.bind(this);


    }

    AsignarUbicacion(e) {
        const { municipio } = this.state;


        var lat = e.latlng.lat;
        var lon = e.latlng.lng;

        this.setState({
            sede: {
                ...municipio,
                Latitud: lat,
                Longitud: lon
            }
        });

    }

    async componentDidMount() {
        await this.props.cargar_editar_municipio(localStorage.getItem('idMunicipioSeleccionado'), this);
      

    }

    InputChange(e) {
        const { name, value } = e.target;
        const { municipio } = this.state;
        this.setState({
            municipio: {
                ...municipio,
                [name]: value
            }
        });
    }

    EditarMunicipio(e) {
        e.preventDefault();
        const {
            municipio,
            file
        } = this.state;

        var form = file;
         if (!municipio.Nombre) {
            this.props.showMessage('Debe ingresar un nombre.', true, 'Información');
            return;
        } else if (!municipio.Descripcion) {
            this.props.showMessage('Debe ingresar un descripción.', true, 'Información');
            return;
        }
        else if (!municipio.Clima) {
            this.props.showMessage('Debe ingresar el clima.', true, 'Información');
            return;
        } else if (!municipio.Festividades) {
            this.props.showMessage('Debe ingresar una festividades.', true, 'Información');
            return;
        } else if (municipio.Latitud === 0) {
            this.props.showMessage('Debe selecionar  latitud.', true, 'Información');
            return;
        } else if (municipio.Longitud === 0) {
            this.props.showMessage('Debe selecionar  una longitud.', true, 'Información');
            return;
        } else if (!municipio.URLImagen1) {
            this.props.showMessage('Debe ingresar al menos una url de imagen.', true, 'Información');
            return;
        }
        if (form == null) {
            form = new FormData();
        }

        form.append('IdMunicipio', municipio.IdMunicipio);
        form.append('Nombre', municipio.Nombre);
        form.append('UrlImagen', municipio.UrlImagen);
        form.append('Clima', municipio.Clima);
        form.append('Descripcion', municipio.Descripcion);
        form.append('Festividades', municipio.Festividades);
        form.append('EnDescripcion', municipio.EnDescripcion);
        form.append('EnFestividades', municipio.EnFestividades);
        form.append('Latitud', municipio.Latitud);
        form.append('Longitud', municipio.Longitud);

        form.append('URLImagen1', municipio.URLImagen1);
        form.append('URLImagen2', municipio.URLImagen2);
        form.append('URLImagen3', municipio.URLImagen3);
        form.append('URLImagen4', municipio.URLImagen4);
        form.append('URLImagen5', municipio.URLImagen5);
        form.append('URLImagen6', municipio.URLImagen6);
        form.append('URLImagen7', municipio.URLImagen7);
        form.append('URLImagen8', municipio.URLImagen8);
        form.append('URLImagen9', municipio.URLImagen9);
        form.append('URLImagen10', municipio.URLImagen10);
        form.append('URLImagen11', municipio.URLImagen11);
        form.append('URLImagen12', municipio.URLImagen12);
        form.append('URLImagen13', municipio.URLImagen13);
        form.append('URLImagen14', municipio.URLImagen14);

        form.append('EsVideo1', false);
        form.append('EsVideo2', false);
        form.append('EsVideo3', false);
        form.append('EsVideo4', false);
        form.append('EsVideo5', false);
        form.append('EsVideo6', municipio.EsVideo6);
        form.append('EsVideo7', municipio.EsVideo7);
        form.append('EsVideo8', municipio.EsVideo8);
        form.append('EsVideo9', municipio.EsVideo9);
        form.append('EsVideo10', municipio.EsVideo10);
        form.append('EsVideo11', municipio.EsVideo11);
        form.append('EsVideo12', municipio.EsVideo12);
        form.append('EsVideo13', municipio.EsVideo13);
        form.append('EsVideo14', municipio.EsVideo14);
        form.append('EnQueHacer', municipio.QueHacer);
        form.append('EnTips', municipio.EnTips);
        form.append('QueHacer', municipio.EnQueHacer);
        form.append('Tips', municipio.Tips);

        loader.show();
        this.props.editar_municipio(form, this);
        this.props.ver_editar_municipio(false);

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

    cargarMapa() {
        const map = L.map('map').setView([this.state.municipio.Latitud, this.state.municipio.Longitud], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '

        }).addTo(map);

        var marker = L.marker([this.state.municipio.Latitud, this.state.municipio.Longitud], {
            draggable: true,
            icon: icons.UserLocationIcon()
        }) .addTo(map);

        marker.on('drag', (e) => { this.AsignarUbicacion(e) });





    }


    render() {
        const { municipio } = this.state;
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar Municipio
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.EditarMunicipio} >
                        <Form.Row>
                            <div id="map" />
                        </Form.Row>
                        <Form.Row sm={10} className=" d-flex justify-content-center" style={{ background: "#ccc" }}>
                            {municipio.UrlImagen !== '' ?

                                <Image style={{ width: "100px", heigth: "100px" }} src={`/app-images/${municipio.UrlImagen}`} rounded /> :
                                ""
                            }
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <label>Selecciona archivo para subir </label>
                                <input className="pz-input" type="file" onChange={this.FileSelectChange} placeholder="Imagen" />

                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Nombre" value={municipio.Nombre} maxLength={30} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Clima" value={municipio.Clima} maxLength={30} className="pz-input" onChange={this.InputChange} placeholder="Clima" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Descripcion" value={municipio.Descripcion}  className="pz-input" onChange={this.InputChange} placeholder="Descripción" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="EnDescripcion" value={municipio.EnDescripcion} className="pz-input" onChange={this.InputChange} placeholder="Descripción en ingles" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Festividades" value={municipio.Festividades} className="pz-input" onChange={this.InputChange} placeholder="Festividades" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="EnFestividades" value={municipio.EnFestividades} className="pz-input" onChange={this.InputChange} placeholder="Festividades en ingles" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Tips" value={municipio.Tips} className="pz-input" onChange={this.InputChange} placeholder="Tips" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="EnTips" value={municipio.EnTips} className="pz-input" onChange={this.InputChange} placeholder="Tips en ingles" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="QueHacer" value={municipio.QueHacer} className="pz-input" onChange={this.InputChange} placeholder="QueHacer" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="EnQueHacer" value={municipio.EnQueHacer} className="pz-input" onChange={this.InputChange} placeholder="Que hacer en ingles" />
                            </Form.Group>
                        </Form.Row>


                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Latitud" value={municipio.Latitud} className="pz-input" onChange={this.InputChange} placeholder="Latitud" />
                            </Form.Group>
                        </Form.Row>


                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Longitud" value={municipio.Longitud} className="pz-input" onChange={this.InputChange} placeholder="Longitud" />
                            </Form.Group>
                        </Form.Row>

                        <ListGroup className="pt-1 pb-2">
                            <ListGroup.Item>
                                <h3>Galería principal</h3>


                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen1" value={municipio.URLImagen1 === null ? "" : municipio.URLImagen1} onChange={this.InputChange} className="pz-input" placeholder="URLImagen1" />
                                    </Form.Group>

                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen2" value={municipio.URLImagen2 === null ? "" : municipio.URLImagen2} onChange={this.InputChange} className="pz-input" placeholder="URLImagen2" />
                                    </Form.Group>

                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen3" value={municipio.URLImagen3 === null ? "" : municipio.URLImagen3} onChange={this.InputChange} className="pz-input" placeholder="URLImagen3" />
                                    </Form.Group>

                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen4" value={municipio.URLImagen4 === null ? "" : municipio.URLImagen4} onChange={this.InputChange} className="pz-input" placeholder="URLImagen4" />
                                    </Form.Group>

                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen5" value={municipio.URLImagen5 === null ? "" : municipio.URLImagen5} onChange={this.InputChange} className="pz-input" placeholder="URLImagen5" />
                                    </Form.Group>

                                </Form.Group>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>Galería Secundaría</h3>
                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen6" value={municipio.URLImagen6 === null ? "" : municipio.URLImagen6} onChange={this.InputChange} className="pz-input" placeholder="URLImagen6" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <CheckBoxComponent label='EsVideo' checked={this.state.municipio.EsVideo6} change={(val) => { this.InputChange({ target: { name: 'EsVideo6', value: val.checked } }); }} />
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen7" value={municipio.URLImagen7 === null ? "" : municipio.URLImagen7} onChange={this.InputChange} className="pz-input" placeholder="URLImagen7" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <CheckBoxComponent label='EsVideo' checked={this.state.municipio.EsVideo7} change={(val) => { this.InputChange({ target: { name: 'EsVideo7', value: val.checked } }); }} />
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen8" value={municipio.URLImagen8 === null ? "" : municipio.URLImagen8} onChange={this.InputChange} className="pz-input" placeholder="URLImagen8" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <CheckBoxComponent label='EsVideo' checked={this.state.municipio.EsVideo8} change={(val) => { this.InputChange({ target: { name: 'EsVideo8', value: val.checked } }); }} />
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen9" value={municipio.URLImagen9 === null ? "" : municipio.URLImagen9} onChange={this.InputChange} className="pz-input" placeholder="URLImagen9" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <CheckBoxComponent label='EsVideo' checked={this.state.municipio.EsVideo9} change={(val) => { this.InputChange({ target: { name: 'EsVideo9', value: val.checked } }); }} />
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen10" value={municipio.URLImagen10 === null ? "" : municipio.URLImagen10} onChange={this.InputChange} className="pz-input" placeholder="URLImagen10" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <CheckBoxComponent label='EsVideo' checked={this.state.municipio.EsVideo10} change={(val) => { this.InputChange({ target: { name: 'EsVideo10', value: val.checked } }); }} />
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen11" value={municipio.URLImagen11 === null ? "" : municipio.URLImagen11} onChange={this.InputChange} className="pz-input" placeholder="URLImagen11" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <CheckBoxComponent label='EsVideo' checked={this.state.municipio.EsVideo11} change={(val) => { this.InputChange({ target: { name: 'EsVideo11', value: val.checked } }); }} />
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen12" value={municipio.URLImagen12 === null ? "" : municipio.URLImagen12} onChange={this.InputChange} className="pz-input" placeholder="URLImagen12" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <CheckBoxComponent label='EsVideo' checked={this.state.municipio.EsVideo12} change={(val) => { this.InputChange({ target: { name: 'EsVideo12', value: val.checked } }); }} />
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen13" value={municipio.URLImagen13 === null ? "" : municipio.URLImagen13} onChange={this.InputChange} className="pz-input" placeholder="URLImagen13" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <CheckBoxComponent label='EsVideo' checked={this.state.municipio.EsVideo13} change={(val) => { this.InputChange({ target: { name: 'EsVideo13', value: val.checked } }); }} />
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group md="6" >
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" name="URLImagen14" value={municipio.URLImagen14 === null ? "" : municipio.URLImagen14} onChange={this.InputChange} className="pz-input" placeholder="URLImagen14" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <CheckBoxComponent label='EsVideo' checked={this.state.municipio.EsVideo14} change={(val) => { this.InputChange({ target: { name: 'EsVideo14', value: val.checked } }); }} />
                                    </Form.Group>
                                </Form.Group>
                            </ListGroup.Item>
                        </ListGroup>
                    

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <button type="submit" className="btn btn-default btn-3d-style  btn-block">Grabar </button>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <button type="button" onClick={this.props.onHide} className="btn btn-default btn-3d-style  btn-block">Cancelar </button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>

            </Modal>

        );
    }
}




function mapStateToProps(state) {
    const { centerInitial, zoomMap } = state.mapsReducer;
    const { mostrar_editar_municipio } = state.municipio;
    return { mostrar_editar_municipio, centerInitial, zoomMap };
};


const mapDispatchToProps = {

    showMessage: alertActions.showMessage,
    ver_editar_municipio: municipiosActions.ver_editar_municipio,
    obtener_municipios: municipiosActions.obtener_municipios,
    editar_municipio: municipiosActions.editar_municipio,
    cargar_editar_municipio: municipiosActions.cargar_editar_municipio,
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarMunicipio));