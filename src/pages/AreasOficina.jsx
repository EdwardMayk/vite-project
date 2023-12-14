import { useEffect, useState } from 'react';
import { Button, Alert, Table, Form, Row, Col } from 'react-bootstrap';
import CustomNavbar from '../components/navbar';
import { useArea } from '../context/AreaContext';
import { Link } from 'react-router-dom';
import { useArchivadores } from '../context/ArchivadoresContext';

const AreasOficina = () => {
    const { selectedArea } = useArea();
    const { setArchivador } = useArchivadores();
    const [archivadores, setArchivadores] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [archivadoresPerPage] = useState(15);
    const [searchTerm, setSearchTerm] = useState('');
    const [recordsPerPage, setRecordsPerPage] = useState(15);

    useEffect(() => {
        // Realizar la solicitud al backend para obtener la lista de archivadores
        const fetchArchivadores = async () => {
            try {
                const response = await fetch(`https://backend-production-8aa0.up.railway.app/api/archivadores/${selectedArea.uuid_area}`);
                if (response.ok) {
                    const data = await response.json();
                    setArchivadores(data);
                } else {
                    setError('Error al obtener la lista de archivadores');
                }
            } catch (error) {
                setError('Error de red al obtener la lista de archivadores');
            }
        };

        if (selectedArea) {
            fetchArchivadores();
        }
    }, [selectedArea]);

    // Paginación
    const indexOfLastArchivador = currentPage * archivadoresPerPage;
    const indexOfFirstArchivador = indexOfLastArchivador - archivadoresPerPage;
    const currentArchivadores = archivadores.slice(indexOfFirstArchivador, indexOfLastArchivador);

    const handleActualizarArchivador = (archivador) => {
        console.log(`Actualizar archivador: ${archivador.nombre_archivador}`);
    };

    const handleEliminarArchivador = async (uuidArchivador) => {
        try {
            const response = await fetch(`https://backend-production-8aa0.up.railway.app/api/archivadores/${uuidArchivador}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Archivador con UUID ${uuidArchivador} eliminado exitosamente.`);
            } else {

                console.error(`Error al eliminar archivador con UUID ${uuidArchivador}`);
            }
        } catch (error) {
            console.error('Error de red al intentar eliminar el archivador', error);
        }
    };
    const totalRecords = archivadores.length;
    const totalPages = Math.ceil(totalRecords / archivadoresPerPage);

    const handleRecordsPerPageChange = (e) => {
        setRecordsPerPage(e.target.value);
        setCurrentPage(1);
    };

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

    return (
        <div style={{ display: "flex" }}>
            <CustomNavbar />
            <div style={{ width: "100%", margin: "20px" }}>
                <i className="bi bi-laptop fs-4"></i>
                <span className='h4'>
                    Área de Oficina {selectedArea && ` - ${selectedArea.nombre_area}`}
                </span>
                <div className="mt-3">
                    <Link to="/archivador">
                        <Button variant="primary">
                            Crear Archivador
                        </Button>
                    </Link>
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
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Buscar Archivador"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    {!archivadores.length ? (
                        <Alert variant="warning" className="mt-3">
                            No hay archivadores creados.
                        </Alert>
                    ) : (
                        <div>
                            <Table striped bordered hover className="mt-3">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Módulo</th>
                                        <th>Estante</th>
                                        <th>Descripción</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentArchivadores
                                        .filter((archivador) =>
                                            archivador.nombre_archivador.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((archivador) => (
                                            <tr key={archivador.uuid_archivador}>
                                                <td>

                                                    <i className="bi bi-folder" style={{ marginRight: '5px' }}></i>
                                                    <Link to={'/documentos'} onClick={() => {
                                                        setArchivador(archivador)
                                                        console.log('DOCUMENTOS ENVIANDO CONTEXTO', archivador)
                                                    }}>
                                                        {archivador.nombre_archivador}
                                                    </Link>
                                                </td>
                                                <td>{archivador.modulo}</td>
                                                <td>{archivador.estante}</td>
                                                <td>{archivador.descripcion}</td>
                                                <td style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleEliminarArchivador(archivador.uuid_archivador)}
                                                        style={{ marginLeft: '5px' }}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <p>
                                        Mostrando {indexOfFirstArchivador + 1} -{' '}
                                        {indexOfLastArchivador > totalRecords
                                            ? totalRecords
                                            : indexOfLastArchivador}{' '}
                                        de {totalRecords} {`${totalRecords > 1 ? 'archivadores' : 'archivador'}`}
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
                    )}
                    {error && (
                        <Alert variant="danger" className="mt-3">
                            {error}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AreasOficina;
