
document.getElementById("changeGraphWithNewProperties").onclick = function() {
    // Get the properties from the form
    let currency = document.getElementById("CurrencyUpdater").value.substring(0,3);
    let start = document.getElementById("startDateUpdater").value;
    let end = document.getElementById("endDateUpdater").value;

    // save to local storage
    localStorage.setItem('Currency', currency);
    if(start){localStorage.setItem('startDate', start);}
    if(end){localStorage.setItem('endDate', end);}

    //reload page
    document.location.reload();
}

document.getElementById("removeDataStored").onclick = function() {
    localStorage.clear();
    document.location.reload();
}
