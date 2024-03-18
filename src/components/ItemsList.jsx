import { Link } from "react-router-dom";
export default function ItemsList(props) {
  const items = props.items
  return (
    <div>
      <h1 className="text-blue-950 font-bold text-3xl mb-5">Items List</h1>
      <ul className="font-bold">
        {items.map(
          (item) =>
            item.isActive && (
              <Link to={`${item.id}`}
                key={item.id}
                className="grid grid-cols-3 border border-2 p-4 hover:bg-zinc-200"
              >
                <div>
                  <p>Name: {item.name}</p>
                  <p>Code: {item.code}</p>
                </div>
                <div>
                  <p>Details</p>
                  <p>{item.description}</p>
                </div>
                <div>
                  <p>Price: {item.price}</p>
                  <p>Unit: {item.uom}</p>
                </div>
              </Link>
            )
        )}
      </ul>
    </div>
  );
}
