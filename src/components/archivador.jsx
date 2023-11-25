import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CustomNavbar from './navbar';
import { useArea } from '../context/AreaContext';
import { useNavigate } from 'react-router-dom';

const Archivador = () => {
    const { selectedArea } = useArea();
    const navigate = useNavigate();

    const [archivadorData, setArchivadorData] = useState({
        nombreArchivador: '',
        codigo: '',
        estante: '',
        modulo: '',
        descripcion: '',
        publico: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArchivadorData({
            ...archivadorData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construir el objeto de datos a enviar al backend
        const dataToSend = {
            ...archivadorData,
            uuidArea: selectedArea.uuid_area, // Asumiendo que selectedArea contiene el uuid
        };

        try {
            // Enviar datos al backend
            const response = await fetch('http://localhost:3000/api/archivadores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                console.log('Datos del formulario enviados con éxito');
                navigate(`/areasoficina`);

            } else {
                console.error('Error al enviar los datos al servidor');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <CustomNavbar />

            <div style={{ display: "flex", flexDirection: "column", marginLeft: "50px", width: "50%" }}>
                <h1>Archivador</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nombreArchivador">
                        <Form.Label>Nombre del Archivador</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreArchivador"
                            value={archivadorData.nombreArchivador}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="codigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="text"
                            name="codigo"
                            value={archivadorData.codigo}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="estante">
                        <Form.Label>Estante</Form.Label>
                        <Form.Control
                            type="text"
                            name="estante"
                            value={archivadorData.estante}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="modulo">
                        <Form.Label>Módulo</Form.Label>
                        <Form.Control
                            type="text"
                            name="modulo"
                            value={archivadorData.modulo}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="descripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            value={archivadorData.descripcion}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="publico">
                        <Form.Check
                            type="checkbox"
                            label="Público"
                            checked={archivadorData.publico}
                            onChange={() =>
                                setArchivadorData({
                                    ...archivadorData,
                                    publico: !archivadorData.publico,
                                })
                            }
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>
            </div>

        </div>

    );
};

export default Archivador;
