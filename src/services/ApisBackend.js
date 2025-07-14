//apis para consumir el backend

//url del api que conecta el backend
const API_URL = import.meta.env.VITE_BACKEND_URL;


//para obbtener los horoscopos
export const obtenerHoroscopos = async () => {
  try {
    const response = await fetch(`${API_URL}/api/horoscopos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el horóscopo:', error);
    throw new Error('No se pudo obtener el horóscopo.');
  }
};


//para obtener noticias de deportes
export const obtenerNoticiaDeportes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/noticias/deportes`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener noticias de deportes:', error);
    throw new Error('No se pudo obtener las noticias de deportes.');
  }
};


//para obtener las ultimas noticias
export const obtenerUltimas = async () => {
  try {
    const response = await fetch(`${API_URL}/api/noticias/ultimas`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener ultimas noticias:', error);
    throw new Error('No se pudo obtener ultimas noticias.');
  }
};


//para obtener las ultimas noticias
export const obtenerDestacada = async () => {
  try {
    const response = await fetch(`${API_URL}/api/noticias/destacadas`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener ultimas noticias:', error);
    throw new Error('No se pudo obtener ultimas noticias.');
  }
};


//para obtener las ultimas noticias
export const obtenerVerdes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/noticias/verde`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener ultimas noticias:', error);
    throw new Error('No se pudo obtener ultimas noticias.');
  }
};


//para obtener las ultimas noticias
export const obtenerEntrevistas = async () => {
  try {
    const response = await fetch(`${API_URL}/api/entrevistas`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener ultimas noticias:', error);
    throw new Error('No se pudo obtener ultimas noticias.');
  }
};


// Enviar pregunta a base de datos
export const enviarPreguntaTulio = async ({ nombre, pregunta }) => {
  try {
    const response = await fetch(`${API_URL}/api/tulio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, pregunta })
    });
    return await response.json();
  } catch (error) {
    console.error('Error al enviar pregunta:', error);
    throw error;
  }
};


//para dar o quitar like a una noticia
export const toggleLike = async (noticiaId) => {
  try {
    const response = await fetch(`${API_URL}/api/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noticia_id: noticiaId }),
    });

    if (!response.ok) {
      throw new Error('Error al hacer toggle del like');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al enviar like:', error);
    throw new Error('No se pudo procesar el like.');
  }
};



//obtener likes actuales del usuaario(x ip)
export const obtenerLikesUsuario = async () => {
  try {
    const response = await fetch(`${API_URL}/api/likes/mis-likes`);
    const data = await response.json();
    return data.likes || [];
  } catch (error) {
    console.error('Error al obtener likes del usuario:', error);
    return [];
  }
};



export const obtenerReporterosPasantes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/reporteros-pasantes/reporteros`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener reporteros pasantes:', error);
    throw new Error('No se pudo obtener la lista de reporteros.');
  }
};


// Registrar nuevo reportero pasante
export const registrarPasante = async (pasante) => {
  try {
    const response = await fetch(`${API_URL}/api/reporteros-pasantes/crear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pasante)
    });

    if (!response.ok) {
      throw new Error('Error al registrar el pasante');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al registrar pasante:', error);
    throw error;
  }
};

// Eliminar reportero pasante por ID
export const eliminarPasantePorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/reporteros-pasantes/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el pasante');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al eliminar pasante:', error);
    throw error;
  }
};

export const obtenerAdministradores = async () => {
  try {
    const response = await fetch(`${API_URL}/api/reporteros-pasantes/administradores`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener administradores:', error);
    throw new Error('No se pudo obtener la lista de administradores.');
  }
};

export const loginUsuario = async ({ correo, contrasena }) => {
  try {
    const response = await fetch(`${API_URL}/api/reporteros-pasantes/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Error al iniciar sesión');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};


export const crearNoticiaPasante = async ({ titulo, contenido, reportero_id }) => {
  const response = await fetch(`${API_URL}/api/noticias-pasantes/crear`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, contenido, reportero_id })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Error al publicar la noticia');
  }

  return await response.json();
};

export const obtenerNoticiasRecientesCombinadas = async () => {
  const res = await fetch(`${API_URL}/api/noticias/recientes-combinadas`);
  if (!res.ok) throw new Error('Error al obtener noticias combinadas');
  return await res.json();
};

export const obtenerEstadisticasNoticias = async () => {
  const res = await fetch(`${API_URL}/api/noticias/estadisticas`);
  if (!res.ok) throw new Error('Error al obtener estadísticas');
  return await res.json();
};

export const obtenerNoticiasPasantes = async () => {
  const res = await fetch(`${API_URL}/api/noticias-pasantes`);
  if (!res.ok) throw new Error('Error al obtener noticias de pasantes');
  return await res.json();
};




