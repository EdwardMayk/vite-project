import { useState } from "react";
import ListPeriods from "./ListPeriods";


const Inicio = () => {

  const [mostrarNuevoComponente, setMostrarNuevoComponente] = useState(false);

  // Función para manejar el clic en el botón "Seleccionar"
  const handleSeleccionarClick = () => {
    // Cambia el estado para mostrar o ocultar el nuevo componente
    setMostrarNuevoComponente(!mostrarNuevoComponente);
  };


  return (
    <>
      {!mostrarNuevoComponente && (

        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <div style={{ paddingBottom: "20px" }}>
            <span>FOLDER FILE</span>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", marginRight: "20px" }}>
              <div style={{ backgroundColor: "#78879c", padding: "20PX" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="#ffffff" d="M0 20v-2h2V3h20v15h2v2H0Zm10-2h4v-1h-4v1Z" /></svg>
              </div>
              <div style={{ backgroundColor: "white", paddingRight: "100px", }}>

                <div style={{ display: "flex", flexDirection: "column", paddingTop: "20px", paddingLeft: "20px", fontFamily: "bold" }}>
                  <span>AREAS</span>
                  <span>1</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", marginRight: "20px" }}>
              <div style={{ backgroundColor: "#f76f35", padding: "20PX" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 256 256"><path fill="#ffffff" d="M224 64h-69.33l-27.74-20.8a16.12 16.12 0 0 0-9.6-3.2H72a16 16 0 0 0-16 16v16H40a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h152.89A15.13 15.13 0 0 0 208 200.89V184h16.89A15.13 15.13 0 0 0 240 168.89V80a16 16 0 0 0-16-16Zm0 104h-16v-56a16 16 0 0 0-16-16h-69.33L94.93 75.2a16.12 16.12 0 0 0-9.6-3.2H72V56h45.33l27.74 20.8a16.12 16.12 0 0 0 9.6 3.2H224Z" /></svg>              </div>
              <div style={{ backgroundColor: "white", paddingRight: "100px", alignItems: "center" }}>

                <div style={{ display: "flex", flexDirection: "column", paddingTop: "20px", paddingLeft: "20px", fontFamily: "bold" }}>
                  <span>CARPETAS</span>
                  <span>1</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", marginRight: "20px" }}>
              <div style={{ backgroundColor: "#008a66", padding: "20PX" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5c-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1c.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5c.3-.3.5-.7.5-1.1V6.5L15.5 2z" /><path d="M3 7.6v12.8c0 .4.2.8.5 1.1c.3.3.7.5 1.1.5h9.8M15 2v5h5" /></g></svg>
              </div>
              <div style={{ backgroundColor: "white", paddingRight: "100px", alignItems: "center" }}>

                <div style={{ display: "flex", flexDirection: "column", paddingTop: "20px", paddingLeft: "20px", fontFamily: "bold" }}>
                  <span>DOCUMENTOS</span>
                  <span>1</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", marginRight: "20px" }}>
              <div style={{ backgroundColor: "#fea500", padding: "20PX" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 256 256"><path fill="#ffffff" d="M117.25 157.92a60 60 0 1 0-66.5 0a95.83 95.83 0 0 0-47.22 37.71a8 8 0 1 0 13.4 8.74a80 80 0 0 1 134.14 0a8 8 0 0 0 13.4-8.74a95.83 95.83 0 0 0-47.22-37.71ZM40 108a44 44 0 1 1 44 44a44.05 44.05 0 0 1-44-44Zm210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16a44 44 0 1 0-16.34-84.87a8 8 0 1 1-5.94-14.85a60 60 0 0 1 55.53 105.64a95.83 95.83 0 0 1 47.22 37.71a8 8 0 0 1-2.33 11.07Z" /></svg>            </div>
              <div style={{ backgroundColor: "white", paddingRight: "100px", alignItems: "center" }}>

                <div style={{ display: "flex", flexDirection: "column", paddingTop: "20px", paddingLeft: "20px", fontFamily: "bold" }}>
                  <span>USUARIOS</span>
                  <span>1</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      )}
      {!mostrarNuevoComponente && (
        <div style={{ backgroundColor: "white", marginTop: "50px", display: "flex", flexDirection: "column", alignItems: "center", width: "60%", borderRadius: "10px" }}>
          <div style={{ backgroundColor: "white", marginTop: "20px", marginBottom: "20px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "5px 300px" }}>
            <span>Periodo de Alcaldia</span>
          </div>
          <div style={{ padding: "5px" }}>
            <button style={{ backgroundColor: "#00896a" }} onClick={handleSeleccionarClick}>
              Seleccionar
            </button>
            <span style={{ paddingLeft: "300px" }}>2021-2024</span>
          </div>
        </div>
      )}

      {/* Nuevo componente que se mostrará o no según el estado */}
      {mostrarNuevoComponente && (
        <div style={{ marginTop: "20px", padding: "10px", borderRadius: "10px", textAlign: "center" }}>
          <ListPeriods />
        </div>
      )}
    </>
  );
}

export default Inicio;
