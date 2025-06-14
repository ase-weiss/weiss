/**
 * 장비 Cpu 차트
 * @param chartId
 * @constructor
 */
var AloneUpsVolChart = function(chartId) {
    this.chartId = chartId;
    this.chart = null;
};

AloneUpsVolChart.prototype = function() {

    /**
     * 차트 생성
     */
    var initialize = function() {
        this.chart =
            HmHighchart.createStockChart(this.chartId, {
                yAxis: {
                    crosshair: true,
                    opposite: false,
                    showLastLabel: true,
                    labels: {
                        formatter:  function () {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    useHTML: true,
                    valueSuffix: '',
                    formatter: HmHighchart.absHtmlTooltipFormatter
                },
                series: [
                    {name: 'VOLTAGE 평균', type: 'area'},
                    {name: 'VOLTAGE 최대', type: 'line'},
                    {name: 'VOLTAGE 최소', type: 'line', visible: false}
                    //{name: 'VOLTAGE 최대', type: 'line', lineWidth: 0, marker: {enabled: true, radius: 4, symbol: 'diamond'}, visible: false}
                ]
            }, HmHighchart.TYPE_AREA);
    }

    /**
     * 데이터 바인딩 후 차트 갱신
     * @param chartDataArr
     */
    var updateBoundData = function(chartDataArr) {
        var noDataFlag = 0;
        //this.chart.series[1].data = [];
        if(chartDataArr != null && chartDataArr.length > 0) {
            for(var i = 0; i < chartDataArr.length; i++) {
                HmHighchart.setSeriesData(this.chartId, i, chartDataArr[i], false);
                if(chartDataArr[i].length>0) noDataFlag = 1;
            }
            this.chart.yAxis[0].update({gridLineWidth: noDataFlag}, false);

            HmHighchart.redraw(this.chartId);
        }
        else {
            alert('차트데이터를 확인하세요.');
        }
        try{
            if(noDataFlag == 0){
                this.chart.showNoData();
            }else
                this.chart.hideNoData();
            this.chart.hideLoading();
        } catch(err){}
    }

    /**
     * 임계선 표시추가
     * @param value
     */
    var redrawAxisPlotLines = function(value) {
        HmHighchart.removeAllAxisPlotLines(this.chart.yAxis[0]);
        HmHighchart.addAxisPlotLine(this.chart.yAxis[0], 'plot-line',  value, '{0}'.substitute(value));
    }

    /**
     *  차트 데이터 조회
     * @param params {tableCnt: 1, itemType: 1, mngNo: 1, itemIdx: 1, date1: '20190904', date2: '20190905', time1: '0000', time2: '2359'}
     */
    var searchData = function(params) {
        try {
            this.chart.hideNoData();
            this.chart.showLoading();
        } catch (err) {
        }

        var _this = this;
        var esUse = params.esUse;

        var perfData = new PerfData();
        perfData.searchAloneUpsPerf(_this, params, searchDataResult);
    }

    /**
     * 차트 데이터 조회결과 처리
     * @param params
     * @param result
     */
    var searchDataResult = function(params, result) {
        console.log('searchDataResult');
        var chartDataArr = null;
        console.log('result', result);

        if(params.esUse != 'Y'){
            if(params.tableCnt == 1) {
                this.chart.series[1].hide();
                this.chart.series[1].update({data:[]}, false, false);
                chartDataArr = HmHighchart.convertJsonArrToChartDataArr('dtYmdhms', ['avgVal', 'maxVal', 'minVal'], result);
            }else{
                this.chart.series[1].show();
                chartDataArr = HmHighchart.convertJsonArrToChartDataArr('dtYmdhms', ['avgVal', 'maxVal', 'minVal'], result);
            }
        }else{
            this.chart.series[1].hide();
            this.chart.series[1].update({data:[]}, false, false);
            chartDataArr = HmHighchart.convertJsonArrToChartDataArr('dtYmdhms', ['avgVal', 'maxVal', 'minVal'], result);
        }
        updateBoundData.call(this, chartDataArr);
    }

    /** remove the chart */
    var destroy = function() {
        HmHighchart.destroy(this.chart);
    }

    return {
        initialize: initialize,
        updateBoundData: updateBoundData,
        redrawAxisPlotLines: redrawAxisPlotLines,
        searchData: searchData,
        destroy: destroy
    }
}();