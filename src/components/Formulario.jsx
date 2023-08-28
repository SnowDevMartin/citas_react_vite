import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente, setMsgAlert}) => {
  
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

 useEffect(() => {
    if( Object.keys(paciente).length > 0 ) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setAlta(paciente.alta)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validando formulario
    if([nombre, propietario, email, alta, sintomas].includes('')) {
      setError(true);
      return;
    }

    setError(false);

    // Objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas
    }

    if(paciente.id) {
      // Editando el registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )
      setPacientes(pacientesActualizados)
      setPaciente({})
      setMsgAlert('Editado')
    } else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([objetoPaciente, ...pacientes])
      setMsgAlert('Agregado')
    }


    // Reiniciar el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setAlta('')
    setSintomas('')

  }




  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">

      <h2 className="font-black text-3xl text-center">
        Seguimiento Pacientes
      </h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y {''} 
        <span className="text-indigo-600 font-bold text-lg">
          Adminístralos
        </span>
      </p>
      
    <form  onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
    {error && <Error><p>Todos los campos son obligatorios</p></Error>}
      <div className="mb-5">
        <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
        <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" onChange={ (e) => setNombre(e.target.value)} value={nombre} type="text" name="" id="mascota" placeholder="Nombre de la Mascota" />
      </div>
      <div className="mb-5">
        <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre del Propietario</label>
        <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" onChange={ (e) => setPropietario(e.target.value)} value={propietario} type="text" name="" id="propietario" placeholder="Nombre del Propietario" />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
        <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" onChange={ (e) => setEmail(e.target.value)} value={email} type="email" name="" id="email" placeholder="Email Contacto Propietario" />
      </div>
      <div className="mb-5">
        <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
        <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" onChange={ (e) => setAlta(e.target.value)} value={alta} type="date" name="" id="alta" />
      </div>
      <div className="mb-5">
        <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>
        <textarea className="border-2 rounded-md placeholder-gray-400 w-full mt-2 p-2" onChange={ (e) => setSintomas(e.target.value)} value={sintomas} placeholder="Describe los síntomas" name="" id="sintomas" cols="30" rows="5"/>
      </div>

      <input type="submit" className="bg-indigo-600 w-full text-white uppercase p-3 font-bold hover:bg-indigo-700 cursor-pointer transition-all"  value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}/>
    </form>

    </div>
  )
}

export default Formulario
