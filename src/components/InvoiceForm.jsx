import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import InvoiceLines from "./InvoiceLines";

export default function InvoiceForm(props) {
  const clients = props.items.clients;
  const items = props.items.items;

  const [invoiceLines, setInvoiceLines] = useState([
    { id: 1, line: <InvoiceLines onChangeVat={handleTotalVat} onChangeTotWoVat={handleTotalWoVat} onChangeTotal={handleTotalWvat}  items={items} /> },
  ]);
  const [totalWoVat,setTotalWoVat] = useState(0);
  const [totalVat,setTotalVat] = useState(0);
  const [totalWvat,setTotalWvat] = useState(0);
  
  function handleTotalWoVat(totalAmount) {
    setTotalWoVat((prevState) => prevState + totalAmount);
  }
  
  function handleTotalVat(vatAmount) {
    setTotalVat((prevState) => prevState + vatAmount);
  }
  
  function handleTotalWvat() {
    setTotalWvat(totalWoVat + totalVat);
  }

  function addNewLine() {
    const id = invoiceLines.length + 1;
    const newLine = {
      id: id,
      line: <InvoiceLines onChangeVat={handleTotalVat} onChangeTotWoVat={handleTotalWoVat} onChangeTotal={handleTotalWvat} items={items} />,
    };
    setInvoiceLines([...invoiceLines, newLine]);
  }


  function newLineOnClick () {
    addNewLine();
  }

  const lineInputStyle =
    "appearance-none border-b border-gray-300 max-w-24 rounded-md p-1 focus:outline-none focus:border-blue-500";
  const [clientInput, setClientInput] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [date, setDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = () => {
    setIsChecked((prevState) => !prevState);
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  function searchClient(event) {
    const input = event.target.value;
    setSelectedClient(input);

    // Filter clients based on input
    const matchingClients = clients.filter((client) =>
      client.name.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(matchingClients);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && selectedClient) {
      event.preventDefault();
      // Find the selected client by its name
      const client = clients.find(
        (client) => client.name.toLowerCase() === selectedClient.toLowerCase()
      );
      if (client.length > 1) {
        setClientInput(client[0]);
        setSelectedClient(client[0].name);
        setSuggestions([]);
        setClientId(client[0].id);
      } else if (client.length === 1) {
        setClientInput(client[0]);
        setSelectedClient(client[0].name);
        setClientId(client.id);
      }
      setSuggestions([]);
    }
  }

  function handleSuggestionClick(suggestion) {
    const client = clients.find((client) => client.id === suggestion.id);
    console.log(client);
    setClientInput(client);
    setSelectedClient(client.name);
    setClientId(client.id);
    setSuggestions([]);
  }

  return (
    <Form method="POST" className="font-bold w-auto mt-1">
      {/* head */}
      <div className="grid grid-cols-2 p-3 bg-blue-950 text-white">
        <p className="mb-2">
          <label htmlFor="invoiceNumber">Number: </label>
          <input
            className="appearance-none border-b-2 bg-blue-950"
            id="invoiceNumber"
            type="number"
            name="invoiceNumber"
            required
          />
        </p>
        <p>
          <label htmlFor="invoiceDate">Date: </label>
          <input
            id="invoiceDate"
            type="date"
            name="invoiceDate"
            defaultValue={date}
            className="appearance-none border-b-2 bg-blue-950"
          />
        </p>
        <div>
          <label htmlFor="client">Client: </label>
          <input
            className="appearance-none border-b-2 bg-blue-950"
            type="text"
            id="client"
            name="client"
            required
            value={selectedClient}
            onChange={searchClient}
            onKeyDown={handleKeyDown}
            // onBlur={handleBlur}
          />
          {suggestions.length > 0 && (
            <ul className="absolute p-2 bg-white border-2 text-black rounded-lg shadow-md max-h-20 overflow-y-hidden text-ellipsis">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <p>
          <label htmlFor="isPaid">Pay?</label>
          <input
            type="checkbox"
            id="isPaid"
            name="isPaid"
            checked={isChecked}
            onChange={handleCheckbox}
          />
        </p>
      </div>
      {/* head end */}
      {/* invoice lines */}
      <div className="grid grid-cols-9 border border-transparent overflow-hidden">
        <label htmlFor="code">Code</label>
        <label htmlFor="item">Item</label>
        <label htmlFor="qty">QTY</label>
        <label htmlFor="prc">Price</label>
        <label
          htmlFor="disc"
          className="border border-transparent overflow-hidden"
        >
          Disc %
        </label>
        <label
          htmlFor="amo"
          className="border border-transparent overflow-hidden"
        >
          Amount
        </label>
        <label htmlFor="vatRt">VAT</label>
        <label htmlFor="totAmount">Total</label>
        <button
          type="button"
          className="bg-green-900 text-white rounded-2xl text-center"
          onClick={newLineOnClick}
        >
          New Line
        </button>
      </div>
      <ul>
        {invoiceLines.map((invoiceLine) => (
          <li key={invoiceLine.id}>{invoiceLine.line}</li>
        ))}
      </ul>
      {/* invoice lines end */}
      <div className="grid grid-cols-2">
        <div>
          <input className="hidden" value={clientId} name="clientId" readOnly />
        </div>
        <div className="grid grid-cols-3">
          <p className="border border-transparent overflow-hidden">
            <label
              htmlFor="totWOvat"
              className="border border-transparent text-nowrap overflow-hidden text-ellipsis"
            >
              Total Amount
            </label>
            <input
              className={lineInputStyle}
              id="totWOvat"
              type="number"
              name="totalWOvat"
              value={totalWoVat}
              readOnly
            />
          </p>
          <p className="flex flex-col">
            <label htmlFor="totVat">VAT</label>
            <input
              className={lineInputStyle}
              id="totVat"
              type="number"
              name="totalVat"
              value={totalVat}
              readOnly
            />
          </p>
          <p className="flex flex-col">
            <label htmlFor="tot">Total</label>
            <input
              className={lineInputStyle}
              id="tot"
              type="number"
              name="total"
              value={totalWvat}
              readOnly
            />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <p>
          <label htmlFor="note">Notes</label>
          <textarea id="note" name="notes"></textarea>
        </p>
        <p></p>
        <p>
          <button className="bg-blue-950 text-white border rounded-lg text-16 p-4">
            Save
          </button>
        </p>
      </div>
    </Form>
  );
}