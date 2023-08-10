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
  try {
    const query = 'SELECT (idUsuario, Nombre_Usuario, Apellido_Usuario, Email_Usuario, numContacto_Usuario, Permiso_Usuario, fechaIngreso) from usuario';
    const [rows] = await pool.query(query);

    if (rows.length < 1) {
      console.error('No hay usuarios');
      res.status(500).json({ mensaje: 'No hay usuarios' });
    } else {
      res.status(200).json(rows);
    }

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar los usuarios' });
  }
}

export const updateUser = async (req, res) => { 
  const { Nombre_Usuario, Apellido_Usuario, Email_Usuario, numContacto_Usuario, Contrasena_Usuario, Domicilio_Usuario, Permiso_Usuario } = req.body;
  const { id } = req.params.id;

  try {
   
    const query = ' UPDATE usuario SET Nombre_Usuario = IFNULL(?, Nombre_Usuario), Apellido_Usuario = IFNULL(?, Apellido_Usuario), Email_Usuario = IFNULL(?, Email_Usuario), numContacto_Usuario = IFNULL(?, numContacto_Usuario), Contrasena_Usuario = IFNULL(?, Contrasena_Usuario), Domicilio_Usuario = IFNULL(?, Domicilio_Usuario), Permiso_Usuario = IFNULL(?, Permiso_Usuario) WHERE idUsuario = ?';

    const [rows] = await pool.query(query, [Nombre_Usuario, Apellido_Usuario, Email_Usuario, numContacto_Usuario, Contrasena_Usuario, Domicilio_Usuario, Permiso_Usuario, id]);

    if (rows.affectedRows < 1) {
      console.error('Error al actualizar usuario');
      res.status(500).json({ mensaje: 'No se pudo actualizar el usuario' });
    }
    else {
      const [result] = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [id])
      res.json(result[0])
    }

  } catch (error) {
    
  }
}

export const registerUser = async (req, res) => { 
  const { Nombre_Usuario, Apellido_Usuario, Email_Usuario, numContacto_Usuario, Contrasena_Usuario, Domicilio_Usuario, Permiso_Usuario } = req.body;

  try {
   
    const [rows] = await pool.query('INSERT INTO usuario (Nombre_Usuario, Apellido_Usuario, Email_Usuario, numContacto_Usuario, Contrasena_Usuario, Domicilio_Usuario, Permiso_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?)', [Nombre_Usuario, Apellido_Usuario, Email_Usuario, numContacto_Usuario, Contrasena_Usuario, Domicilio_Usuario, Permiso_Usuario]);

    if (rows.affectedRows < 1) {
      console.error('Error al registrar usuario');
      res.status(500).json({ mensaje: 'No se pudo registrar el usuario' });
    } else {
      res.status(201).json({ mensaje: 'Usuario registrado' });
    }

  } catch (error) {
    // res.status(500).json({ mensaje: error});
    console.log(error);
  }
}

export const updateDomicilioUser = async (req, res) => { 
    const { Domicilio_Usuario } = req.body;
    const { id } = req.params;

  try {
    const query = "UPDATE usuario SET Domicilio_Usuario = IFNULL(?, Domicilio_Usuario) WHERE idUsuario = ?";
    const [rows] = await pool.query(query, [Domicilio_Usuario, id]);

    if (rows.affectedRows < 1) {
      console.error('Error al actualizar domicilio');
      res.status(500).json({ mensaje: 'No se pudo actualizar el domicilio' });
    }
    else {
      const [result] = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [id])
      res.json(result[0])
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar domicilio' });
  }
}