import React, { useState } from 'react';

const Validar = () => {
  const [ticket, setTicket] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/validar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email }),
    });

    const data = await res.json();
    if (data && data.status === 'ok') {
      setTicket(data.ticket);  // Aquí actualizas el estado con el ticket
      setMensaje(data.mensaje); // Aquí actualizas el estado con el mensaje
    } else {
      setMensaje(data?.mensaje || 'Hubo un error al procesar tu registro.');
    }
  };

  return (
    <div>
      <h1>Validar Invitado</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Validar</button>
      </form>
      
      {ticket && (
        <div>
          <h2>Tu ticket: {ticket}</h2>
          <p>{mensaje}</p>
        </div>
      )}
    </div>
  );
};

export default Validar;
