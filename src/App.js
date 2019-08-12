import React, {Component} from 'react';
import './App.css';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      amount: 500,
      duration: 6,
      interest: 0,
      emi :0,
      selectedTab: ""
    }
  }
  calcInterestAndEmi(amount,duration){
    console.log(amount,duration)
    // localStorage.setItem("amount", amount);
    // localStorage.setItem("duration", duration);
    // this.setState({amount:amount,duration:duration})
    axios.get('https://ftl-frontend-test.herokuapp.com/interest?amount='+amount+'&numMonths='+duration)
    .then(res=>{
      console.log(res.data)
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
    this.setState({amount:newValue});
    this.calcInterestAndEmi(this.state.amount,this.state.duration)
  }
  handleDurationSliderChange = (event, newValue) => {    
    this.setState({duration:newValue})
    this.calcInterestAndEmi(this.state.amount,this.state.duration)
  }
  handleChange = (event,val) => {
    console.log(val)
    if (val==="one"){
      this.setState({amount:500,duration:6});
      this.calcInterestAndEmi(500,6)
    }
    else if (val === "two"){
      this.setState({amount:1000,duration:10});
      this.calcInterestAndEmi(1000,10)
    }
    else if (val==="three") {
      this.setState({amount:2000,duration:20});
      this.calcInterestAndEmi(2000, 20)
    }
  }
  render(){
    return (
      <div>
        <h2>History</h2>
        <Tabs
        orientation="vertical"
        variant="scrollable"
        value={this.state.selectedTab}
        onChange={this.handleChange}
        aria-label="Vertical tabs example"
      >
        <Tab label="Amount1" value="one"  />
        <Tab label="Amount2" value="two"/>
        <Tab label="Amount 3" value="three"/>
        
      </Tabs>
     
      
        <p>Loan Amount</p>
        <Slider
              value={this.state.amount}
              name="amount"
              onChange={this.handleAmountSliderChange}
              min={500}
              max={5000}
              step={10}
              style={{width:200}}
              aria-labelledby="input-slider"
            />
        <Input
          margin="dense"
          value={this.state.amount}         
        />

        <p>Loan Duration</p>
        <Slider
              value={this.state.duration}
              name="duration"
              onChange={this.handleDurationSliderChange}
              min={6}
              max={24}
              step={1}
              style={{width:200}}
              aria-labelledby="input-slider"
            />
        <Input
          margin="dense"
          value={this.state.duration}          
        />

        <p>Interest Rate</p>
        <Input
          margin="dense"
          value={this.state.interest}          
        />
        <p>Monthly Payment</p>
        <Input
          margin="dense"
          value={this.state.emi}          
        />
        
      </div>
    );
  }
}

export default App;
