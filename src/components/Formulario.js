import React, { useState } from 'react';
import Error from './Error'

const Formulario = ({guardarBusqueda}) => {

    const [ termino, guardarTermino ] = useState('');
    const [ error, actualizarError ] = useState(false);

    // onSubmit

    const onSubmit = e => {
        e.preventDefault();

        if( termino.trim() === ''){
            actualizarError(true);
            return;
        }

        actualizarError(false)
        guardarBusqueda(termino)
    }

    return ( 

        <form
            onSubmit = {onSubmit}
        >

            {error ? <Error mensaje="No hay ningún valor en el campo" /> : null}

            <div className="row">
                <div className="from-group col-md-8">
                    <input
                        type='text'
                        value= { termino }
                        className="form-control from-control-lg"
                        placeholder="Buscar..."
                        onChange= {e => guardarTermino(e.target.value)}
                    />
                </div>
            </div>

            <div className="from-group col-md-4">
                <input
                    type="submit"
                    className="btn btn-lg btn-danger btn-block"
                    value='Buscar'
                />
            </div>



        </form>
     );
}
 
export default Formulario;