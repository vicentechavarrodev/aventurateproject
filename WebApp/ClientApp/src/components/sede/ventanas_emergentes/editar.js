import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { SedeActions } from '../actions';
import { EmpresaActions } from '../../empresas/actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alert_message/actions';
import { Modal, Form, Col, Image, ListGroup} from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import L, { map } from 'leaflet';
import { icons } from '../../helpers/mapIcons';
import { categoriaActions } from '../../categorias/actions';
import { subcategoriaActions } from '../../subcategorias/actions';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';


class EditarSede extends Component {



    mapRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            sede: {

                IdSede:0,
                Nombre: '',
                Imagen: '',
                Telefono: '',
                Direccion: '',
                Horarios: '',
                Celular: '',
                Activa: false,
                Latitud: '',
                Longitud: '',
                IdMunicipio: 0,
                IdCategoriaSubcategoria: 0,
                IdTipoSede: 0,
                IdCategoria:0,
                Descripcion: '',
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

                EsVideo6: false,
                EsVideo7: false,
                EsVideo8: false,
                EsVideo9: false,
                EsVideo10: false,
                EsVideo11: false,
                EsVideo12: false,
                EsVideo13: false,
                EsVideo14: false,

                IdEmpresa: this.props.IdEmpresa,
                Precio: '',
                InstagramUrl: '',
                NombreInstagram: '',
                FacebookUrl: '',
                NombreFacebook: '',
                Correo: '',
                Tips: '',
                NombreTwitter: '',
                TwitterUrl: '',
                Pagina: '',
                EnDescripcion: '',
                EnTips: '',
                EnAnexo: '',
            },
            file: null,
            editado: false,
            CategoriasSubcategorias: [],
            IdCategoriaSubcategoria: 0
        };

        this.fieldsTipoSede = { text: 'Nombre', value: 'IdTipoSede' };
        this.fieldsMunicipio = { text: 'Nombre', value: 'IdMunicipio' };
        this.fieldsCatSub = { text: 'NombreSubcategoria', value: 'IdCategoriaSubcategoria' };
        this.fieldsCategoria = { text: 'Nombre', value: 'IdCategoria' };

        this.InputChange = this.InputChange.bind(this);
        this.EditSedeSubmit = this.EditSedeSubmit.bind(this);
        this.FileSelectChange = this.FileSelectChange.bind(this);
        this.AsignarUbicacion = this.AsignarUbicacion.bind(this);
        this.cargarSubcategorias = this.cargarSubcategorias.bind(this);
    }

    AsignarUbicacion(e) {
        const { sede } = this.state;


        var lat = e.latlng.lat;
        var lon = e.latlng.lng;

        this.setState({
            sede: {
                ...sede,
                Latitud: lat,
                Longitud: lon
            }
        });

    }

  


    async  componentDidMount() {
        loader.show();
         await  this.props.cargar_editar_sede(this.props.id_sede_seleccionada, this);
       
     
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
        const map = L.map('map').setView([this.state.sede.Latitud, this.state.sede.Longitud], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '

        }).addTo(map);

        var marker = L.marker([this.state.sede.Latitud, this.state.sede.Longitud], {
            draggable: true,
            icon: icons.UserLocationIcon()
        }).addTo(map);

        marker.on('drag', (e) => { this.AsignarUbicacion(e) });





    }

    cargarSubcategorias(e) {
       const { value, elemento } = e.target;
        if (elemento.previousItem != null) {
          
           this.setState({

               IdCategoriaSubcategoria: 0

           }, () => {
               this.props.cargar_subcategorias(value, this);
           });
        }
    }

    InputChange(e) {
      
        const { name, value } = e.target;
        const { sede } = this.state;
        this.setState({
            sede: {
                ...sede,
                [name]: value
            }
        });
    }

    EditSedeSubmit(e) {
        e.preventDefault();
        const { sede, file } = this.state;

        var form = file;

         if (!sede.Nombre) {
            this.props.showMessage('Debe ingresar un nombre.', true, 'Información');
            return;
        } else if (!sede.Telefono) {
            this.props.showMessage('Debe ingresar un telefono.', true, 'Información');
            return;
        } else if (!sede.Celular) {
            this.props.showMessage('Debe selecionar  un numero de celular.', true, 'Información');
            return;
        }
        else if (!sede.Descripcion) {
            this.props.showMessage('Debe ingresar una descripción.', true, 'Información');
             return;

         } else if (!sede.Anexo) {
             this.props.showMessage('Debe ingresar un anexo.', true, 'Información');
             return;
         } else if (!sede.Horarios) {
            this.props.showMessage('Debe ingresar un horario.', true, 'Información');
            return;
        } else if (!sede.Direccion) {
            this.props.showMessage('Debe ingresar una dirección.', true, 'Información');
            return;

        } else if (sede.Latitud === 0) {
            this.props.showMessage('Debe selecionar  una mpresa.', true, 'Información');
            return;
        } else if (sede.Longitud === 0) {
            this.props.showMessage('Debe selecionar  una mpresa.', true, 'Información');
            return;
        } else if (!sede.URLImagen1) {
            this.props.showMessage('Debe ingresar al menos una url de imagen.', true, 'Información');
            return;
        } else if (sede.IdMunicipio === 0) {
            this.props.showMessage('Debe selecionar  un municipio.', true, 'Información');
            return;
        } else if (sede.IdTipoSede === 0) {
            this.props.showMessage('Debe selecionar  una sede.', true, 'Información');
            return;
        } else if (sede.IdCategoriaSubcategoria === 0) {
            this.props.showMessage('Debe selecionar  una subcategoria.', true, 'Información');
            return;
         } else if (!sede.Tips) {
             this.props.showMessage('Debe ingresar tips.', true, 'Información');
             return;
         } else if (!sede.EnTips) {
             this.props.showMessage('Debe ingresar tips. en ingles', true, 'Información');
             return;
         }

        if (form == null) {
            form = new FormData();
        }

    

        form.append('IdSede', sede.IdSede);
        form.append('Nombre', sede.Nombre);
        form.append('Imagen', sede.Imagen);
        form.append('Telefono', sede.Telefono);
        form.append('Celular', sede.Celular);
        form.append('Activa', sede.Activa);
        form.append('Horarios', sede.Horarios);
        form.append('Direccion', sede.Direccion);
        form.append('Latitud', sede.Latitud);
        form.append('Longitud', sede.Longitud);
        form.append('URLImagen1', sede.URLImagen1);
        form.append('URLImagen2', sede.URLImagen2);
        form.append('URLImagen3', sede.URLImagen3);
        form.append('URLImagen4', sede.URLImagen4);
        form.append('URLImagen5', sede.URLImagen5);
        form.append('URLImagen6', sede.URLImagen6);
        form.append('URLImagen7', sede.URLImagen7);
        form.append('URLImagen8', sede.URLImagen8);
        form.append('URLImagen9', sede.URLImagen9);
        form.append('URLImagen10', sede.URLImagen10);
        form.append('URLImagen11', sede.URLImagen11);
        form.append('URLImagen12', sede.URLImagen12);
        form.append('URLImagen13', sede.URLImagen13);
        form.append('URLImagen14', sede.URLImagen14);

        form.append('EsVideo1', false);
        form.append('EsVideo2', false);
        form.append('EsVideo3', false);
        form.append('EsVideo4', false);
        form.append('EsVideo5', false);
        form.append('EsVideo6', sede.EsVideo6);
        form.append('EsVideo7', sede.EsVideo7);
        form.append('EsVideo8', sede.EsVideo8);
        form.append('EsVideo9', sede.EsVideo9);
        form.append('EsVideo10', sede.EsVideo10);
        form.append('EsVideo11', sede.EsVideo11);
        form.append('EsVideo12', sede.EsVideo12);
        form.append('EsVideo13', sede.EsVideo13);
        form.append('EsVideo14', sede.EsVideo14);

        form.append('Precio', sede.Precio);
        form.append('InstagramUrl', sede.InstagramUrl);
        form.append('NombreInstagram', sede.NombreInstagram);
        form.append('FacebookUrl', sede.FacebookUrl);
        form.append('NombreFacebook', sede.NombreFacebook);
        form.append('Correo', sede.Correo);
        form.append('Tips', sede.Tips);
        form.append('EnTips', sede.EnTips);
        form.append('NombreTwitter', sede.NombreTwitter);
        form.append('TwitterUrl', sede.TwitterUrl);
        form.append('Pagina', sede.Pagina);
        form.append('IdMunicipio', sede.IdMunicipio);
        form.append('IdTipoSede', sede.IdTipoSede);
        form.append('IdEmpresa', sede.IdEmpresa);
        form.append('Descripcion', sede.Descripcion);
        form.append('EnDescripcion', sede.EnDescripcion);
        form.append('Anexo', sede.Anexo);
        form.append('EnAnexo', sede.EnAnexo);
        form.append('IdCategoriaSubcategoria', sede.IdCategoriaSubcategoria);

        loader.show();
        this.props.editar_sede(form, this.props.user, this);


    }




    render() {
        const { sede } = this.state;
    

        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              
            >

                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar Sede
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {sede?
                        <Form onSubmit={this.EditSedeSubmit} >

                            <Form.Row>
                                <div id="map" />
                            </Form.Row>
                            <Form.Row sm={10} className=" d-flex justify-content-center mb-3 mt-3 pt-3 pb-3" style={{ background: "#ccc" }}>

                                {this.state.sede.Imagen !== '' ?

                                    <Image src={`/app-images/${this.state.sede.Imagen}`} rounded /> :
                                    ""
                                }

                            </Form.Row>
                            <Form.Row sm={10}>
                                <Form.Group as={Col} >
                                    <label>Selecciona archivo para subir </label>
                                    <input className="pz-input" type="file" onChange={this.FileSelectChange} placeholder="Imagen" />

                                </Form.Group>
                            </Form.Row>
                            <Form.Group md="6" >
                                <Form.Control type="text" maxLength={100} name="Nombre" value={this.state.sede.Nombre} onChange={this.InputChange} className="pz-input" placeholder="Nombre" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="number" name="Telefono" value={this.state.sede.Telefono} onChange={this.InputChange} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10); }}
                                    onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()} className="pz-input" placeholder="Telefono" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="number" name="Celular" value={this.state.sede.Celular} onChange={this.InputChange} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12); }}
                                    onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()} className="pz-input" placeholder="Celular" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" maxLength={100} name="Horarios" value={this.state.sede.Horarios} onChange={this.InputChange} className="pz-input" placeholder="Horarios" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="Descripcion" value={this.state.sede.Descripcion} onChange={this.InputChange} className="pz-input" placeholder="Descripcion" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="EnDescripcion" value={this.state.sede.EnDescripcion} onChange={this.InputChange} className="pz-input" placeholder="Descripcion en ingles" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" maxLength={144} name="Anexo" value={sede.Anexo} onChange={this.InputChange} className="pz-input" placeholder="Anexo" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" maxLength={144} name="EnAnexo" value={sede.EnAnexo} onChange={this.InputChange} className="pz-input" placeholder="Anexo en ingles" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="Precio" value={sede.Precio} onChange={this.InputChange} className="pz-input" placeholder="Rango de Precios" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" maxLength={100} name="Direccion" value={this.state.sede.Direccion} onChange={this.InputChange} className="pz-input" placeholder="Dirección" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" maxLength={100} name="Latitud" value={this.state.sede.Latitud} onChange={this.InputChange} className="pz-input" placeholder="Latitud" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" maxLength={100} name="Longitud" value={this.state.sede.Longitud} onChange={this.InputChange} className="pz-input" placeholder="Longitud" />
                            </Form.Group>


                            <ListGroup className="pt-1 pb-2">
                                <ListGroup.Item>
                                    <h3>Galería principal</h3>


                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen1" value={sede.URLImagen1} onChange={this.InputChange} className="pz-input" placeholder="URLImagen1" />
                                        </Form.Group>
                                        
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen2" value={sede.URLImagen2} onChange={this.InputChange} className="pz-input" placeholder="URLImagen2" />
                                        </Form.Group>
                                       
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen3" value={sede.URLImagen3} onChange={this.InputChange} className="pz-input" placeholder="URLImagen3" />
                                        </Form.Group>
                                     
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen4" value={sede.URLImagen4} onChange={this.InputChange} className="pz-input" placeholder="URLImagen4" />
                                        </Form.Group>
                               
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen5" value={sede.URLImagen5} onChange={this.InputChange} className="pz-input" placeholder="URLImagen5" />
                                        </Form.Group>
                                      
                                    </Form.Group>

                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h3>Galería Secundaría</h3>
                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen6" value={sede.URLImagen6} onChange={this.InputChange} className="pz-input" placeholder="URLImagen6" />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <CheckBoxComponent label='EsVideo' checked={this.state.sede.EsVideo6} change={(val) => { this.InputChange({ target: { name: 'EsVideo6', value: val.checked } }); }} />
                                        </Form.Group>
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen7" value={sede.URLImagen7} onChange={this.InputChange} className="pz-input" placeholder="URLImagen7" />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <CheckBoxComponent label='EsVideo' checked={this.state.sede.EsVideo7} change={(val) => { this.InputChange({ target: { name: 'EsVideo7', value: val.checked } }); }} />
                                        </Form.Group>
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen8" value={sede.URLImagen8} onChange={this.InputChange} className="pz-input" placeholder="URLImagen8" />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <CheckBoxComponent label='EsVideo' checked={this.state.sede.EsVideo8} change={(val) => { this.InputChange({ target: { name: 'EsVideo8', value: val.checked } }); }} />
                                        </Form.Group>
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen9" value={sede.URLImagen9} onChange={this.InputChange} className="pz-input" placeholder="URLImagen9" />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <CheckBoxComponent label='EsVideo' checked={this.state.sede.EsVideo9} change={(val) => { this.InputChange({ target: { name: 'EsVideo9', value: val.checked } }); }} />
                                        </Form.Group>
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen10" value={sede.URLImagen10} onChange={this.InputChange} className="pz-input" placeholder="URLImagen10" />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <CheckBoxComponent label='EsVideo' checked={this.state.sede.EsVideo10} change={(val) => { this.InputChange({ target: { name: 'EsVideo10', value: val.checked } }); }} />
                                        </Form.Group>
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen11" value={sede.URLImagen11} onChange={this.InputChange} className="pz-input" placeholder="URLImagen11" />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <CheckBoxComponent label='EsVideo' checked={this.state.sede.EsVideo11} change={(val) => { this.InputChange({ target: { name: 'EsVideo11', value: val.checked } }); }} />
                                        </Form.Group>
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen12" value={sede.URLImagen12} onChange={this.InputChange} className="pz-input" placeholder="URLImagen12" />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <CheckBoxComponent label='EsVideo' checked={this.state.sede.EsVideo12} change={(val) => { this.InputChange({ target: { name: 'EsVideo12', value: val.checked } }); }} />
                                        </Form.Group>
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen13" value={sede.URLImagen13} onChange={this.InputChange} className="pz-input" placeholder="URLImagen13" />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <CheckBoxComponent label='EsVideo' checked={this.state.sede.EsVideo13} change={(val) => { this.InputChange({ target: { name: 'EsVideo13', value: val.checked } }); }} />
                                        </Form.Group>
                                    </Form.Group>

                                    <Form.Group md="6" >
                                        <Form.Group as={Col} >
                                            <Form.Control type="text" name="URLImagen14" value={sede.URLImagen14} onChange={this.InputChange} className="pz-input" placeholder="URLImagen14" />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <CheckBoxComponent label='EsVideo' checked={this.state.sede.EsVideo14} change={(val) => { this.InputChange({ target: { name: 'EsVideo14', value: val.checked } }); }} />
                                        </Form.Group>
                                    </Form.Group>
                                </ListGroup.Item>
                            </ListGroup>

                            <Form.Group md="6" >
                                <Form.Control type="text" name="NombreTwitter" value={sede.NombreTwitter} onChange={this.InputChange} className="pz-input" placeholder="NombreTwitter" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="TwitterUrl" value={sede.TwitterUrl} onChange={this.InputChange} className="pz-input" placeholder="TwitterUrl" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="NombreFacebook" value={sede.NombreFacebook} onChange={this.InputChange} className="pz-input" placeholder="NombreFacebook" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="FacebookUrl" value={sede.FacebookUrl} onChange={this.InputChange} className="pz-input" placeholder="FacebookUrl" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="NombreInstagram" value={sede.NombreInstagram} onChange={this.InputChange} className="pz-input" placeholder="NombreInstagram" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="InstagramUrl" value={sede.InstagramUrl} onChange={this.InputChange} className="pz-input" placeholder="InstagramUrl" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="Correo" value={sede.Correo} onChange={this.InputChange} className="pz-input" placeholder="Correo" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="Pagina" value={sede.Pagina} onChange={this.InputChange} className="pz-input" placeholder="Pagina" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="Tips" value={sede.Tips} onChange={this.InputChange} className="pz-input" placeholder="Tips" />
                            </Form.Group>
                            <Form.Group md="6" >
                                <Form.Control type="text" name="EnTips" value={sede.EnTips} onChange={this.InputChange} className="pz-input" placeholder="Tips en ingles" />
                            </Form.Group>

                            <Form.Group md="6" >
                                <div className="input-group" >
                                    <ComboBoxComponent name="IdMunicipio" value={this.state.sede.IdMunicipio} showClearButton={false} allowCustom={false} fields={this.fieldsMunicipio} change={(val) => { this.InputChange({ target: { name: 'IdMunicipio', value: val.value } }); }} allowFiltering={true} placeholder="Municipio" className="pz-input" dataSource={this.props.init_editar_sede.municipios} />
                                </div>
                            </Form.Group>

                            <Form.Group md="6" >
                                <div className="input-group" >
                                    <ComboBoxComponent name="IdTipoSede" value={this.state.sede.IdTipoSede} autofill={true} showClearButton={false} allowCustom={false} fields={this.fieldsTipoSede} change={(val) => { this.InputChange({ target: { name: 'IdTipoSede', value: val.value } }); }} allowFiltering={true} placeholder="Tipo sede" className="pz-input" dataSource={this.props.init_editar_sede.tiposSede} />
                                </div>
                            </Form.Group>

                            {this.props.init_editar_sede.categorias.length > 0 ?
                                <Form.Group md="7" >
                                    <div className="input-group" >
                                        <ComboBoxComponent name="Idcategoria" value={this.state.sede.IdCategoria} autofill={true} showClearButton={false} allowCustom={false} fields={this.fieldsCategoria} change={(val) => { this.cargarSubcategorias({ target: { name: 'IdCategoria', value: val.value, elemento: val } }); }} allowFiltering={true} placeholder="Categoria" className="pz-input" dataSource={this.props.init_editar_sede.categorias} />
                                    </div>
                                </Form.Group>
                                : ""
                            }

                            {this.state.CategoriasSubcategorias.length > 0?
                                < Form.Group md="6" >
                                    <div className="input-group" >

                                        <ComboBoxComponent name="IdCategoriaSubcategoria" showClearButton={false} value={this.state.IdCategoriaSubcategoria} allowCustom={false} fields={this.fieldsCatSub} change={(val) => { this.InputChange({ target: { name: 'IdCategoriaSubcategoria', value: val.value } }); }} allowFiltering={true} placeholder="SubCategoría" className="pz-input" dataSource={this.state.CategoriasSubcategorias} />
                                    </div>
                                </Form.Group> :
                                ""
                            }
                                
                            


                            <Form.Row sm={10}>
                                <Form.Group as={Col} >
                                    <button type="submit" className="btn btn-default btn-3d-style  btn-block">Grabar </button>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <button type="button" onClick={this.props.onHide} className="btn btn-default btn-3d-style  btn-block">Cancelar </button>
                                </Form.Group>
                            </Form.Row>

                        </Form>
                        :""
                    }
                </Modal.Body>

            </Modal>

        );
    }
}


//-------------------------------Redux------------------------

function mapStateToProps(state) {
    const { mostrar_editar_sede, init_editar_sede, id_sede_seleccionada } = state.sedesReducer;
    const { cat_sub } = state.reducerSubCategoria;
    const { centerInitial, zoomMap } = state.mapsReducer;
    const { cate } = state.categoria;
    const { user } = state.authentication;
    return { mostrar_editar_sede, init_editar_sede, user, id_sede_seleccionada, centerInitial, zoomMap, cate, cat_sub};
}


const mapDispatchToProps = {
    obtener_empresas: EmpresaActions.obtener_empresas,
    showMessage: alertActions.showMessage,
    ver_editar_sede: SedeActions.ver_editar_sede,
    cargar_editar_sede: SedeActions.cargar_editar_sede,
    editar_sede: SedeActions.editar_sede,
    sede_seleccionada: SedeActions.sede_seleccionada,
    cargar_subcategorias: SedeActions.cargar_subcategorias,
    obtener_cat: categoriaActions.obtener_cat,
    obtener_cate_subcategoria: subcategoriaActions.obtener_cate_subcategoria

};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarSede));