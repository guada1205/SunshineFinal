// import { pool } from '../db.js'

// export const loginUser = async (req, res) => { 
//   const { Email_Usuario, Contrasena_Usuario } = req.body;

//   try {
//     app.post('/api/login', (req, res) => {
//   const { email, contrasena } = req.body;

//   const query = 'SELECT * FROM usuarios WHERE Email_Usuario = ?';
//   pool.query(query, [email], (error, results) => {
//     if (error) {
//       console.error('Error al buscar usuario:', error);
//       res.status(500).json({ mensaje: 'Error al buscar usuario' });
//     } else {
//       if (results.length === 0) {
//         // Usuario no encontrado
//         res.status(401).json({ mensaje: 'Usuario no encontrado' });
//       } else {
//         const usuario = results[0];
//         if (usuario.Contrasena_Usuario === contrasena) {
//           // Contraseña válida, envía los datos del usuario
//           res.status(200).json(usuario);
//         } else {
//           // Contraseña incorrecta
//           res.status(401).json({ mensaje: 'Contraseña incorrecta' });
//         }
//       }
//     }
//   });
// });
//   } catch (error) {
//     res.status(500).json({ mensaje: 'Error al buscar usuario' });
//   }


// }