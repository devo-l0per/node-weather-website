const {geoCode} = require('./utils/geocode')
const {foreCast} = require('./utils/forecast')
const path = require('path')
const express = require('express')

const hbs = require('hbs');
//partials set up
const partialsDirectoryPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsDirectoryPath)



const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')




// to rename the location of our views folder to templates
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
app.set('views',viewsDirectoryPath)

// setting up hbs
app.set('view engine', 'hbs')

// set up static directory to serve #public directory
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name: 'Akhil'
    })
})


app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name:'Akhil'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'It is a help text',
        title:'Help',
        name:'Akhil'

    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({   
            error:'you must provide an address'
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={}) =>{
         if(error){
             return res.send({error})
         }

         foreCast(latitude,longitude,(error,foreCastData)=>{
             if(error){
                 return res.send({error})
             }

             res.send({
                 forecast: foreCastData,
                 location,
                 address: req.query.address

         })
    })
    
    })
})




app.get('/help/*',(req,res) => {
 res.render('404',{
     title:'404',
     name:'Akhil',
     errorMessage:'Help article not found'
 })
})

// * for all other route searches , has to be on the end . It matches everything.
app.get('*',(req,res) =>{ 
    res.render('404',{
        title: '404',
        name: 'Akhil',
        errorMessage: 'Page not found'
    })   

})
app.listen(port,() =>{
    console.log('server is up on port 3000')
})

