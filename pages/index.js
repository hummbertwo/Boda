// /pages/index.js
import { useState } from 'react';
import QRCode from 'react-qr-code';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [ticket, setTicket] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/validar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email }),
    });

    const data = await res.json();
    if (data && data.status === "ok") {
      setTicket(data.ticket);
      setMensaje(data.mensaje);
    } else {
      setMensaje(data?.mensaje || "Hubo un error al procesar tu registro.");
    }
  };
  
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold">Registro a la Boda 💍</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mt-4">
        <input
          className="border p-2 w-full my-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="border p-2 w-full my-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Registrarme
        </button>
      </form>
      {mensaje && <p className="mt-4">{mensaje}</p>}
      {ticket && <p className="mt-4 font-bold">🎫 Tu ticket: {ticket}</p>}
      {ticket && <QRCode value={ticket} size={150} />}
    </div>
  );
}
