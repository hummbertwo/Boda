import { db } from "../../lib/firebase";


export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Aquí va tu lógica para procesar el POST
      const { nombre, email } = req.body;
      // Verifica si la lógica funciona y responde adecuadamente
      return res.status(200).json({ status: 'ok', ticket: '1234' });
    } else {
      // Responde con un error si el método no es POST
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  