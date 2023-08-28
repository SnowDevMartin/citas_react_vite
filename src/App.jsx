import { useState, useEffect } from "react"
import Header from "./components/header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"
import Paciente from "./components/Paciente";

function App() {

  const INITIAL = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  const[pacientes, setPacientes]= useState(INITIAL);
  const[paciente, setPaciente] = useState({});
  const [msgAlert, setMsgAlert] = useState(false);

  

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id);
    setMsgAlert('Eliminado')
    setPacientes(pacientesActualizados)
  }

  return (
      <div className="container mx-auto mt-20">
        <Header />

        <div className="md:flex mt-12">
          <Formulario 
            pacientes={pacientes}
            setPacientes={setPacientes}
            paciente={paciente}
            setPaciente={setPaciente}
            setMsgAlert={setMsgAlert}
          />
          <ListadoPacientes 
            pacientes={pacientes}
            setPaciente={setPaciente}
            paciente={paciente}
            msgAlert={msgAlert}
            setMsgAlert={setMsgAlert}
            eliminarPaciente={eliminarPaciente}
          />
        </div>
      </div>
  )
}

export default App
