import axios from "axios";
import { useState } from "react";
import { redirect } from "react-router-dom";

export default function CreateClient() {
  const divStyle ="flex flex-col appearance-none border border-transparent overflow-hidden p-1";
  const inputStyles = "border-b-2 border-cyan-800 bg-teal-950 appearance-none";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

   async function handleSubmit (e) {
    e.preventDefault();
    try {
        const apiUrl = 'http://localhost:3000/api/customers';
        const response = await axios.post( apiUrl, formData , 
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              console.log(response.data);
                redirect("/myclients");
          } catch (error) {
            console.error("Error occurred while submitting form:", error);
          }
    console.log(formData);
  }

  return (
    <>
      <p className="text-blue-950 font-bold text-4xl">Add client</p>
      <div className="flex justify-center mt-5 text-white font-bold">
        <form action="post" className="grid grid-cols-2 appearance-none  bg-teal-950 p-4 border rounded-2xl" onSubmit={handleSubmit}>
          <div className="flex flex-col appearance-none border border-transparent overflow-hidden p-1">
            <label htmlFor="clientName">Name</label>
            <input id="clientName" name="name" onChange={handleInputChange} className={inputStyles}/>
          </div>
          <div className={divStyle}>
            <label htmlFor="clientEmail">Email</label>
            <input id="clientEmail" name="email" onChange={handleInputChange} className={inputStyles}/>
          </div>
          <div className={divStyle}>
            <label htmlFor="clientPhone">Phone</label>
            <input id="clientPhone" name="phone" onChange={handleInputChange} className={inputStyles}/>
          </div>
          <div className={divStyle}>
            <label htmlFor="clienAddress">Address</label>
            <input id="cclienAddress" name="address" onChange={handleInputChange} className={inputStyles}/>
          </div>
          <div className={divStyle}>
            <label htmlFor="clientCity">City</label>
            <input id="clientCity" name="city" onChange={handleInputChange} className={inputStyles}/>
          </div>
          <div className={divStyle}>
            <label htmlFor="postCode">Postal Code</label>
            <input id="postCode" name="postalCode" onChange={handleInputChange} className={inputStyles}/>
          </div>
          <div className={divStyle}>
            <label htmlFor="clientCountry">Country</label>
            <input id="clientCountry" name="country" onChange={handleInputChange} className={inputStyles}/>
          </div>
          <button type="submit" className="bg-green-800 border border-transparent rounded-2xl">Add Client</button>
        </form>
      </div>
    </>
  );
}