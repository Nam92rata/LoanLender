import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        console.log("Here")
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
        return <p className="error">Something went wrong.<br/> Try clearing your cache</p>;
        }
    return this.props.children;
    }
}

class Sidebar extends Component {  
    render() {
        return (
        <div className="sidebar">
            <ErrorBoundary>
                <Tabs                
                    orientation="vertical"
                    variant="scrollable"
                    value={"History"}
                    onChange={this.props.func}
                    aria-label="Vertical tabs example"
                >
                <Tab label={"History"} disabled value={"History"}  />
                    {this.props.val?this.props.val.slice(0,5).map((el,i)=>{
                    return (
                    <Tab className="tab-area" key={i} label={el.amount +"$ for "+ el.duration+" months"} value={el}  />
                    )
                    }):null}
                </Tabs>
            </ErrorBoundary>        
        </div>
        );
    }
}

export default Sidebar;