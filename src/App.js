import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'


function App() {

  const [ busqueda, guardarBusqueda ] = useState('');
  const [ resultado, guardarResultado ] = useState([]);

  const [ paginaActual, guardarPaginaActual ] = useState(1);
  const [ totalPaginas, guardarTotalPaginas ] = useState(1);

  useEffect(() => {

    const API = async() => {

    if(busqueda === '') return; // Para que cuando cargue el compnente y trate de hacer una búsqueda y esté vación no haga nada

      const imagenesPorPagina = 30;
      const key = '15980012-981f41cd5920ac3ee2112a85d';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      console.log(resultado)

      guardarResultado(resultado.hits)

      // Clacular total paginas => Redonde up (totalHots te lo da la API, siendo el nº total de elementos / 30 por pagina que queremos)
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);

      guardarTotalPaginas(calcularTotalPaginas); // 17 paginas para una busqueda por ejemplo


      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})

    }
    API();

  }, [busqueda, paginaActual]) // Cuando busque un nuevo busqueda, haga todo de nuevo, se refreseque y pase a la pagina actual

  
  // Páginas...
  
  const paginaAnterior = () => {
    
    const nuevaPaginaActual = paginaActual - 1;

    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual)

  }

  const paginaSiguiente = () => {

    const nuevaPaginaActual = paginaActual + 1;

    if(nuevaPaginaActual > totalPaginas) return;

    guardarPaginaActual(nuevaPaginaActual)

  }


  return (

    <div className="container">

          <div className="jumbotron">
            <p className="lead text-center">Buscador de Imágenes</p>

            <Formulario 
              guardarBusqueda={guardarBusqueda}
            />
          </div>

          <ListadoImagenes 
            resultado={resultado}
          />

          <div className="buttonContainer">

              {(paginaActual === 1) ? null : (
                <button
                  type="button"
                  className="bxsbtn btn-info mr-1"
                  onClick={paginaAnterior}
                >&laquo; Anterior</button>

              )}

              {(paginaActual === totalPaginas) ? null : (
                <button
                  type="button"
                  className="bbtn btn-info mr-1"
                  onClick={paginaSiguiente}
                >Siguiente &raquo;</button>
              )}
            
            </div>

    </div>

  );
}

export default App;
