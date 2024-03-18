import { useState } from "react";

export default function Item(props) {

  const [edit,setEdit] = useState(false)
  console.log(props);
  const item = props.data;

  function handleEdit () {
    setEdit(true);
  }
  return (
    <form
      key={item.id}
      className="grid grid-cols-3 border border-2 p-4 hover:bg-zinc-200 font-bold"
    >
      <div className="grid grid-cols-2 mb-3">
        <label htmlFor="name " className="mb-1">Name: </label>
        <input type="text" id="name" name="name" readOnly={!edit} defaultValue={item.name} />
        <label htmlFor="name ">Code :</label>
        <input type="text" id="code" name="code" readOnly={!edit} defaultValue={item.code} />
      </div>
      <div className="border border-1 border-transparent overflow-hidden text-ellipsis">
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={item.description}
          readOnly={!edit}
          className=" appearance-none border border-1 border-transparent overflow-hidden text-ellipsis"
        />
      </div>
      <div className="grid grid-cols-2 mb-3">
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          id="price"
          name="price"
          defaultValue={item.price}
          readOnly={!edit}
        />
        <label htmlFor="unit">Unit: </label>
        <input type="text" id="unit" name="unit" defaultValue={item.uom} readOnly={!edit} />
      </div>
      <div>
        <label>Barcode: </label>
        <input
          type="number"
          id="barcode"
          name="barcode"
          defaultValue={item.barcode}
          readOnly={!edit}
        />
      </div>
      <div>
        <div>
          <div>
            <input
              type="radio"
              id="isActive"
              name="options"
              defaultChecked={item.isActive}
              readOnly={!edit}
            />
            <label htmlFor="isActive" className="p-2 text-green-800  font-bold">
              Active
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="inactive"
              name="options"
              defaultChecked={item.isDeleted}
              readOnly={!edit}
            />
            <label htmlFor="inactive" className="p-2 text-red-700 font-bold">
              Inactive
            </label>
          </div>
        </div>
      </div>
      <div>
        <button type="button" onClick={handleEdit} className="border border-transparent rounded-xl p-2 text-white bg-blue-900">
            {edit? 'Save' : 'Edit'}
        </button>
      </div>
    </form>
  );
}
