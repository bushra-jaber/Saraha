import express  from "express";
import { initApp } from "./src/module/app.router.js";
import 'dotenv/config';
const app=express();
const PORT=4000;
initApp(app,express);

app.listen(PORT,()=>{
console.log(`server is running on  ${PORT}`);
})