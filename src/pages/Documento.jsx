import { useEffect, useState } from 'react';
import { useUsuario } from '../context/UsuarioContext';
import { useArchivadores } from '../context/ArchivadoresContext';
import CustomNavbar from '../components/navbar';
import { Button, Alert, Table, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa la hoja de estilos de Bootstrap Icons
import { Link } from 'react-router-dom';

const Documentos = () => {
    const { datosUsuario } = useUsuario();
    const { archivadorSeleccionado } = useArchivadores();

    const [documentosRegistrados, setDocumentosRegistrados] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [recordsPerPage, setRecordsPerPage] = useState(15);

    useEffect(() => {
        const obtenerDocumentos = async () => {
            try {
                const uuidUsuario = datosUsuario.uuid_usuario;
                const uuidArchivador = archivadorSeleccionado.uuid_archivador;

                const response = await fetch(`https://backend-production-8aa0.up.railway.app/api/documentos/${uuidUsuario}/${uuidArchivador}`);
                const data = await response.json();

                if (data.success) {
                    setDocumentosRegistrados(data.documentos);
                } else {
                    console.error('Error al obtener documentos:', data.error);
                }
            } catch (error) {
                console.error('Error al obtener documentos:', error);
            }
        };

        obtenerDocumentos();
    }, [datosUsuario, archivadorSeleccionado]);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [documentosPerPage] = useState(15);

    const indexOfLastDocumento = currentPage * documentosPerPage;
    const indexOfFirstDocumento = indexOfLastDocumento - documentosPerPage;
    const currentDocumentos = documentosRegistrados.slice(indexOfFirstDocumento, indexOfLastDocumento);

    const totalPages = Math.ceil(documentosRegistrados.length / documentosPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleRecordsPerPageChange = (e) => {
        setRecordsPerPage(e.target.value);
        setCurrentPage(1);
    }


    return (
        <div style={{ display: "flex", width: "100%" }}>
            <CustomNavbar />
            <div style={{ marginLeft: "50px", width: "100%", marginTop: "50px", marginRight: "50px" }}>
                <span className='h4'>DOCUMENTOS QUE PERTENECEN AL ARCHIVADOR: {archivadorSeleccionado && archivadorSeleccionado.nombre_archivador}</span>
                <hr />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className='h4'>DOCUMENTOS REGISTRADOS</span>

                    <Link to='/adddocument'>
                        <Button variant="primary" style={{ marginTop: "10px" }}>
                            AGREGAR DOCUMENTO
                        </Button>
                    </Link>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '10px' }}>Mostrar</p>
                        <Form.Select
                            style={{ marginLeft: '5px', marginRight: '5px' }}
                            value={recordsPerPage}
                            onChange={handleRecordsPerPageChange}
                        >
                            {[1, 5, 10, 15, 20].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Form.Select>
                        <p style={{ marginLeft: '5px' }}>{`${recordsPerPage > 1 ? 'registros' : 'registro'}`}</p>
                    </div>
                    <Form style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Form.Control
                            type="text"
                            placeholder="Buscar Documento"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form>
                </div>


                {documentosRegistrados.length === 0 && (
                    <Alert variant="info" style={{ width: "100%", marginTop: "20px" }}>
                        No hay ningún documento registrado dentro de este archivador.
                    </Alert>
                )}

                {documentosRegistrados.length > 0 && (
                    <Table striped bordered hover style={{ width: "100%", marginTop: "20px" }}>
                        <thead>
                            <tr>
                                <th>Nombre del Documento</th>
                                <th>Folio</th>
                                <th>Persona Dirigido</th>
                                <th>Activo</th>
                                <th>Revisar</th>
                                <th>Acción</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDocumentos
                                .filter((documento) =>
                                    documento.numero_documento.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((documento, index) => (
                                    <tr key={index}>
                                        <td>{documento.numero_documento}</td>
                                        <td>{documento.numero_folio}</td>
                                        <td>{documento.persona_dirigido}</td>
                                        <td>{documento.activo ? 'Sí' : 'No'}</td>
                                        <td>
                                            <i className="bi-eye" /> Revisar
                                        </td>
                                        <td>
                                            <Button variant="info" style={{ marginRight: "5px" }}>
                                                <i className="bi-pencil-square" /> Actualizar
                                            </Button>
                                            <Button variant="danger">
                                                <i className="bi-trash" /> Eliminar
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="primary">
                                                <i className="bi-eye" /> Detalle
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <p>
                            Mostrando {indexOfFirstDocumento + 1} -{' '}
                            {indexOfLastDocumento > documentosRegistrados.length
                                ? documentosRegistrados.length
                                : indexOfLastDocumento}{' '}
                            de {documentosRegistrados.length} documentos
                        </p>
                    </div>
                    <div className="pagination">
                        <Button variant="secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            Anterior
                        </Button>
                        <span className="mx-2"> {currentPage}</span>
                        <Button variant="secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Siguiente
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documentos;
