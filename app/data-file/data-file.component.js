'use strict';

angular.module('graphViewApp').factory('DataFile', function(DATA_HOST, DATA_FILEEXT, $q) {
    var DataFile = function(series, year, month) {
        this.ready = false;
        this.loading = false;
        this.series = series;
        this.year = year;
        this.month = month;
        this.period = moment({ year: year, month: month }).format('YYYY-MM');
        this.data = [];
        this.units = {};
    };

    DataFile.prototype.readData = function() {
        var me = this;
        me.ready = false;
        me.loading = true;

        return $q(function(resolve, reject) {
            var file = me.getFileURL();
            // Log loading files to monitor loading progress
            // eslint-disable-next-line no-console
            console.log('Reading data file: ' + me.series + ' (' + me.period + ')');
            d3.text(file, function(err, data) {
                if (err) {
                    reject('File not found: ' + file);
                } else {
                    me.parseCSV(data);
                    me.ready = true;
                    me.loading = false;
                    resolve();
                }
            });
        });
    };

    DataFile.prototype.parseCSV = function(data) {
        var me = this;
        data = data.substring(data.indexOf('\n') + 1); // remove first line
        me.data = d3.csv.parse(data, function(row) {
            row.date = me.parseDate(row.TIMESTAMP);
            delete row.TIMESTAMP;
            return row;
        });
        me.units = me.data.shift();
        me.data.shift(); // ignore the second line of metadata
    };

    DataFile.prototype.getFileURL = function() {
        return DATA_HOST + this.year + '/' + this.series + '_' + this.period + DATA_FILEEXT;
    };

    DataFile.prototype.parseDate = function(timestamp) {
        return moment(timestamp, 'YYYY-MM-DD HH:mm:ss');
    };

    return DataFile;
});
