const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());

app.use(cors({
  origin: '*'
}));

function handleError(res, error) {
  res.status(400);
  res.json({
    error
  });
}

app.post('/list', (req, res) => {
  const { ids } = req.body;

  if (!ids) {
    return handleError(res, "Property 'ids' must be present");
  }

  if (!Array.isArray(ids)) {
    return handleError(res, "Property 'ids' must be an array");
  }

  if (ids.length === 0) {
    return handleError(res, "Property 'ids' must contain at least one ID");
  }

  if (ids.some(id => !(typeof id === 'string'))) {
    return handleError(res, "Property 'ids' must be an array of strings");
  }

  const invalid = [...new Set(ids.filter(id => !id.toString().match(/^P[A-Z\d]{7}$/)))];

  if (invalid.length > 0) {
    return handleError(res, {
      invalid_ids: invalid
    });
  }

  setTimeout(() => res.json({
    success: 'IDs saved'
  }), 2000);
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
