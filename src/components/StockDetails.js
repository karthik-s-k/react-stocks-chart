import React from 'react';

import LineChart from "./Plots/LineChart";
import CandleStickChart from "./Plots/CandleStickChart";

class StockDetails extends React.Component {

    render() {
      return (
          <div>    
            {
                this.props.stockInfo ?
                <div> 
                    { this.props.stockInfo.Name }
                    <br />
                    { this.props.stockInfo.Description }
                </div> : null
            }
            {
                this.props.financialItem ?
                <div>
                    { 
                        this.props.chartType === 'line' ?
                        <LineChart
                            color='green'
                            financialItem={this.props.financialItem}
                            financialItemName={this.props.financialItem.symbol}
                        /> :
                            <CandleStickChart
                                financialItem={this.props.financialItem}
                                financialItemName={this.props.financialItem.symbol}
                            />
                    }
                </div> : null
            }            
        </div>
      );
    }
  }
    
export default StockDetails;