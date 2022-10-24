import {Route, Routes} from 'react-router-dom';
import FormularioGenero from '../pages/genero/FormularioGenero';
import ListaGenero from '../pages/genero/ListaGenero';
import FotoGenero from '../pages/genero/FotoGenero';
import ListaArtista from '../pages/artista/ListaArtista';
import FotoArtista from '../pages/artista/FotoArtista';
import FormularioArtista from '../pages/artista/FormularioArtista';
import ListaAlbum from '../pages/album/ListaAlbum';
import FotoAlbum from '../pages/album/FotoAlbum';
import FormularioAlbum from '../pages/album/FormularioAlbum';
import VerGenero from '../pages/genero/VerGenero';
import VerArtista from '../pages/artista/VerArtista';
import VerAlbum from '../pages/album/VerAlbum';
import ListaCancion from '../pages/cancion/ListaCancion';
import FormularioCancion from '../pages/cancion/FormularioCancion';
import Canciones from '../pages/cancion/Canciones';

const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/genero/list" element={<ListaGenero />} />
            <Route path="/genero/create" element={<FormularioGenero />} />
            <Route path="/genero/:id" element={<FormularioGenero />} />
            <Route path="/genero/:id/foto" element={<FotoGenero />} />
            <Route path="/" element={<VerGenero />} />

            <Route path="/artista/list" element={<ListaArtista />} />
            <Route path="/artista/create" element={<FormularioArtista />} />
            <Route path="/artista/:id" element={<FormularioArtista />} />
            <Route path="/artista/:id/foto" element={<FotoArtista />} />
            <Route path="/verArtistas/:id" element={<VerArtista />} />

            <Route path="/album/list" element={<ListaAlbum />} />
            <Route path="/album/create" element={<FormularioAlbum />} />
            <Route path="/album/:id" element={<FormularioAlbum />} />
            <Route path="/album/:id/foto" element={<FotoAlbum />} />
            <Route path="/verAlbum/:id" element={<VerAlbum />} />


            <Route path="/cancion/list" element={<ListaCancion />} />
            <Route path="/cancion/create" element={<FormularioCancion />} />
            <Route path="/cancion/:id" element={<FormularioCancion />} />
            <Route path="/cancion/:id/cancion" element={<Canciones />} />
        </Routes>
    );
}

export default RouterConfig;