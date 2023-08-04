// import { useLogin } from "../../context/login";
// import { useState } from "react";
// import axios from "axios";

// const VistaLogin = () => {
//   const { user, login, logout } = useLogin();
//   const [email, setEmail] = useState("");
//   const [contrasena, setContrasena] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("/api/login", {
//         email,
//         contrasena,
//       });

//       // Si la respuesta es exitosa, puedes iniciar sesión y redirigir
//       if (response.status === 200) {
//         const userData = response.data; // Ajusta esto según tu estructura de datos
//         login(userData);
//       }
//     } catch (error) {
//       setError("Usuario o contraseña incorrectos");
//     }
//   };

//   return (
//     <div>
//       {user ? (
//         <div>
//           <p>¡Hola, {user.Nombre_Usuario}!</p>
//           <button onClick={logout}>Cerrar sesión</button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//           />
//           <input
//             type="password"
//             value={contrasena}
//             onChange={(e) => setContrasena(e.target.value)}
//             placeholder="Contraseña"
//           />
//           <button type="submit">Iniciar sesión</button>
//           {error && <p>{error}</p>}
//         </form>
//       )}
//     </div>
//   );
// };

// export default VistaLogin;
