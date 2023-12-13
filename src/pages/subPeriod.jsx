import { useState } from 'react';
import CustomNavbar from '../components/navbar';
import ModalCrearArchivador from '../modal/ModalCrearArchivador';
import { usePeriodo } from '../context/PeriodoContext';

const SubPeriod = () => {
    const { periodoSeleccionado } = usePeriodo(); // Obtiene el periodo desde el contexto

    console.log('periodoSeleccionado:', periodoSeleccionado);

    // // Estado para almacenar la información del periodo desde el backend
    const [archivadores, setArchivadores] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    const abrirModal = () => setMostrarModal(true);
    const cerrarModal = () => setMostrarModal(false);



    // Imprime los datos en la consola
    console.log('Periodo Seleccionado:', periodoSeleccionado);
    // console.log('Archivadores:', archivadores);


    return (
        <div style={{ display: "flex" }}>
            <CustomNavbar />
            <div className="container mt-5" style={{ backgroundColor: "white" }}>
                <i className="bi bi-box fs-4" style={{ marginRight: "5px" }}></i>
                <span className="h4">PERIODO {periodoSeleccionado?.periodo}</span>
                <hr className="my-4" />
                <div className="d-flex justify-content-between align-items-center">
                    <p className="lead">
                        Archivadores que corresponden a este periodo
                    </p>
                    <button className="btn btn-primary" >
                        <i className="bi bi-plus"></i>
                        <i className="bi bi-journals"></i>
                        CREAR NUEVO ARCHIVADOR
                    </button>
                </div>
                Mostrar la información de los archivadores
                {archivadores.length > 0 ? (
                    <ul>
                        {archivadores.map((archivador, index) => (
                            <li key={index}>{archivador.nombre_archivador} - {archivador.descripcion}</li>
                        ))}
                    </ul>
                ) : (
                    <div className="alert alert-warning mt-3" role="alert">
                        No hay ningún Archivador Creado dentro de este periodo
                    </div>
                )}
                <div className="alert alert-warning mt-3" role="alert">
                    No hay ningún Archivador Creado dentro de este periodo
                </div>
                Renderizar el modal
                <ModalCrearArchivador
                    mostrar={mostrarModal}
                    cerrarModal={cerrarModal}
                />
            </div>

        </div>
    );
}

export default SubPeriod;
