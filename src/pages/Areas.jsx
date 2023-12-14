import { useState, useEffect } from 'react';
import CustomNavbar from "../components/navbar";
import { usePeriodo } from "../context/PeriodoContext";
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useArea } from '../context/AreaContext';


const Areas = () => {
    const { periodoSeleccionado } = usePeriodo();
    const [areasRegistradas, setAreasRegistradas] = useState(false);
    const [areas, setAreas] = useState([]);
    const [nuevaArea, setNuevaArea] = useState({
        nombreArea: "",
        descripcion: "",
        publico: true,
        uuidPeriodo: periodoSeleccionado.uuid_periodo
    });
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const { setArea } = useArea()
    console.log('setarea', setArea)


    const [showEditModal, setShowEditModal] = useState(false);
    const [areaEditada, setAreaEditada] = useState({
        nombreArea: "",
        descripcion: "",
        publico: true,
    });


    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleShowEditModal = () => setShowEditModal(true);

    const handleActualizarArea = (area) => {
        setAreaEditada(area);
        handleShowEditModal(); // Muestra el modal de edición
    };
    const handleActualizarAreaExistente = async () => {
        try {
            const response = await fetch(`https://backend-production-8aa0.up.railway.app/api/areas/${areaEditada.uuid_area}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(areaEditada),
            });

            if (response.ok) {
                fetchAreas(); // Actualiza la lista de áreas después de la edición
                handleCloseEditModal(); // Cierra el modal después de la edición
            } else {
                console.error('Error al actualizar el área:', response.statusText);
            }
        } catch (error) {
            console.error('Error al actualizar el área:', error);
        }
    };

    const fetchAreas = async () => {
        try {
            const response = await fetch(`https://backend-production-8aa0.up.railway.app/api/areas/${periodoSeleccionado.uuid_periodo}`);
            const data = await response.json();
            setAreas(data);
            setAreasRegistradas(data.length > 0);
        } catch (error) {
            console.error('Error al obtener áreas:', error);
        }
    };

    useEffect(() => {
        // Llamada a la función cuando el componente se monta
        fetchAreas();
    }, [periodoSeleccionado]);

    const handleCrearNuevaArea = async () => {
        try {
            const response = await fetch('https://backend-production-8aa0.up.railway.app/api/areas/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaArea),
            });

            if (response.ok) {
                // Lógica adicional si es necesario después de crear el área
                // ...

                // Refrescar la lista de áreas
                fetchAreas();
                handleClose(); // Cierra el modal después de crear el área
            } else {
                console.error('Error al crear el área:', response.statusText);
            }
        } catch (error) {
            console.error('Error al crear el área:', error);
        }
    };

    const handleEliminarArea = async (uuidArea) => {
        try {
            console.log('uuidArea:', uuidArea);
            const response = await fetch(`https://backend-production-8aa0.up.railway.app/api/areas/${uuidArea}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Lógica adicional si es necesario después de eliminar el área
                // ...

                // Refrescar la lista de áreas
                fetchAreas();
            } else {
                console.error('Error al eliminar el área:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar el área:', error);
        }
    };

    const handleChangeNuevaArea = (e) => {
        const { name, value } = e.target;
        console.log(`name: ${name}, value: ${value}`);
        setNuevaArea((prev) => ({
            ...prev,
            [name]: value,

        }));
    };

    const handleChangeEditArea = (e) => {
        const { name, value } = e.target;

        console.log(`name: ${name}, value: ${value}`);

        setAreaEditada((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div style={{ display: "flex" }}>
            <CustomNavbar />
            <div className="container mt-5" style={{ backgroundColor: "white" }}>
                <i className="bi bi-box fs-4" style={{ marginRight: "5px" }}></i>

                <span className="h4">PERIODO {periodoSeleccionado?.periodo}</span>
                <div style={{ display: "flex", flexDirection: "column" }}>

                    {/* BOTON NUEVA AREA/OFICINA */}
                    <button className="btn btn-primary" onClick={handleShow} style={{ maxWidth: "300px" }}>
                        <i className="bi bi-plus"></i>
                        <i className="bi bi-journals"></i>
                        CREAR NUEVA AREA/OFICINA
                    </button>

                    {/* Modal para crear nueva área */}
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Crear Nueva Área/Oficina</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formNombreArea">
                                    <Form.Label>Nombre del Área</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombreArea"
                                        placeholder="Ingrese el nombre del área"
                                        value={nuevaArea.nombreArea}
                                        onChange={handleChangeNuevaArea}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDescripcion">
                                    <Form.Label>Descripción del Área</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="descripcion"
                                        placeholder="Ingrese la descripción del área"
                                        value={nuevaArea.descripcion}
                                        onChange={handleChangeNuevaArea}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPublico">
                                    <Form.Check
                                        type="checkbox"
                                        label="Público"
                                        name="publico"
                                        checked={nuevaArea.publico}
                                        onChange={handleChangeNuevaArea}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleCrearNuevaArea}>
                                Crear Área
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal para editar área */}
                    <Modal show={showEditModal} onHide={handleCloseEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Área/Oficina</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formNombreArea">
                                    <Form.Label>Nombre del Área</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombreArea"
                                        placeholder="Ingrese el nombre del área"
                                        value={areaEditada ? areaEditada.nombre_area : ""}
                                        onChange={handleChangeEditArea}
                                        disabled={false}  // Asegúrate de que no esté configurado como true
                                        readOnly={false}   // Asegúrate de que no esté configurado como true
                                    />

                                </Form.Group>
                                <Form.Group controlId="formDescripcion">
                                    <Form.Label>Descripción del Área</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="descripcion"
                                        placeholder="Ingrese la descripción del área"
                                        value={areaEditada ? areaEditada.descripcion : ""}
                                        onChange={handleChangeEditArea}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPublico">
                                    <Form.Check
                                        type="checkbox"
                                        label="Público"
                                        name="publico"
                                        checked={areaEditada ? areaEditada.publico : false}
                                        onChange={handleChangeEditArea}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEditModal}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleActualizarAreaExistente}>
                                Actualizar Área
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                {/* Condición para mostrar el cuadro rojo */}
                {!areasRegistradas && (
                    <div className="alert alert-danger mt-3" role="alert">
                        No hay ningún área/oficina registrada.
                    </div>
                )}

                {/* Mostrar las áreas */}
                {areasRegistradas && (
                    <div>
                        <h3>Áreas Registradas:</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nombre del Área/Oficina</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {areas.map((area) => (
                                    <tr key={area.id_area}>
                                        <td>
                                            <Link
                                                to={`/areasoficina`}
                                                onClick={() => {
                                                    setArea(area);
                                                    console.log('Datos que estamos enviando al contexto:', area);
                                                }}
                                            >
                                                {area.nombre_area}
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleEliminarArea(area.uuid_area)}
                                            >
                                                <i className="bi bi-trash"></i> Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Areas;
