import React, {Component} from 'react';
import './App.css';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      amount: 500,
      duration: 6,
      interest: 0,
      emi :0,
      selectedTab: "",
      history: JSON.parse(localStorage.getItem("history")) || []
    }
  }
  calcInterestAndEmi(amount,duration){
    console.log(amount,duration)
    var item ={"amount":amount,"duration":duration}
    this.setState({history:[item,...this.state.history]},()=>{
      var hist = JSON.stringify(this.state.history)
      localStorage.setItem("history",hist)
    });
    
    // localStorage.setItem("amount", amount);
    // localStorage.setItem("duration", duration);
    // this.setState({amount:amount,duration:duration})
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
    console.log("Nam ",newValue)   
   this.setState({amount:newValue},()=>{this.calcInterestAndEmi(this.state.amount,this.state.duration)})

    
  }
  handleDurationSliderChange = (event, newValue) => {    
    this.setState({duration:newValue},()=>{this.calcInterestAndEmi(this.state.amount,this.state.duration)})
    // this.state.history.push({amount:this.state.amount,duration:newValue})
    
  }
  handleChange = (event,val) => {
    console.log(val)
      this.setState({amount:val.amount,duration:val.duration},
          ()=>{this.calcInterestAndEmi(this.state.amount,this.state.duration)});
          
  }
  render(){
    return (
      <div>
        <div className="grid-container">
          <div className="item1">
            {/* <h2 style={{textAlign:'center',margin:'auto'}}>Smart Loan Lender</h2> */}
          <AppBar position="static">
            <Toolbar variant="dense">          
              <h2 style={{textAlign:'center',margin:'auto'}}>Smart Loan Lender</h2>
            </Toolbar>
          </AppBar>
          </div>
          <div className="item2">
            <p>History</p>
            <Tabs
            orientation="vertical"
            variant="scrollable"
            value={this.state.selectedTab}
            onChange={this.handleChange}
            aria-label="Vertical tabs example"
            >
            {this.state.history?this.state.history.map(el=>{
              return (
                <Tab label={"Amount:"+el.amount +"  "+ el.duration} value={el}  />
              )
            }):null}
            {/* <Tab label="Amount1" value="one"  />
            <Tab label="Amount2" value="two"/>
            <Tab label="Amount 3" value="three"/>         */}
            </Tabs>
          </div>
          <div className="item3">
          <p>Loan Amount</p>
        <Slider
              value={this.state.amount}
              name="amount"
              onChange={this.handleAmountSliderChange}
              min={500}
              max={5000}
              step={10}
              style={{width:'30%'}}
              aria-labelledby="input-slider"
            />
            <br/>
            <TextField
              id="outlined-input-amount"
              value={this.state.amount+'$'}
              name="amount"
              margin="dense"
              variant="outlined"
            />
        {/* <Input
          margin="dense"
          value={this.state.amount}   
          style={{width:'30%'}}      
        /> */}
          </div>  
          <div className="item4">
          <p>Loan Duration</p>
        <Slider
              value={this.state.duration}
              name="duration"
              onChange={this.handleDurationSliderChange}
              min={6}
              max={24}
              step={1}
              style={{width:'30%'}}
              aria-labelledby="input-slider"
            />
            <br/>
            <TextField
              id="outlined-input-duration"
              value={this.state.duration}
              name="duration"
              margin="dense"
              variant="outlined"
            />
        {/* <Input
          margin="dense"
          value={this.state.duration}
          style={{width:'30%'}}          
        /> */}
          </div>
          <div className="item5">
            
        <p>Interest Rate</p>
        <TextField
              id="outlined-interest"
              value={this.state.interest}
              name="interest"
              margin="dense"
              variant="outlined"
            />
        {/* <Input
          margin="dense"
          value={this.state.interest}          
        /> */}
          </div>
          <div className="item6">
          <p>Monthly Payment</p>
          <TextField
              id="outlined-emi"
              value={this.state.emi}
              name="emi"
              margin="dense"
              variant="outlined"
            />
        {/* <Input
          margin="dense"
          value={this.state.emi}          
        /> */}
          </div>
        </div>

        
       

        
        
      </div>
    );
  }
}

export default App;
