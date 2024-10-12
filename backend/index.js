const express = require('express');
const userRouter = require('./routers/userRouter');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


app.use('/', userRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
