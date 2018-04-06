var totalEndevent = 0;
//first report -  need to be shift in another js
var activeatendreport = function (events, a, len, p, ou) {
    var enddate = p;
    var active = true;
    if(events !== undefined || events.length !== 0){
        if (events[events.length - 1].programStage == 'Kr60c8j7vMe') {
            var date = events[events.length - 1].eventDate;
            var first = date.split('T')[0];
            var expireDate = new Date(first);
            if (new Date(enddate) > expireDate) {
                active = false;
            }
        }
    }
   

    if (active) { totalEndevent++; }
    if (a >= len - 1) {
        pushfunctionR1(totalEndevent, getQuarterToPush(p), ou);
    }

};

var pushfunctionR1 = function (value, quarter, selectedou) {
    var dataValueSet = {
        "dataSet": "tJ1JJ1o7gkj",
        "period": quarter,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "JxOwlo5l4Is",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value
        },
        ]
    };
    $.ajax({
        async: false,
        type: 'post',
        dataType: 'json',
        contentType: "application/json",
        url: '../api/dataValueSets',
        data: JSON.stringify(dataValueSet),
        success: function (response) {
            console.log("values pushed for OU = " + selectedou + " and Period = " + quarter + "and value  = " + value);
            var row = '<tr><td>Active at end of RP</td><td>' + ounames[selectedou] + '</td><td>' + quarter + '</td><td>' + value + '</td><td>Success</td></tr>'
            $('.reporttable').append(row);
            totalEndevent = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr><td>Active at end of RP</td><td>' + ounames[selectedou] + '</td><td>' + quarter + '</td><td>' + value + '</td><td>warning</td></tr>'
            
            $('.reporttable').append(row);
            totalEndevent = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr><td>Active at end of RP</td><td>' + ounames[selectedou] + '</td><td>' + quarter + '</td><td>' + value + '</td><td>Error</td></tr>'
            
            $('.reporttable').append(row);
            totalEndevent = 0;
        }
    });
};