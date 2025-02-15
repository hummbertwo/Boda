import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nombre, email } = req.body;
    await db.collection("asistencias").add({ nombre, email, fecha: new Date() });
    res.status(200).json({ mensaje: "Asistencia registrada" });
  } else {
    res.status(405).json({ mensaje: "Método no permitido" });
  }
}
