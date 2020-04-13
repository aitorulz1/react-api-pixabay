import React from 'react';
import Imagen from './Imagen'

const ListadoImagenes = ({resultado}) => {
    return ( 
        <div className="col-12 p-5 row">
            {resultado.map(imagen => (
                <Imagen
                    key={imagen.id} 
                    imagen={imagen}
                />
        ))}
    </div>
     );
}
 
export default ListadoImagenes;