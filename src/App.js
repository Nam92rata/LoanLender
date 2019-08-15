import React, {Component} from 'react';
import './App.css';
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Sidebar from './Sidebar';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      amount: 500,
      duration: 6,
      interest: 0.25,
      emi :93,
      selectedTab: "",
      history: JSON.parse(localStorage.getItem("history")) || []       
    }
  }
  
  calcInterestAndEmi(amount,duration){
    var item ={"amount":amount,"duration":duration}
    this.setState({amount:amount,duration:duration,history:[item,...this.state.history]},()=>{      
      var hist = JSON.stringify(this.state.history)
      localStorage.setItem("history",hist)
    });
    axios.get('https://ftl-frontend-test.herokuapp.com/interest?amount='+amount+'&numMonths='+duration)
    .then(res=>{
      this.setState({
        interest:res.data.interestRate,
        emi:res.data.monthlyPayment.amount
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }
  handleAmountSliderChange = (event, newValue) => {    
  this.calcInterestAndEmi(newValue,this.state.duration)
  }
  handleDurationSliderChange = (event, newValue) => {  
    this.calcInterestAndEmi(this.state.amount,newValue)  
  }
  handleChange = (event,val) => {
      this.setState({selectedTab:val, amount:val.amount,duration:val.duration},
          ()=>{this.calcInterestAndEmi(this.state.amount,this.state.duration)});          
  }
  render(){
    return (
      <div>
        <div className="grid-container">
          <div className="item1">
          <AppBar position="static">
            <Toolbar variant="dense">          
              <h2 className="appbar">Smart Loan Lender</h2>
            </Toolbar>
          </AppBar>
          </div>
          <div className="item2">
            <Sidebar val={this.state.history} tab={this.state.selectedTab} func={this.handleChange}/>
          </div>

          <div className="item3">
          <p className="text-header">Loan Amount</p>          
          <Slider
              value={this.state.amount?this.state.amount:500}
              name="amount"
              onChange={this.handleAmountSliderChange}
              min={500}
              max={5000}
              step={10}
              style={{width:'60%',color:'crimson'}}
              aria-labelledby="input-slider"
            />
            <br/>
            <TextField
              className="text-field"
              id="outlined-input-amount"              
              value={this.state.amount?this.state.amount+'$':""}
              name="amount"
              margin="dense"
              variant="outlined"
            />        
          </div>  

          <div className="item4">
          <p className="text-header">Loan Duration</p>
          <Slider
              value={this.state.duration?this.state.duration:6}
              name="duration"
              onChange={this.handleDurationSliderChange}
              min={6}
              max={24}
              step={1}
              style={{width:'60%',color:'crimson'}}
              aria-labelledby="input-slider"
            />
            <br/>
            <TextField
              className="text-field"
              id="outlined-input-duration"
              value={this.state.duration?this.state.duration+" months":""}
              name="duration"
              margin="dense"
              variant="outlined"
            />        
          </div>

          <div className="item5">            
          <p className="text-header-result">Interest Rate</p>
          <TextField
              className="text-field-result"
              id="outlined-interest"
              value={this.state.interest+' %'}
              name="interest"
              margin="dense"
              variant="outlined"
            />        
          </div>

          <div className="item6">
          <p className="text-header-result">Monthly Payment</p>
          <TextField
              className="text-field-result"
              id="outlined-emi"
              value={this.state.emi+"$"}
              name="emi"
              margin="dense"
              variant="outlined"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
