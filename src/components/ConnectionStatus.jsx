import { useEffect, useState } from "react";
import { getConnected } from "../api";


const ConnectionStatus = () => {
    const [status, setStatus] = useState('Checking connection...');
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const checkConnection = async () => {
        try {
          const data = await getConnected();
          setStatus(data.message || 'Connected');
        } catch (err) {
          setError('Failed to connect to the backend');
          console.error('Error fetching connection status:', err);
        }
      };
  
      checkConnection();
    }, []);
  
    return (
      <div>
        <h1>{status}</h1>
        {error && <p>{error}</p>}
      </div>
    );
  };
  
  export default ConnectionStatus;