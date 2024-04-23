import { useEffect, useState } from "react";

export default function InvoiceLines(props) {
  const lineInputStyle =
    "appearance-none border-b border-gray-300 max-w-24 rounded-md p-1 focus:outline-none focus:border-blue-500";
  const items = props.items;
  const [amount, setAmount] = useState(Number);
  const [vat, setVat] = useState(Number);
  const [total, setTotal] = useState(Number);
  const [qty, setQty] = useState(Number);
  const [price, setPrice] = useState(Number);
  const [suggestions, setSuggestions] = useState([]);
  const [itemInput, setItemInput] = useState('');
  const [selectedItem,setSelectedItem] = useState('');
  const [code,setCode] = useState('');
  const [vatRate,setVatRate] = useState(Number);
  const [discountPercent,setDiscount] = useState(0);
  const [itemId, setItemId] = useState(Number);

  function searchItem(event) {
    const input = event.target.value;
    setSelectedItem(input);

    // Filter clients based on input
    const matchingClients = items.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(matchingClients);
  }

  function handleItemId (itemId) {
    setItemId(itemId);
  }

  function handleSuggestionClick(suggestion) {
    const item = items.find((item) => item.id === suggestion.id);
    console.log(item);
    setItemInput(item);
    setSelectedItem(item.name);
    setPrice(item.price);
    setCode(item.code);
    setVatRate(item.vatRate)
    setItemId(item.id);
    setSuggestions([]);
  }

  function qtyInput (event) {
    setQty(event.target.value)
  }

  function calcVat (amount , vatRate) {
    const vat = amount * vatRate;
    setVat(parseFloat(vat.toFixed(2)));
  }

  function calcAmount (quantity, prc,discount) {

    if(discount != 0){

      const amount = quantity * (prc - (prc * discount/100));
      setAmount(parseFloat(amount.toFixed(2)));
    }else{
      const amount = quantity * prc;
      setAmount(parseFloat(amount.toFixed(2)));
    }
  }

  function getDiscount(event){
      setDiscount(event.target.value/100)
  }

  function calcTotal (amount, vat) {
    const total = amount + vat;
    setTotal(total);
  }

  function changePrice (event) {
    setPrice(event.target.value)
  }

  useEffect(() => {
    props.onChangeTotWoVat(amount);
  },[amount]);

  useEffect(()=>{
    props.onChangeVat(vat);
  },[vat]);

  useEffect(() => {
    calcAmount(qty, price, discountPercent)
    calcVat(amount,vatRate);
    calcTotal(amount,vat);
  },[amount,vat,vatRate,price,qty,discountPercent])

  return (
    <div className="grid grid-cols-9">
      <input id="itId" name="itemId" value={itemId} className="hidden" onChange={handleItemId}/>
      <p>
        <input
          className={lineInputStyle}
          type="text"
          id="code"
          name="itemCode"
          readOnly
          value={code}
        />
      </p>
      <p>
        <input
          className={lineInputStyle}
          type="text"
          id="item"
          name="itemName"
          onChange={searchItem}
          value={selectedItem}
        />
      </p>
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
      <p>
        <input
          className={lineInputStyle}
          type="number"
          id="qty"
          name="quantity"
          onChange={qtyInput}
          value={qty}
        />
      </p>
      <p>
        <input
          className={lineInputStyle}
          type="number"
          id="prc"
          name="unitPrice"
          value={price}
          onChange={changePrice}
        />
      </p>
      <p>
        <input
          id="disc"
          type="number"
          name="discountPercent"
          value={discountPercent}
          className={lineInputStyle}
          onChange={getDiscount}
        />
      </p>
      <p>
        <input
          className={lineInputStyle}
          id="amo"
          type="number"
          name="amount"
          value={amount}
          readOnly
        />
      </p>
      <p>
        <input
          className={lineInputStyle}
          id="vatRt"
          type="number"
          name="vatRate"
          value={vat}
          readOnly
        />
      </p>
      <p>
        <input
          id="totAmount"
          type="number"
          name="totalAmount"
          value={total}
          className={lineInputStyle}
          readOnly
        />
      </p>
    </div>
  );
}