import { useState } from 'react';
import CustomNavbar from './navbar';
import { useUsuario } from '../context/UsuarioContext';
import { useArchivadores } from '../context/ArchivadoresContext';

const AddDocument = () => {
    const { datosUsuario } = useUsuario();
    console.log('Datos del usuario:', datosUsuario);
    const { archivadorSeleccionado } = useArchivadores();
    console.log('Archivador seleccionado:', archivadorSeleccionado);

    const [formData, setFormData] = useState({
        archivoDocumento: null,
        numeroDocumento: '',
        numeroFolio: '',
        personaDirigido: '',
        ubicacion: '',
        descripcion: '',
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'file' ? e.target.files[0] : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = new FormData();
        dataToSend.append('archivoDocumento', formData.archivoDocumento);
        dataToSend.append('numeroDocumento', formData.numeroDocumento);
        dataToSend.append('numeroFolio', formData.numeroFolio);
        dataToSend.append('personaDirigido', formData.personaDirigido);
        dataToSend.append('ubicacion', formData.ubicacion);
        dataToSend.append('descripcion', formData.descripcion);

        try {
            const response = await fetch('https://backend-production-8aa0.up.railway.app/api/documentos/', {
                method: 'POST',
                body: dataToSend,
            });

            console.log('Respuesta del servidor:', response);
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        }

        setFormData({
            archivoDocumento: null,
            numeroDocumento: '',
            numeroFolio: '',
            personaDirigido: '',
            ubicacion: '',
            descripcion: '',
        });
    };


    return (
        <div style={{ display: "flex" }}>
            <CustomNavbar />
            <div className="container mt-4">
                <div style={{ display: "flex" }}>
                    <i className="bi bi-file-earmark-binary-fill fs-4"></i>
                    <h1 className="mb-4">NUEVO DOCUMENTO</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="archivoDocumento" className="form-label">
                            Subir Archivo:
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="archivoDocumento"
                            name="archivoDocumento"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="numeroDocumento" className="form-label">
                            Número Documento:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="numeroDocumento"
                            name="numeroDocumento"
                            value={formData.numeroDocumento}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="numeroFolio" className="form-label">
                            Número Folio:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="numeroFolio"
                            name="numeroFolio"
                            value={formData.numeroFolio}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="personaDirigido" className="form-label">
                            Persona Dirigido:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="personaDirigido"
                            name="personaDirigido"
                            value={formData.personaDirigido}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ubicacion" className="form-label">
                            Ubicación:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="ubicacion"
                            name="ubicacion"
                            value={formData.ubicacion}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">
                            Descripción:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Guardar Documento
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDocument;
