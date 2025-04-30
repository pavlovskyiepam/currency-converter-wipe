const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml'); // Import js-yaml for parsing YAML

const app = express();

// Load and parse Swagger specification
const swaggerSpec = yaml.load(fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
});