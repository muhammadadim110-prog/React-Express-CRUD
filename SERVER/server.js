const express = require('express');
const { sequelize } = require('./models');

const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes'); 

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use('/category', categoryRoutes);
app.use('/product', productRoutes);

// Authenticate and sync database before starting the server
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        // Use sync({ alter: true }) in development only if you want Sequelize to adjust tables
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
})();
