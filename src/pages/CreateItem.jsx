import axios from "axios";

import { redirect, Form } from "react-router-dom";

const inputStyle = "border-b-2 border-cyan-700 bg-cyan-950 appearance-none";
const labelStyle =
  "border border-transparent whitespace-nowrap overflow-y-hidden text-ellipsis";
const pStyle = "flex flex-col m-2";

export default function CreateItem() {
  return (
    <Form method="post" className="m-0 w-auto">
      <h1 className="font-bold text-blue-950 text-4xl">Add Item</h1>
      {/* main info */}
      <div className="grid grid-cols-5 font-bold bg-cyan-950 text-white">
        <p className={pStyle}>
          <label htmlFor="itemName" className={labelStyle}>
            Name
          </label>
          <input id="itemName" name="name" required className={inputStyle}   />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemCode" className={labelStyle}>
            Code
          </label>
          <input id="itemCode" name="code" required className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemPrice" className={labelStyle}>
            Price
          </label>
          <input id="itemPrice" name="price" required className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemDescription" className={labelStyle}>
            Description
          </label>
          <input
            id="itemDescription"
            name="description"
            className={inputStyle}
             
          />
        </p>
        <p className={pStyle}>
          <label htmlFor="type" className={labelStyle}>
            Type
          </label>
          <select id="type" name="itemType" className={inputStyle}  >
            <option >0</option>
            <option>1</option>
          </select>
        </p>
        <p className={pStyle}>
          <label htmlFor="itemVat" className={labelStyle}>
            Vat Rate
          </label>
          <input id="itemVat" name="vatRate" required className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemWeight" className={labelStyle}>
            Weight
          </label>
          <input id="itemWeight" name="weight" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemLength" className={labelStyle}>
            Length
          </label>
          <input id="itemLength" name="length" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemWidth" className={labelStyle}>
            Width
          </label>
          <input id="itemWidth" name="width" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemHeight" className={labelStyle}>
            Height
          </label>
          <input id="itemHeight" name="height" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemSku" className={labelStyle}>
            Sku
          </label>
          <input id="itemSku" name="sku" className={inputStyle}  />
        </p>
      </div>
      {/* main info end */}
      <div className="grid grid-cols-5 bg-cyan-950 text-white font-bold">
        <p className={pStyle}>
          <label htmlFor="itemBarcode" className={labelStyle}>
            Barcode
          </label>
          <input id="itemBarcode" name="barcode" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemManifacturer" className={labelStyle}>
            Manufacturer
          </label>
          <input
            id="itemManufacturer"
            name="manufacturer"
            className={inputStyle}
             
          />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemBrand" className={labelStyle}>
            Brand
          </label>
          <input id="itemBrand" name="brand" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemModel" className={labelStyle}>
            Model
          </label>
          <input id="itemModel" name="model" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemColor" className={labelStyle}>
            Color
          </label>
          <input id="itemColor" name="color" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemSize" className={labelStyle}>
            Size
          </label>
          <input id="itemSize" name="size" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemMaterial" className={labelStyle}>
            Material
          </label>
          <input id="itemMaterial" name="material" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemWarranty" className={labelStyle}>
            Warranty
          </label>
          <input id="itemWarranty" name="warranty" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemSupplier" className={labelStyle}>
            Supplier
          </label>
          <input id="itemSupplier" name="supplier" className={inputStyle}  />
        </p>
        <p className={pStyle}>
          <label htmlFor="itemUom" className={labelStyle}>
            Uom
          </label>
          <input id="itemUom" name="uom" className={inputStyle}  />
        </p>
        <p className="flex flex-col m-2">
          <label htmlFor="itemOrigin" className={labelStyle}>
            Country of Origin
          </label>
          <input
            id="itemOrigin"
            name="countryOfOrigin"
            className={inputStyle}
             
          />
        </p>
        <button className="bg-green-600 border border-transparent rounded-2xl max-h-8 mt-7">
          Add
        </button>
      </div>
    </Form>
  );
}

export async function action({ request }) {
  const data = await request.formData();

  const item = {
    name: data.get("name"),
    code: data.get("code"),
    price: parseInt(data.get("price")),
    description: data.get("description"),
    itemType: parseInt(data.get("itemType")),
    vatRate: parseFloat(data.get("vatRate")/100),
    weight: parseInt(data.get("weight")),
    length: parseInt(data.get("length")),
    width: parseInt(data.get("width")),
    height: parseInt(data.get("height")),
    sku: data.get("sku"),
    barcode: data.get("barcode"),
    manufacturer: data.get("manufacturer"),
    brand: data.get("brand"),
    model: data.get("model"),
    color: data.get("color"),
    size: data.get("size"),
    material: data.get("material"),
    countryOfOrigin: data.get("countryOfOrigin"),
    warranty: data.get("warranty"),
    supplier: data.get("supplier"),
    uom: data.get("uom"),
  };
  console.log(item);
  try {
const apiUrl = 'http://localhost:3000/api/items';
const response = await axios.post( apiUrl, item , 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(response.data);
        redirect("/items");
  } catch (error) {
    console.error("Error occurred while submitting form:", error);
  }
  return null;
}