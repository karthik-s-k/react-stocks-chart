import * as types from "./types";

export const getStockInfo = (symbol) => async dispatch => {
    let finItemSymbol = symbol;

    let stockInfo = [];

    try{
        await fetch(types.BASE_URL + `function=OVERVIEW&symbol=${finItemSymbol}&apikey=${process.env.API_KEY}`)
           .then(
               function(response) {
                   return response.json();
               }
           )
           .then(
               function(data) {
                   console.log(data); 
                   stockInfo = data;
               })        

       dispatch({
           type: types.GET_STOCK_INFO,
           payload: stockInfo
       })
   }catch (e) {
       console.log(e)
   }
}

export const getFinancialItem = (symbol, typeOfData) => async dispatch => {
    let finItemSymbol = symbol;

    let financialChartXValuesFunction = [];
    let financialChartCloseValuesFunction = [];
    let financialChartOpenValuesFunction = [];
    let financialChartHighValuesFunction = [];
    let financialChartLowValuesFunction = [];

    let dataType = 'TIME_SERIES_DAILY_ADJUSTED';
    let dataName = 'Time Series (Daily)';
    
    if (typeOfData === 'weekly') {
        dataType = 'TIME_SERIES_WEEKLY_ADJUSTED';
        dataName = 'Weekly Adjusted Time Series';
    }
    else if (typeOfData === 'monthly') {
        dataType = 'TIME_SERIES_MONTHLY_ADJUSTED';
        dataName = 'Monthly Adjusted Time Series'
    }

    try{
         await fetch(types.BASE_URL + `function=` + dataType + `&symbol=${finItemSymbol}&outputsize=compact&apikey=${process.env.API_KEY}`)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    console.log(data);
                    let count = 0;

                    for (let key in data[dataName]) {
                        count++;
                        if (count > 500)
                            break;
                            
                        financialChartXValuesFunction.push(key);
                        financialChartCloseValuesFunction.push(data[dataName][key]['4. close']);
                        financialChartOpenValuesFunction.push(data[dataName][key]['1. open']);
                        financialChartHighValuesFunction.push(data[dataName][key]['2. high']);
                        financialChartLowValuesFunction.push(data[dataName][key]['3. low']);
                    }

                })

        const financialItem = {
            symbol: finItemSymbol,
            financialChartXValues: financialChartXValuesFunction,
            financialChartCloseValues: financialChartCloseValuesFunction,
            financialChartOpenValues: financialChartOpenValuesFunction,
            financialChartHighValues: financialChartHighValuesFunction,
            financialChartLowValues: financialChartLowValuesFunction,
        };

        dispatch({
            type: types.GET_FINANCIAL_ITEM,
            payload: financialItem
        })
    }catch (e) {
        console.log(e)
    }
}