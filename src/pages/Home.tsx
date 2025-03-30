import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchPhotos, Photo } from '../services/api';
import VirtualizedList from '../components/VirtualizedList';

const Home = () => {
  const [data, setData] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetchPhotos();
        setData(response.data);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRetry = () => {
    setError('');

    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetchPhotos();
        setData(response.data);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-medium">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>
        <div className="flex gap-4">
          <button
            onClick={handleRetry}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Reintentar
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const renderItem = (item: Photo) => (
    <div className="p-4 mx-2 bg-white rounded shadow">
      <h3 className="mb-2 text-lg font-medium line-clamp-2">{item.title}</h3>
      <p className="text-sm text-gray-500">ID: {item.id}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-10 p-4 bg-white shadow">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold">Lista de Elementos</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      </header>
      
      <main className="container p-4 mx-auto mt-6">
        <div className="p-4 mb-4 bg-white rounded shadow">
          <p>
            Se encontraron <span className="font-semibold">{data.length}</span> elementos
          </p>
        </div>
        
        {/* Lista virtualizada */}
        <VirtualizedList
          items={data}
          height={600}
          itemHeight={100}
          renderItem={renderItem}
          className="bg-gray-100"
        />
      </main>
    </div>
  );
};

export default Home; 