import { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import CustomNavbar from "../components/navbar";

const ListPeriods = () => {

    const [showModal, setShowModal] = useState(false);
    const [periods, setPeriods] = useState([]);
    const [newPeriod, setNewPeriod] = useState({ periodo: "", descripcion: "", isActive: true });

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleNewPeriodSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/periods/periods', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPeriod),
            });

            const data = await response.json();

            if (data.success) {
                // Actualizar la lista de periodos después de agregar uno nuevo
                fetchPeriods();
                handleClose();
                setNewPeriod({ periodo: "", descripcion: "", isActive: "activo" }); // Limpiar el formulario
            } else {
                console.error('Error creating period:', data.message);
            }
        } catch (error) {
            console.error('Error creating period:', error);
        }
    };
    const fetchPeriods = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/periods');
            const data = await response.json();
            if (data.success) {
                setPeriods(data.periods);
            } else {
                console.error('Error fetching periods:', data.message);
            }
        } catch (error) {
            console.error('Error fetching periods:', error);
        }
    };

    useEffect(() => {
        fetchPeriods();
    }, []); // Llamar a fetchPeriods al montar el componente


    return (
        <>
            <div style={{ display: "flex" }}>
                <CustomNavbar />
                <div style={{ marginTop: "20px", textAlign: "left", marginLeft: "50px", marginRight: "50px" }}>
                    <div style={{ display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 15 15"><path fill="none" stroke="#000000" d="M13.5 5.5h-12m12 0a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1m12 0a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1m-12-4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1m12 0h-12m12 0a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1m.5-6h3m-3 4h3m-3 4h3" /></svg>
                        <h2 style={{ marginLeft: "20px" }}>LISTA DE LOS PERIODOS DE ALCALDIA</h2>
                    </div>
                    <hr />
                    <div style={{ backgroundColor: "white", borderRadius: "5px", padding: "15px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px", marginBottom: "10px" }}>
                            <span>Todos los Periodos Registrados</span>
                            <div>
                                <button style={{ backgroundColor: "#398ac9", marginRight: "10px", }} onClick={handleShow}
                                > + Nuevo Periodo</button>
                                <button style={{ backgroundColor: "#008a68" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                                        <path fill="#ffffff" d="M12 10H6.78A11 11 0 0 1 27 16h2A13 13 0 0 0 6 7.68V4H4v8h8zm8 12h5.22A11 11 0 0 1 5 16H3a13 13 0 0 0 23 8.32V28h2v-8h-8z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px", marginBottom: "10px" }}>
                            <div>
                                <label htmlFor="showRecords">Mostrar </label>
                                <select id="showRecords" name="showRecords">
                                    <option value="10">10</option>
                                    <option value="15" selected>15</option>
                                    <option value="20">20</option>
                                </select>
                                <span> registros</span>
                            </div>
                            <div>
                                <span>Buscar:</span><input type="text" placeholder="Buscar" style={{ backgroundColor: "white", color: "black" }} />
                            </div>
                        </div>
                        <hr />


                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px", marginBottom: "10px" }}>
                            <div >
                                <span>Periodo de Alcaldia</span>
                            </div>
                            <div>
                                <span>Gestionar</span>
                            </div>

                        </div>
                        <hr />

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px", marginBottom: "10px" }}>
                            <div>
                                <button style={{ backgroundColor: "#00896a" }} >
                                    Seleccionar
                                </button>
                                {periods.map((period) => (
                                    <div key={period.id}>
                                        <span style={{ paddingLeft: "10px" }}>{period.periodo}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button style={{ backgroundColor: "#fea60d" }}>
                                    Configuracion
                                </button>
                            </div>
                        </div>
                        <hr />


                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px" }}>
                            <div>
                                <span>Mostrando registros del 1 al 1 de un total de 1 registros</span>
                            </div>
                            <div>
                                <button style={{ backgroundColor: "white", color: "black" }}>
                                    Anterior
                                </button>
                                <span>1</span>
                                <button style={{ backgroundColor: "white", color: "black" }}>
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registro de un nuevo Periodo del Gobierno</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleNewPeriodSubmit}>
                            <Form.Group controlId="period">
                                <Form.Label>Periodo:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el periodo"
                                    value={newPeriod.periodo}
                                    onChange={(e) => setNewPeriod({ ...newPeriod, periodo: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Descripción:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese la descripción"
                                    value={newPeriod.descripcion}
                                    onChange={(e) => setNewPeriod({ ...newPeriod, descripcion: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="isActive">
                                <Form.Label>Estado:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={newPeriod.isActive}
                                    onChange={(e) => setNewPeriod({ ...newPeriod, isActive: e.target.value === "true" })}
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </Form.Control>
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

            </div>

        </>
    )
}

export default ListPeriods
