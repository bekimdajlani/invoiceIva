import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header >
      <nav>
        <ul className="bg-blue-950 flex justify-end p-2" >
          <li className="p-1 text-white hover:font-bold active:text-gray-600">
            <NavLink to="/" className={({isActive}) => (isActive ? 'underline font-bold' : undefined)}>Home</NavLink>
          </li>
          <li className="p-1 text-white hover:font-bold active:text-gray-600">
            <NavLink to="myclients" className={({isActive}) => (isActive ? 'underline font-bold' : undefined)}>Klientet</NavLink>
          </li>
          <li className="p-1 text-white hover:font-bold active:text-gray-600">
            <NavLink to="invoices" className={({isActive}) => (isActive ? 'underline font-bold' : undefined)}>Faturat e mia</NavLink>
          </li>
          <li className="p-1 text-white hover:font-bold active:text-gray-600">
            <NavLink to="items" className={({isActive}) => (isActive ? 'underline font-bold' : undefined)}>Artikujt</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
