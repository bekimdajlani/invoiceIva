// backend-server.js
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 8081;

app.use(bodyParser.json());
app.use(cors());

const apiConfig =    {
  headers: {
    "Content-Type": 'application/json',
  "Access-Control-Allow-Origin": "*",
}}

app.post('/api/items',async (req, res) => {
  try {
    let item = req.body;

    const response = await axios.post('http://sad1.ivaelektronik.com:8081/api/Items', item, apiConfig );

    const responseData = response.data;

    res.json(responseData);
  } catch (error) {
    console.error("Error occurred while forwarding request:", error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;
  console.log(req.body);
  try {
    const response = await axios.put(`http://sad1.ivaelektronik.com:8081/api/Items/${itemId}`, req.body, apiConfig);

    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error("Error occurred while forwarding request:", error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const response = await axios.delete(`http://sad1.ivaelektronik.com:8081/api/Items/${itemId}`);
    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error("Error occurred while forwarding request:", error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  const clientId = req.params.id;
  try {
    const response = await axios.delete(`http://sad1.ivaelektronik.com:8081/api/Customers/${clientId}`);
    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error("Error occurred while forwarding request:", error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/invoices/:id', async (req, res) => {
  const invoiceId = req.params.id;
  try {
    const response = await axios.delete(`http://sad1.ivaelektronik.com:8081/api/Invoices/${invoiceId}`);
    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error("Error occurred while forwarding request:", error);
    res.status(500).send('Internal Server Error');
  }
});


  app.post('/api/customers', async (req, res) => {
    try {
      const response = await axios.post('http://sad1.ivaelektronik.com:8081/api/Customers', req.body, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      const responseData = response.data;
      res.json(responseData);
    } catch (error) {
      console.error("Error occurred while forwarding request:", error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.put('/api/customers/:id', async (req, res) => {
    const clientId = req.params.id;
    try {
      const response = await axios.put(`http://sad1.ivaelektronik.com:8081/api/Customers/${clientId}`, req.body, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      const responseData = response.data;
      res.json(responseData);
    } catch (error) {
      console.error("Error occurred while forwarding request:", error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/api/invoices', async (req, res) => {
    try {
      const response = await axios.post('http://sad1.ivaelektronik.com:8081/api/Invoices', req.body, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      const responseData = response.data;
      res.json(responseData);
    } catch (error) {
      console.error("Error occurred while forwarding request:", error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/api/customers', async (req, res) => {
    
    try {
        const response = await axios.get('http://sad1.ivaelektronik.com:8081/api/Customers',apiConfig);
        const responseData = response.data;
        res.json(responseData);
    } catch (error) {
        console.error("Error occurred while forwarding request:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/invoices', async (req, res) => {
  try {
      const response = await axios.get('http://sad1.ivaelektronik.com:8081/api/Invoices',apiConfig);
      const responseData = response.data;
      res.json(responseData);
  } catch (error) {
      console.error("Error occurred while forwarding request:", error);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/api/invoices/:invoiceId', async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const response = await axios.get(`http://sad1.ivaelektronik.com:8081/api/Invoices/${invoiceId}`, apiConfig);
    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error("Error occurred while forwarding request:", error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/items', async (req, res) => {
  try {
      const response = await axios.get('http://sad1.ivaelektronik.com:8081/api/Items',apiConfig);
      const responseData = response.data;
      res.json(responseData);
  } catch (error) {
      console.error("Error occurred while forwarding request:", error);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/api/items/:itemId', async (req, res) => {

  const {itemId } = req.params;
  try {
      const response = await axios.get(`http://sad1.ivaelektronik.com:8081/api/Items/${itemId}`,apiConfig);
      const responseData = response.data;
      res.json(responseData);
  } catch (error) {
      console.error("Error occurred while forwarding request:", error);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/api/customers/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const response = await axios.get(`http://sad1.ivaelektronik.com:8081/api/Customers/${customerId}`, apiConfig);
    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error("Error occurred while forwarding request:", error);
    res.status(500).send('Internal Server Error');
  }
});

  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });