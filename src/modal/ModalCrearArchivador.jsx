import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ModalCrearArchivador = ({ mostrar, cerrarModal, crearArchivador }) => {
    const [nombreArchivador, setNombreArchivador] = useState('');
    const [codigo, setCodigo] = useState('');
    const [estante, setEstante] = useState('');
    const [modulo, setModulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [publico, setPublico] = useState(true);

    const handleCrearArchivador = () => {
        // Realiza la lógica para crear el archivador (puedes llamar a la función prop proporcionada)
        crearArchivador({
            nombre_archivador: nombreArchivador,
            codigo: codigo,
            estante: estante,
            modulo: modulo,
            descripcion: descripcion,
            publico: publico
        });

        // Limpia los campos del formulario
        setNombreArchivador('');
        setCodigo('');
        setEstante('');
        setModulo('');
        setDescripcion('');
        setPublico(true);

        // Cierra el modal
        cerrarModal();
    };

    return (
        <Modal show={mostrar} onHide={cerrarModal}>
            <Modal.Header closeButton>
                <Modal.Title>Crear Nuevo Archivador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNombreArchivador">
                        <Form.Label>Nombre del Archivador</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre del archivador"
                            value={nombreArchivador}
                            onChange={(e) => setNombreArchivador(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCodigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEstante">
                        <Form.Label>Estante</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el estante"
                            value={estante}
                            onChange={(e) => setEstante(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formModulo">
                        <Form.Label>Módulo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el módulo"
                            value={modulo}
                            onChange={(e) => setModulo(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Ingrese la descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPublico">
                        <Form.Check
                            type="checkbox"
                            label="Público"
                            checked={publico}
                            onChange={() => setPublico(!publico)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cerrarModal}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleCrearArchivador}>
                    Crear Archivador
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

ModalCrearArchivador.propTypes = {
    mostrar: PropTypes.bool.isRequired,
    cerrarModal: PropTypes.func.isRequired,
    crearArchivador: PropTypes.func.isRequired,
};

export default ModalCrearArchivador;
