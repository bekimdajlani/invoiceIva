import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ClientList({ ...clients }) {


  const [isVisible, setIsVisible] = useState(Array(clients.clients.length).fill(false));

  const screenWidth = window.innerWidth;
  const showColumn = screenWidth > 820;
  
  let clientListStyle;
  let headerStyle;
  
  if(showColumn){
    
    clientListStyle = `border-b border-gray-400 border-solid p-2 grid grid-cols-6 gap-4 m-1 justify-items-start hover:bg-gray-200 overflow-hidden`;
    headerStyle = "grid grid-cols-6 gap-2 m-1 justify-items-start pl-5";
  }else{
    clientListStyle = `border-b border-gray-400 border-solid p-2 grid grid-cols-4 gap-4 m-1 justify-items-start hover:bg-gray-200 overflow-hidden`;
    headerStyle ="grid grid-cols-4 gap-2 m-1 justify-items-start pl-5"
  }


  useEffect(() => {
    clients.clients.forEach((client, index) => {
      setTimeout(() => {
        setIsVisible(prevState => {
          const newState = [...prevState];
          newState[index] = true;
          return newState;
        });
      }, (index + 1) * 100); // delay for each client to be checked animation
    });
  }, [clients.clients]);
  return (
    <div className="bg-blue-950 rounded-md p-2 ">
        <div className={headerStyle}>
          <h2 className="text-white font-bold">Emri</h2>
          <h2 className="text-white font-bold">Qyteti</h2>
          {showColumn && <h2 className="text-white font-bold">Shteti</h2>}
          <h2 className="text-white font-bold">Telefon</h2>
          {showColumn && <h2 className="text-white font-bold">Email</h2>}
          <h2 className="text-white font-bold">Nr Faturave</h2>
        </div>
      <div className="bg-white rounded-md">
        <ul>
          {clients.clients.map(
            (client, index) =>
              !client.isDeleted && (
                <li key={client.id} className="border-1 border-transparent overflow-hidden text-ellipsis">
                  <Link to={`${client.id}`}>
                    <div className={`${clientListStyle} ${isVisible[index] ? 'animate-fadeIn' : 'opacity-0'}`}>
                      <p className="text-zinc-600">{client.name}</p>
                      <p className="text-zinc-600">
                        {client.city ? client.city : <span>I pa cilesuar</span>}
                      </p>
                     {showColumn && <p className="text-zinc-600 ">
                        {client.country ? (
                          client.country
                        ) : (
                          <span>I pa cilesuar</span>
                        )}
                      </p>}
                      <p className="text-zinc-600 ">
                        {client.phone ? client.phone : <span>No Phone</span>}
                      </p>
                      {showColumn && <p className="text-zinc-600 border-2 border-transparent overflow-hidden">{client.email}</p>}
                      <p className="text-zinc-600 pl-14 ">{client.invoices.length}</p>
                    </div>
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}
