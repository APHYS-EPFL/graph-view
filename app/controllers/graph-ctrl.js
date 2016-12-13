angular.module('graphViewApp').controller('GraphCtrl', function($scope, $q, Util, DataIndex, PlotIndex) {
    var indexReady = false;

    // $scope.chartData = [{ date: moment({ date: 1 }), value: 1 },
    //    { date: moment({ date: 3 }), value: 2 },
    //    { date: moment({ date: 5 }), value: 3 }];

    $q.all([DataIndex.load(), PlotIndex.load()]).then(function() {
        $scope.years = Object.keys(DataIndex.dataPeriods);
        $scope.plots = PlotIndex.plots;

        // Initialize with current year/week, closest existing
        // data will be determined later
        var period = 7;
        var start = moment().subtract(period, 'days');
        $scope.selection = {
            period: period,
            month: start.month(),
            day: start.date(),
            year: start.year()
        };
        indexReady = true;
        $scope.ChangeYear($scope.selection.year);
    }, function(err) {
        console.error('Failed to load data and plot index!', err);
    });

    $scope.$watch('selection', function(selection) {
        if (indexReady) {
            PlotIndex.loadPlotData($scope.selectionMoment(),
            $scope.selection.period).then(function() {
                // $scope.chartData = PlotIndex.plots[0].columns[0].data;
            });
        }
    }, true);

    $scope.AlphaMonth = function(month, shortForm) {
        if (indexReady) {
            var m = moment({ month: month });
            return shortForm ? m.format('MMM') : m.format('MMMM');
        }
        return 'Loading...';
    };

    $scope.AlphaPeriod = function(period) {
        if (indexReady) {
            return period + ' day' + (period === 1 ? '' : 's');
        }
        return '...';
    };

    $scope.ChangeDay = function(day) {
        $scope.selection.day = day;
    };

    $scope.ChangeMonth = function(month) {
        $scope.selection.month = month;
        // Create array of days for drop down list (ng-repeat requires an array)
        var nDays = moment({ month: month }).daysInMonth();
        $scope.days = [];
        for (var i = 1; i <= nDays; i++) {
            $scope.days.push(i);
        }
        $scope.ChangeDay(Util.closest($scope.days, $scope.selection.day, false));
    };

    $scope.ChangeYear = function(year) {
        if (indexReady) {
            $scope.selection.year = year;
            $scope.months = DataIndex.dataPeriods[year];
            $scope.ChangeMonth(Util.closest($scope.months, $scope.selection.month, false));
        }
    };

    $scope.ChangePeriod = function(period) {
        $scope.selection.period = period;
    };

    $scope.selectionMoment = function() {
        var sel = $scope.selection;
        return moment({ year: sel.year, month: sel.month, day: sel.day }).endOf('day');
    };
});
