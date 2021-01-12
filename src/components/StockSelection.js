import React from 'react';
import StockDetails from "./StockDetails";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as stockActions from "../actions/financialItem";

import './styles/financialItemStyle';
import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Input from "@material-ui/core/Input/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class StockSelection extends React.Component {
    constructor(props) {
      super(props);
      this.state = {code: '', isSubmitted: false, chartType: 'line', typeOfData: 'daily' };
  
      this.handleClear = this.handleClear.bind(this);
      this.fetchStockInfo = this.fetchStockInfo.bind(this);
      this.handleChartChange = this.handleChartChange.bind(this);
      this.handleStockChange = this.handleStockChange.bind(this);
      this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
    }
  
    handleClear() {
      this.setState({ isSubmitted: false, code: '' });
    }
  
    fetchStockInfo() {        
        if (this.state.code !== null && this.state.code !== undefined && this.state.code !== '') {
          this.props.stockActions.getStockInfo(this.state.code);
          this.props.stockActions.getFinancialItem(this.state.code, this.state.typeOfData);
          this.setState({ isSubmitted: true });
        }
    }
    
    handleStockChange(event) {
      this.setState({ code: event.target.value });
    }

    handleChartChange(event) {
      debugger;
      this.setState({ chartType: event.target.value });
    }

    handleDataTypeChange(event) {
      this.setState({ typeOfData: event.target.value });
    }
  
    render() {
      return (
        <div>
          <FormControl className="formControl">            
            <input type="text" value={this.state.code} onChange={this.handleStockChange} placeholder='Stock code' />            
            
            {/* <InputLabel shrink>Type of data</InputLabel> */}
            <Select                
                value={this.state.typeOfData}
                onChange={this.handleDataTypeChange}
                className="selectEmpty"
            >
              <MenuItem value={'daily'}>Daily</MenuItem>
              <MenuItem value={'weekly'}>Weekly</MenuItem>
              <MenuItem value={'monthly'}>Monthly</MenuItem>
            </Select>
            <div onChange={this.handleChartChange}>
              <input type="radio" value={'line'} name="line" checked={this.state.chartType === 'line'} /> Line
              <input type="radio" value={'candle'} name="candle" checked={this.state.chartType === 'candle'} /> Candle stick
            </div>
            
            <input type="button" value="Reset" onClick={this.handleClear} />
            <input type="button" value="Search" onClick={this.fetchStockInfo} />
          </FormControl>
          {
            this.state.isSubmitted === true ?
              <StockDetails stockInfo={this.props.stockDetails.stockInfo} financialItem={this.props.stockChart.financialItem} chartType={this.state.chartType} />
              : null
          }
          
        </div>
      );
    }
  }

StockSelection.propTypes = {
    financialItem: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        stockActions: bindActionCreators(stockActions, dispatch)
    };
}

const mapStateToProps = state => ({
    stockDetails: state.stockInfo,
    stockChart: state.financialItem
})

export default connect(mapStateToProps,mapDispatchToProps)(StockSelection);