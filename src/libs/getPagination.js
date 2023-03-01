// Configuracion de .paginate (cantidad de paginas, Cantidad de objetos retornados por consulta)
export const getPaginate = (page, size) => {
  // Si existe un tamaño definido lo conviertes a numero y si no entonces defines 3 por defecto
  const limit = size ? +size : 3;

  // Si me has pasado un numero de pagina devuelve/retorna esa pagina SIN repetir los mismos objetos y si no te paso un 0
  const offset = page ? page * limit : 0;

  return{ offset, limit }; // No importa el orden ya no ejecutamos la funcion de manera directa
};