const express = require('express')
const cors = require('cors')
const {refreshToken} = require('./module')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())
//---------routs_imports------------
const routeLeads = require('./routs/routeLead')
const routeContact = require('./routs/routeContact')
const routeCompany = require('./routs/routeCompany')
//r---------outs_add----------------
app.use("/lead", routeLeads)
app.use("/contact", routeContact)
app.use("/company", routeCompany)
//-------updatetoken----------------
//refreshToken()

const port = 5000;
const server = async ()=>{
  try{
    app.listen(port, ()=> { console.log(`Server started on port: ${port}`) })
  }
  catch(e){
    console.log('Server invalid', e.message)
    process.exit()
  }
}
server()