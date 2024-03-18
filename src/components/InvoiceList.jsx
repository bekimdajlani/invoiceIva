import { Link } from "react-router-dom";

export default function InvoiceList({ invoices, clients }) {
  const transformDate = (invoiceDate) => {
    const date = new Date(invoiceDate);
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  };

  const customerName = clients.map((client) => ({
    id: client.id,
    name: client.name,
  }));
  const clientName = (clientId) =>
    customerName.find((customer) => customer.id === clientId)?.name || null;

  return (
    <>
      <div className="items-center font-bold">
        <h1 className="text-4xl p-2 text-blue-900">All Invoices</h1>
      </div>
      <div className="font-bold bg-zinc-300">
        <ul>
          {invoices.map((invoice) => (
            <li
              key={invoice.id}
              className="hover:bg-zinc-500 border-black border-2 transition delay-75 duration-300 ease-in-out"
            >
              {/* invoice header */}

              <h1 className="mb-5 ml-5">{`Klienti: ${clientName(invoice.customerId)} `}</h1>
              <div className="grid grid-cols-3">
                <div className="ml-5">
                  <p>Nr</p>
                  <p>{invoice.invoiceNumber}</p>
                </div>
                <div></div>
                <div>
                  <p>Data</p>
                  <p>{transformDate(invoice.createdAt)}</p>
                </div>
                <div>
                  {invoice.isPaid ? (
                    <p className="text-green-800 mt-8 ml-5">Paguar</p>
                  ) : (
                    <p className="text-red-800 mt-8 ml-5">Pa Paguar</p>
                  )}
                </div>
                <div></div>
                <Link to={`${invoice.id}`}>
                <button
                  type="button"
                  className="mt-8 bg-blue-900 hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-900 text-white disabled:bg-gray-200 disabled:text-gray-400 border-none rounded-full p-2 font-semibold transition duration-200 ease-in-out"
                >
                  Details
                </button>
                </Link>
              </div>
              {/* invoice header end */}
              {/* inovice totals */}
              <div className="border-2 p-4">
                <div className="grid grid-cols-3 justify-evenly justify-items-start ml-3">
                  <p>Total Pa Tvsh</p>
                  <p>Tvsh</p>
                  <p>Total me Tvsh</p>
                </div>
                <div className="grid grid-cols-3 justify-evenly justify-items-start ml-3">
                  <p>{invoice.totalWoVat}</p>
                  <p>{invoice.totalVatAmount}</p>
                  <p>{invoice.totalAmount}</p>
                </div>
              </div>
              {/* invoice totals end */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}