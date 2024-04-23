import { Link, redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Client({ ...client }) {
  const clientDetails = client.client;
  const [edit, setEdit] = useState(false);
  const divStyle = "flex flex-col appearance-none border border-transparent overflow-hidden p-1";
  const inputStyles = "border-b-2 border-cyan-800 bg-teal-950 appearance-none";

  const [formData, setFormData] = useState({
    name: clientDetails.name,
    email: clientDetails.email,
    phone: clientDetails.phone,
    address: clientDetails.address,
    city: clientDetails.city,
    postalCode: clientDetails.postalCode,
    country: clientDetails.country,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const transformDate = (invoiceDate) => {
    const date = new Date(invoiceDate);
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  };
  
  async function handleUpdate () {
    if (edit) {
      try {
        const id = clientDetails.id;
        const apiUrl = `http://localhost:8081/api/customers/${id}`;
        const response = await axios.put(apiUrl, formData, 
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

  async function handleDeleteClient () {
    try {
      const id = clientDetails.id;
      const apiUrl = `http://localhost:8081/api/customers/${id}`;
      const response = await axios.delete(apiUrl);
      redirect('/customers');
        console.log(response.data);
      } catch (error) {
        console.error("Error occurred while submitting form:", error);
      }
  }
  return (
    <>
      <div className="flex justify-center mt-5 text-white font-bold">
        <form
          action="post"
          className="grid grid-cols-2 appearance-none  bg-teal-950 p-4 border rounded-2xl"
        >
          <div className="max-w-md mx-auto bg-teal=950 rounded-md p-2">
            {/* checkboxes */}
            <div className="flex flex-row justify-evenly">
              <div>
                <input
                  type="radio"
                  id="isActive"
                  name="options"
                  defaultChecked={clientDetails.isActive}
                  readOnly={!edit}
                />
                <label
                  htmlFor="isActive"
                  className="p-2 text-green-800  font-bold"
                >
                  Active
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="inactive"
                  name="options"
                  defaultChecked={clientDetails.isDeleted}
                  readOnly={!edit}
                />
                <label
                  htmlFor="inactive"
                  className="p-2 text-red-700 font-bold"
                >
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col appearance-none border border-transparent overflow-hidden p-1">
            <label htmlFor="clientName">Name</label>
            <input
              id="clientName"
              name="name"
              onChange={handleInputChange}
              className={inputStyles}
              defaultValue={clientDetails.name}
              readOnly={!edit}
            />
          </div>
          <div className={divStyle}>
            <label htmlFor="clientEmail">Email</label>
            <a href={`mailto:${clientDetails.email}`}>
              <input
                id="clientEmail"
                name="email"
                onChange={handleInputChange}
                className={inputStyles}
                defaultValue={clientDetails.email}
                readOnly={!edit}
              />
            </a>
          </div>
          <div className={divStyle}>
            <label htmlFor="clientPhone">Phone</label>
            <a href={`tel:${clientDetails.phone}`}>
              <input
                id="clientPhone"
                name="phone"
                onChange={handleInputChange}
                className={inputStyles}
                defaultValue={clientDetails.phone}
                readOnly={!edit}
              />
            </a>
          </div>
          <div className={divStyle}>
            <label htmlFor="clienAddress">Address</label>
            <input
              id="cclienAddress"
              name="address"
              onChange={handleInputChange}
              className={inputStyles}
              defaultValue={clientDetails.address}
              readOnly={!edit}
            />
          </div>
          <div className={divStyle}>
            <label htmlFor="clientCity">City</label>
            <input
              id="clientCity"
              name="city"
              onChange={handleInputChange}
              className={inputStyles}
              defaultValue={clientDetails.city}
              readOnly={!edit}
            />
          </div>
          <div className={divStyle}>
            <label htmlFor="postCode">Postal Code</label>
            <input
              id="postCode"
              name="postalCode"
              onChange={handleInputChange}
              className={inputStyles}
              defaultValue={clientDetails.postalCode}
              readOnly={!edit}
            />
          </div>
          <div className={divStyle}>
            <label htmlFor="clientCountry">Country</label>
            <input
              id="clientCountry"
              name="country"
              onChange={handleInputChange}
              className={inputStyles}
              defaultValue={clientDetails.country}
              readOnly={!edit}
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-green-600 border border-transparent rounded-2xl max-h-8 mt-7"
          >
            {edit ? "Save" : "Edit"}
          </button>
          <button
            type="button"
            onClick={handleDeleteClient}
            className="bg-red-600 border border-transparent rounded-2xl max-h-8 mt-7"
          >
            Delete Client
          </button>
          {clientDetails.invoices.length && (
            <div className="grid grid-cols-5 gap-2 m-1 justify-items-start ">
              <p className="text-zinc-800 font-bold">NR</p>
              <p className="text-zinc-800  font-bold">Data</p>
              <p className="text-zinc-800  font-bold">Shuma</p>
              <p className="text-zinc-800  font-bold">Status</p>
            </div>
          )}
          <div>
            {clientDetails.invoices?.map((inv) => (
              <div
                key={inv.id}
                className="border-b border-gray-400 border-solid p-2 grid grid-cols-5 gap-1 m-1 justify-items-start hover:bg-gray-200"
              >
                <p>{inv.invoiceNumber}</p>
                <p>{transformDate(inv.invoiceDate)}</p>
                <p>{inv.totalAmount}</p>
                <p>{inv.isPaid ? "Paguar" : "Pa Paguar"}</p>
                <Link to={`/invoices/${inv.id}`}>More Details</Link>
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
}
