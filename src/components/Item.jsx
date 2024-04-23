import { useState } from "react";
import { Form, redirect } from 'react-router-dom';
import axios from "axios";
export default function Item(props) {

  const [edit,setEdit] = useState(false)
  const item = props.data;
  console.log(item);
  const [editedItem,setEditedItem] = useState({
      name: item.name,
      code: item.code,
      price: parseInt(item.price),
      description: item.description,
      itemType: parseInt(item.itemType),
      vatRate: parseFloat(item.vatRate),
      weight: parseInt(item.weight),
      length: parseInt(item.length),
      width: parseInt(item.width),
      height: parseInt(item.height),
      sku: item.sku,
      barcode: item.barcode,
      manufacturer: item.manufacturer,
      brand: item.brand,
      model: item.model,
      color: item.color,
      size: item.size,
      material: item.material,
      countryOfOrigin: item.countryOfOrigin,
      warranty: item.warranty,
      supplier: item.supplier,
      uom: item.uom,
  })
  const inputStyle = "border-b-2 border-cyan-700 bg-cyan-950 appearance-none";
  const labelStyle =
  "border border-transparent whitespace-nowrap overflow-y-hidden text-ellipsis";
const pStyle = "flex flex-col m-2";

const handleInputChange = (e) => {
  const { name, value } = e.target;
  const parsedValue = isNaN(value) ? value : parseInt(value);
  setEditedItem((prevState) => ({
    ...prevState,
    [name]: parsedValue,
  }));
};

  async function handleUpdate () {
    console.log(editedItem);
    if (edit) {
      try {
        const id = item.id;
        const apiUrl = `http://localhost:8081/api/items/${id}`;
        const response = await axios.put(apiUrl, editedItem, 
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
          )
          console.log(response.data);
          setEdit(prevState => !prevState);
        } catch (error) {
          console.error("Error occurred while submitting form:", error);
        }
      }
      setEdit(prevState => !prevState);
  }

  async function handleDelete () {
    try {
      const id = item.id;
      const apiUrl = `http://localhost:8081/api/items/${id}`;
      const response = await axios.delete(apiUrl);
      redirect('/items');
        console.log(response.data);
      } catch (error) {
        console.error("Error occurred while submitting form:", error);
      }
  }

  return ( 
    <Form method="post" className="m-0 w-auto" key={item.id}>
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
    {/* main info */}
    <div className="grid grid-cols-5 font-bold bg-cyan-950 text-white">
      <p className={pStyle}>
        <label htmlFor="itemName" className={labelStyle}>
          Name
        </label>
        <input id="itemName" name="name" required className={inputStyle}  readOnly={!edit} defaultValue={item.name} onChange={handleInputChange} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemCode" className={labelStyle}>
          Code
        </label>
        <input id="itemCode" name="code" required className={inputStyle} readOnly={!edit} defaultValue={item.code}onChange={handleInputChange}/>
      </p>
      <p className={pStyle}>
        <label htmlFor="itemPrice" className={labelStyle}>
          Price
        </label>
        <input id="itemPrice" name="price" required className={inputStyle}  defaultValue={item.price} readOnly={!edit} onChange={handleInputChange} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemDescription" className={labelStyle}>
          Description
        </label>
        <input
          id="itemDescription"
          name="description"
          className={inputStyle}
           defaultValue={item.description}
           readOnly={!edit}
           onChange={handleInputChange}
        />
      </p>
      <p className={pStyle}>
        <label htmlFor="type" className={labelStyle}>
          Type
        </label>
        <select id="type" name="itemType" className={inputStyle} onChange={handleInputChange} >
          <option >0</option>
          <option>1</option>
        </select>
      </p>
      <p className={pStyle}>
        <label htmlFor="itemVat" className={labelStyle}>
          Vat Rate
        </label>
        <input id="itemVat" name="vatRate" required className={inputStyle} readOnly={!edit} defaultValue={item.vatRate} onChange={handleInputChange} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemWeight" className={labelStyle}>
          Weight
        </label>
        <input id="itemWeight" name="weight" className={inputStyle} onChange={handleInputChange} readOnly={!edit} defaultValue={item.weight} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemLength" className={labelStyle}>
          Length
        </label>
        <input id="itemLength" name="length" className={inputStyle} onChange={handleInputChange} readOnly={!edit} defaultValue={item.length}  />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemWidth" className={labelStyle}>
          Width
        </label>
        <input id="itemWidth" name="width" className={inputStyle} onChange={handleInputChange} readOnly={!edit} defaultValue={item.width}  />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemHeight" className={labelStyle}>
          Height
        </label>
        <input id="itemHeight" name="height" className={inputStyle} onChange={handleInputChange} readOnly={!edit} defaultValue={item.height} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemSku" className={labelStyle}>
          Sku
        </label>
        <input id="itemSku" name="sku" className={inputStyle} onChange={handleInputChange} readOnly={!edit} defaultValue={item.sku}  />
      </p>
    </div>
    {/* main info end */}
    <div className="grid grid-cols-5 bg-cyan-950 text-white font-bold">
      <p className={pStyle}>
        <label htmlFor="itemBarcode" className={labelStyle}>
          Barcode
        </label>
        <input id="itemBarcode" name="barcode" className={inputStyle} onChange={handleInputChange} defaultValue={item.barcode} readOnly={!edit} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemManifacturer" className={labelStyle}>
          Manufacturer
        </label>
        <input
          id="itemManufacturer"
          name="manufacturer"
          className={inputStyle}
          readOnly={!edit} defaultValue={item.manufacturer}
          onChange={handleInputChange}
        />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemBrand" className={labelStyle}>
          Brand
        </label>
        <input id="itemBrand" name="brand" className={inputStyle} onChange={handleInputChange} readOnly={!edit} defaultValue={item.brand} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemModel" className={labelStyle}>
          Model
        </label>
        <input id="itemModel" name="model" className={inputStyle} readOnly={!edit} defaultValue={item.model} onChange={handleInputChange} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemColor" className={labelStyle}>
          Color
        </label>
        <input id="itemColor" name="color" className={inputStyle} readOnly={!edit} defaultValue={item.color} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemSize" className={labelStyle}>
          Size
        </label>
        <input id="itemSize" name="size" className={inputStyle} onChange={handleInputChange} readOnly={!edit} defaultValue={item.size} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemMaterial" className={labelStyle}>
          Material
        </label>
        <input id="itemMaterial" name="material" className={inputStyle} readOnly={!edit} defaultValue={item.material} onChange={handleInputChange} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemWarranty" className={labelStyle}>
          Warranty
        </label>
        <input id="itemWarranty" name="warranty" className={inputStyle} readOnly={!edit} defaultValue={item.warranty} onChange={handleInputChange} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemSupplier" className={labelStyle}>
          Supplier
        </label>
        <input id="itemSupplier" name="supplier" className={inputStyle} readOnly={!edit} defaultValue={item.supplier} onChange={handleInputChange} />
      </p>
      <p className={pStyle}>
        <label htmlFor="itemUom" className={labelStyle}>
          Uom
        </label>
        <input id="itemUom" name="uom" className={inputStyle} defaultValue={item.uom} readOnly={!edit} onChange={handleInputChange} />
      </p>
      <p className="flex flex-col m-2">
        <label htmlFor="itemOrigin" className={labelStyle}>
          Country of Origin
        </label>
        <input
          id="itemOrigin"
          name="countryOfOrigin"
          className={inputStyle}
          readOnly={!edit} defaultValue={item.countryOfOrigin}
          onChange={handleInputChange}
        />
      </p>
    <button type="button" onClick={handleUpdate} className="bg-green-600 border border-transparent rounded-2xl max-h-8 mt-7">
            {edit? 'Save' : 'Edit'}
        </button>
        <button type="button" onClick={handleDelete} className="bg-red-600 border border-transparent rounded-2xl max-h-8 mt-7">
          Delete Client
        </button>
    </div>
  </Form>
  );
}
