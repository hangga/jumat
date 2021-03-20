
var pasaran = new Array('Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon');
var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

var khatib = [""];

var thisYear = new Date().getFullYear();
var selyear = document.getElementById('selyear');
var nomor;

function initialize() {
    for (var i = thisYear-1; i <= thisYear + 10; i++) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(i));
        opt.value = i;
        selyear.appendChild(opt);
    }btnExport
    selyear.value = thisYear;


    document.getElementById('btnSave').style.display = "none";
    document.getElementById('btnClear').style.display = "none";
    document.getElementById('btnExport').style.display = "none";
}


function toast(thiselement) {
    alert(thiselement.value);
}

function clearcache(){
    var btnGenerate = document.getElementById("btnGenerate");
    btnGenerate.innerHTML = "Generate";
    khatib = ["",""];
    for (var i = 1; i <= nomor; i++){
        document.getElementById("editN" + i.toString()).value = "";
    }
    
}

function saveData() {
    document.getElementById('btnGenerate').style.display = "block";
    document.getElementById('btnClear').style.display = "none";
    document.getElementById('btnSave').style.display = "none";
    document.getElementById('btnExport').style.display = "block";

    var btnGenerate = document.getElementById("btnGenerate");
    btnGenerate.innerHTML = "Edit";
    for (var i = 1; i <= nomor; i++) {
        var divNn = document.getElementById("div" + i.toString());
        var editNn = document.getElementById("editN" + i.toString());
        divNn.innerHTML = editNn.value;
        khatib[i] = editNn.value;
    }
}

function generate() {
    document.getElementById('selyear').style.display = "none";
    document.getElementById('btnGenerate').style.display = "none";
    document.getElementById('btnSave').style.display = "block";
    document.getElementById('btnClear').style.display = "block";
    document.getElementById('btnExport').style.display = "none";
    //document.getElementById('btnExport').style.display = "block";


    nomor = 0;
    var khotibTable = document.getElementById("khotibTable");

    var rowCount = khotibTable.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
        khotibTable.deleteRow(i);
    }

    var row = khotibTable.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Initialize header
    cell1.innerHTML = "<h3>No.<h3/>";
    cell1.style['width'] = '20px';
    cell2.innerHTML = "<h3>Tanggal<h3/>";
    cell2.style['width'] = '200px';
    cell3.innerHTML = "<h3>Pasaran<h3/>";
    cell3.style['width'] = '150px';
    cell4.innerHTML = "<h3>Imam dan Khotib<h3/>";
    cell4.style['width'] = '300px';

    var currentValue = parseInt(selyear.options[selyear.selectedIndex].value);
    var d2 = new Date("2014/01/27");

    //initialize starting date
    var x = new Date();
    x.setFullYear(currentValue, 00, 01);

    //initialize next starting date
    var y = new Date();
    y.setFullYear(currentValue + 1, 00, 01);

    var j = 1;
    var count = 0;

    //getting the all fridays in a financial year
    for (var i = 0; x < y; i += j) {
        if (x.getDay() == 5) {
            nomor++;
            var selisih = Math.floor(Math.abs(x - d2) / 86400000);

            var row = khotibTable.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.innerHTML = nomor;
            cell2.innerHTML = x.getDate() + " " + (bulan[x.getMonth()]) + " " + (x.getFullYear());
            cell3.innerHTML = pasaran[selisih % 5];

            var divN = document.createElement("div");
            divN.setAttribute("id", "div" + nomor);
            cell4.appendChild(divN);

            var editN = document.createElement("input");
            editN.setAttribute("id", "editN" + nomor);
            editN.style['width'] = '300px';
            if(khatib[nomor] !== null && khatib[nomor] !== '' && khatib[nomor] !== undefined) {
                editN.value = khatib[nomor];
            }
            divN.appendChild(editN);

            x = new Date(x.getTime() + (7 * 24 * 60 * 60 * 1000));
            j = 7;
            count++;
        } else {
            j = 1;
            x = new Date(x.getTime() + (24 * 60 * 60 * 1000));
        }
    }
}
