import React from 'react'


const CityComponent = (props) => {
    const{updateCity,fetchWeather}=props;
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      {/* <img src='/icons/cloud.png' alt="cloud"></img> */}
      <div className='container' style={{overflowX:"hidden"}}>
      <p id="city_lable">Find Weather of your City</p>
      <form onSubmit={fetchWeather}>
        <input type="text" placeholder="City"  onChange={(e) => updateCity(e.target.value)}/>
        <button type="submit" className='btn btn-primary mx-3'><i className="fa fa-search" aria-hidden="true"></i></button>
      </form>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
    
  )
}

export default CityComponent
