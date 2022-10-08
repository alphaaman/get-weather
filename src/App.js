import React from "react";
import Appcontainer from "./Appcontainer.js"
import Toast from "./Toast.js";
import "./index.css"

class App extends React.Component {
  constructor(){
      super()
      {
          this.state = {
              city_name : "london",
              error: false,
              temp : [],
              city : [],
              icon : [],
              desc : [],
              humidity : [],
              pressure : [],
              wind : [],
              visibility : []

          }
      }
      this.city=this.city.bind(this)
      this.submit=this.submit.bind(this)
      this.componentWillMount=this.componentWillMount.bind(this)
  }
  

  city(event){
      const {value} = event.target;
      this.setState({
          city_name : value
      }
      )

  }

submit(e){
    e.preventDefault();
    this.componentWillMount();
}
  
  componentWillMount(){
      const city = this.state.city_name
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0861a5029ae242c98d1f8edcbf54215`
      fetch(url)
      .then(response => {
        // Check if the response was successfull
        if (!response.ok)
        { 
          throw Error(response.status)
        }
        return response.json()
      })
      .then(response => (
          this.setState(
              {
                  temp : response.main.temp,
                  city : response.name,
                  icon : response.weather[0].icon,
                  desc : response.weather[0].description,
                  humidity : response.main.humidity,
                  pressure : response.main.pressure,
                  wind : response.wind.speed,
                  visibility : response.visibility
              }
          )
      ))
      .catch(error=>{
       // Handle 404 error
      console.log(error)  
      })
  }
  render(){
    return(
        <div>
            <form className="container form">
            <input className="input-box" name="t1" type="text" placeholder="Search location" onChange={this.city}></input>
            <button className="submit-button" onClick={this.submit}><p className="p-submit">SUBMIT</p></button>
            </form>
            <Appcontainer 
            temp = {this.state.temp}
            city = {this.state.city}   
            icon = {this.state.icon} 
            desc = {this.state.desc}
            humidity = {this.state.humidity}
            pressure = {this.state.pressure}
            wind = {this.state.wind}
            visibility = {this.state.visibility}
            />
           <Toast />    
        </div>
        )
    }
}
export default App