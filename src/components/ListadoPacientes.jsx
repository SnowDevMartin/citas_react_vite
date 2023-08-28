import { useEffect, useState } from "react"
import Paciente from "./Paciente"
import Mensajes from "./Mensajes"

const ListadoPacientes = ({pacientes, setPaciente, msgAlert, setMsgAlert, eliminarPaciente}) => {

  const [msg, setMsg] = useState('')

  useEffect(() => {
      if(msgAlert === 'Editado') {
      setMsg('Paciente Editado')
      setTimeout(() => {
        setMsg('')
        setMsgAlert(false)
      }, 3000);
      } else if (msgAlert === 'Agregado') {
        setMsg('Paciente Nuevo Agregado')
        setTimeout(() => {
          setMsg('')
          setMsgAlert(false)
        }, 3000);
      } else if (msgAlert === 'Eliminado') {
        setMsg('Paciente Eliminado')
        setTimeout(() => {
          setMsg('')
          setMsgAlert(false)
        }, 3000);
      }
      
  }, [pacientes])

  return (
    <div  className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll mb-10">

      {pacientes && pacientes.length ? 
      (
        <>
          <h2 className="font-black text-center text-3xl">Listado Pacientes</h2>

          <p className="text-center mt-5 mb-10 text-xl">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {msgAlert && <Mensajes><p>{msg}</p></Mensajes>}
    
          {pacientes.map( (paciente) => (
            <Paciente 
            key={paciente.id}
            paciente={paciente}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
            />
            ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-center text-3xl">No hay pacientes</h2>

          <p className="text-center mt-5 mb-10 text-xl">
            Comienza agregando pacientes {''}
            <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
          </p>
        </>
      )
      }
      
    </div>
  )
}

export default ListadoPacientes
