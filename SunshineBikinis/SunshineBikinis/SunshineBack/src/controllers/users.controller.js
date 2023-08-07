import { pool } from '../db.js'

export const loginUser = async (req, res) => { 
  const { Email_Usuario, Contrasena_Usuario } = req.body;

  try {
    const query = 'SELECT u.idUsuario, u.Nombre_Usuario, u.Apellido_Usuario, u.Email_Usuario, u.numContacto_Usuario, u.Contrasena_Usuario, u.Domicilio_Usuario, p.Nombre_Permiso, u.fechaIngreso FROM Usuario u JOIN Permiso p ON u.Permiso_Usuario = p.idPermiso WHERE Email_Usuario = ?';
    
    const [rows] = await pool.query(query, [Email_Usuario]);

    if (rows.length < 0) {
      console.error('Error al buscar usuario:', error);
      res.status(500).json({ mensaje: 'Error al buscar usuario' });
    }
    else {
      if (rows.length === 0) {
        // Usuario no encontrado
        console.log('Usuario no encontrado');
        res.status(401).json({ mensaje: 'Usuario no encontrado' });
      } else {
        const usuario = rows[0];
        if (usuario.Contrasena_Usuario === Contrasena_Usuario) {
          // Contraseña válida, envía los datos del usuario
          console.log('usuario encontrado', usuario);
          res.status(200).json(usuario);
        } else {
          // Contraseña incorrecta
          console.log('Contraseña incorrecta');
          res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }
      }
    }

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar usuario' });
  }


}

export const getUsers = async (req, res) => { 
  console.log('getUsers')
}