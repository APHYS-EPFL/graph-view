angular.module('meteoGraphApp').service('Util', function() {
    /**
      * finds the entry closest to <query> in <collection>
      */
    this.closest = function(collection, query, returnIndex) {
        var minDiff = Number.MAX_VALUE;
        var result;
        var resultIndex;
        collection.forEach(function(entry, i) {
            var diff = Math.abs(entry - query);
            if (diff < minDiff) {
                minDiff = diff;
                result = entry;
                resultIndex = i;
            }
        });
        if (returnIndex) {
            return resultIndex;
        }
        return result;
    };
});
