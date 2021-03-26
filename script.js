
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
    document.getElementById('btnReload').style.display = "none";

}


function reloadpage(){
    var r = confirm("Memuat ulang halaman dari awal ?!");
    if (r) window.location.reload();
}


function toast(thiselement) {
    alert(thiselement.value);
}

function clearcache(){
    var r = confirm("Kosongkan data?!");

    if (r){
        var btnGenerate = document.getElementById("btnGenerate");
        btnGenerate.innerHTML = "Generate";
        khatib = ["",""];
        for (var i = 1; i <= nomor; i++){
            document.getElementById("editN" + i.toString()).value = "";
        }
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
    document.getElementById('btnReload').style.display = "block";


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
    var cell5 = row.insertCell(4);
    
    //Initialize header
    cell1.innerHTML = "<h3>No.<h3/>";
    cell1.style['width'] = '20px';
    cell2.innerHTML = "<h3>Masehi<h3/>";
    cell2.style['width'] = '150px';

    cell3.innerHTML = "<h3>Hijriah<h3/>";
    cell3.style['width'] = '170px';

    cell4.innerHTML = "<h3>Pasaran<h3/>";
    cell4.style['width'] = '80px';
    cell5.innerHTML = "<h3>Imam dan Khotib<h3/>";
    cell5.style['width'] = '320px';

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
            var cell5 = row.insertCell(4);

            cell1.innerHTML = nomor;
            cell2.innerHTML = x.getDate() + " " + (bulan[x.getMonth()]) + " " + (x.getFullYear());
            cell3.innerHTML = writeIslamicDate(x, -1);
            cell4.innerHTML = pasaran[selisih % 5];

            var divN = document.createElement("div");
            divN.setAttribute("id", "div" + nomor);
            cell5.appendChild(divN);

            var editN = document.createElement("input");
            editN.setAttribute("id", "editN" + nomor);
            editN.placeholder = "Nama khotib.."; 
            editN.style['width'] = '90%';
            editN.style['height'] = '38px';
            
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

// Credit to https://www.al-habib.info/islamic-calendar/hijricalendartext.htm
function gmod(n,m){
    return ((n%m)+m)%m;
}

function kuwaiticalendar(date, adjust){
    
    var today = date;
    if(adjust) {
        adjustmili = 1000*60*60*24*adjust; 
        todaymili = today.getTime()+adjustmili;
        today = new Date(todaymili);
    }
    day = today.getDate();
    month = today.getMonth();
    year = today.getFullYear();
    m = month+1;
    y = year;
    if(m<3) {
        y -= 1;
        m += 12;
    }

    a = Math.floor(y/100.);
    b = 2-a+Math.floor(a/4.);
    if(y<1583) b = 0;
    if(y==1582) {
        if(m>10)  b = -10;
        if(m==10) {
            b = 0;
            if(day>4) b = -10;
        }
    }

    jd = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524;

    b = 0;
    if(jd>2299160){
        a = Math.floor((jd-1867216.25)/36524.25);
        b = 1+a-Math.floor(a/4.);
    }
    bb = jd+b+1524;
    cc = Math.floor((bb-122.1)/365.25);
    dd = Math.floor(365.25*cc);
    ee = Math.floor((bb-dd)/30.6001);
    day =(bb-dd)-Math.floor(30.6001*ee);
    month = ee-1;
    if(ee>13) {
        cc += 1;
        month = ee-13;
    }
    year = cc-4716;

    if(adjust) {
        wd = gmod(jd+1-adjust,7)+1;
    } else {
        wd = gmod(jd+1,7)+1;
    }

    iyear = 10631./30.;
    epochastro = 1948084;
    epochcivil = 1948085;

    shift1 = 8.01/60.;
    
    z = jd-epochastro;
    cyc = Math.floor(z/10631.);
    z = z-10631*cyc;
    j = Math.floor((z-shift1)/iyear);
    iy = 30*cyc+j;
    z = z-Math.floor(j*iyear+shift1);
    im = Math.floor((z+28.5001)/29.5);
    if(im==13) im = 12;
    id = z-Math.floor(29.5001*im-29);

    var myRes = new Array(8);

    myRes[0] = day; //calculated day (CE)
    myRes[1] = month-1; //calculated month (CE)
    myRes[2] = year; //calculated year (CE)
    myRes[3] = jd-1; //julian day number
    myRes[4] = wd-1; //weekday number
    myRes[5] = id; //islamic date
    myRes[6] = im-1; //islamic month
    myRes[7] = iy; //islamic year

    return myRes;
}
function writeIslamicDate(date, adjustment) {
    //var wdNames = new Array("Ahad","Ithnin","Thulatha","Arbaa","Khams","Jumuah","Sabt");
    var iMonthNames = new Array("Muharram","Shafar","Rabi'ul Awwal","Rabi'ul Akhir",
    "Jumadal Ula","Jumadal Akhir","Rajab","Sya'ban",
    "Ramadhan","Syawwal","Dhulqa'adah","Dhulhijah");
    var iDate = kuwaiticalendar(date, adjustment);
    var outputIslamicDate = /*wdNames[iDate[4]] + ", " +*/ iDate[5] + " " + iMonthNames[iDate[6]] + " " + iDate[7];
    return outputIslamicDate;
}

