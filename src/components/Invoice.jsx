export default function Invoice (props) {

    const invoice = props.data.invoice;
    const clients = props.data.client;
    const items = props.data.items;

    console.log(invoice);
    console.log(props);

    const transformDate = (invoiceDate) => {
        const date = new Date(invoiceDate);
        const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
        return date.toLocaleDateString("en-GB", options);
      };

      const clientName = (clientId) => clients.find((client) => client.id === clientId)?.name || null;
    
    return (
        <form>
            {/* head */}
            <div className="border-2 font-bold">

            <div className="grid grid-cols-2 p-4">
            <div className="ml-10">
                <p>Nr</p>
                <p>{invoice.invoiceNumber}</p>
            </div>
            <div className="justify-self-end mr-10">
                <p>Date</p>
                <p>{transformDate(invoice.invoiceDate)}</p>
            </div>
            </div>
            <div className="grid grid-cols-3 ">
                <p className="ml-14">{`Klienti: ${clientName(invoice.customerId)}`}</p>
                {invoice.isPaid ? <p className="justify-self-center text-green-700">Paguar</p> : <p className="justify-self-center text-red-700">Pa Paguar</p>  }
                <p className="justify-self-end mr-14">Paguaj</p>
            </div>
            </div>
            {/* head end */}
            {/*body*/}
            <div className="grid grid-cols-8 font-bold border-2 border-black mt-5">
                <p>Code</p>
                <p>Name</p>
                <p>Qty</p>
                <p>Price</p>
                <p>Disc</p>
                <p>Tot</p>
                <p>Vat</p>
                <p>To Pay</p>
            </div>
            <ul className="mt-2">
                {invoice.invoiceLines.map((item) => (
                    <li key={item.id} className="grid grid-cols-8 border-b-2">
                        <input defaultValue={item.itemCode}/>
                        <input defaultValue={item.itemName}/>
                        <input defaultValue={item.quantity}/>
                        <input defaultValue={item.unitPrice}/>
                        <input defaultValue={item.discountPercent}/>
                        <input defaultValue={item.totalAfterDiscount}/>
                        <input className="border border-transparent overflow-hidden text-ellipsis" defaultValue={item.taxAmount}/>
                        <input className="border border-transparent overflow-hidden text-ellipsis" defaultValue={item.totalIncludingTax}/>
                    </li>
                ))}
            </ul>
            <div className="grid grid-cols-2 border-2 border-black mt-1">
                <div></div>
                <div className="grid grid-cols-4">
                    <div></div>
                <div className="font-bold justify-self-end ml-9">
                <p className="border border-transparent overflow-y-hidden truncate text-ellipsis">Tot w/o Vat</p>
                <p className="">{invoice.totalWoVat}</p>
                </div>
                <div className="font-bold justify-self-center">
                    <p className="">VAT</p>
                    <p className="">{invoice.totalVatAmount}</p>
                </div>
                <div className="font-bold">
                    <p>Total</p>
                    <p className="">{invoice.totalAmount}</p>
                </div>
            </div>
                </div> 
            {/* body end */}
        </form>
    )
}