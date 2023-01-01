export function formatTime(date){
    var d = typeof date === 'string' ? new Date(date) : date,
    hours = '' + d.getHours(),
    minutes = '' + d.getMinutes();
    if (minutes == 0) {
        minutes = minutes + "0"
    }
    var strTime = hours + ':' + minutes;
    return strTime;
}

export function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export function formatNumberAum(num) {
    return num.toLocaleString(undefined,{ minimumFractionDigits: 2,maximumFractionDigits: 2})
}

export function formatNumberNav(num) {
    return num.toLocaleString(undefined,{ minimumFractionDigits: 4,maximumFractionDigits: 4})
}

export function formatDate(date) {
    
    var d = typeof date === 'string' ? new Date(date) : date,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');

}
export function ddmmyyyyToDate(date){

    var start = new Date('1899-12-30')
    console.log(start)
    start.setDate(start.getDate() + date)
    start.toLocaleDateString() 
    return start
}
export function formatDateDmy(date) {
    
    var d = typeof date === 'string' ? new Date(date) : date,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');

}

export function formatDefaultDate(date) {
    const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var d = typeof date === 'string' ? new Date(date) : date,
        month = months[d.getMonth()],
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join(' ');
}
export function formatDefaultFullDate(date) {
    const months = ["Januari", "Februari", "Maret","April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var d = typeof date === 'string' ? new Date(date) : date,
        // month = '' + (d.getMonth() + 1),
        month = months[d.getMonth()],
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join(' ');
}

export function formatDefaultMonthYear(date) {
    const months = ["Januari", "Februari", "Maret","April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var d = typeof date === 'string' ? new Date(date) : date,
        month = months[d.getMonth()],
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    return [month, year].join(' ');
}

export function readPDF(backendserver,store,url,filename){
    fetch(`${backendserver}${url}`,{
        method: 'GET',
        headers: {
            Authorization: 'Bearer '+store.getState().session.token,
        }
    })
    .then((res) => { 
        return res.blob(); 
    })
    .then((data) => {
        var a = document.createElement("a");
        const fileUrl = window.URL.createObjectURL(data);
        a.download = filename;
        a.href = fileUrl;
        a.target = "_blank";
        a.click();
    });
}

export function download(backendserver,store,url,filename) {   
    fetch(`${backendserver}${url}`,{
        method: 'GET',
        headers: {
            Authorization: 'Bearer '+store.getState().session.token
        }
    })
    .then((res) => { 
        return res.blob(); 
    })
    .then((data) => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = filename;
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    });
}

export const downloadURI = (uri, filename) => {
    var a = document.createElement("a");
    a.href = uri;
    a.download = filename;
    a.click();
    document.body.removeChild(a);
  }

export function generateTextFile(text, name, type,extension) {
    var file = new Blob([text], {type: type});

    var a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = name+extension;
    document.body.appendChild(a);
    a.click();
    // setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    // }, 0); 
  }

export function generateExcelFile(data, name) {
    const fileExtension = '.xlsx';
    

    var a = document.createElement("a"),
        url = URL.createObjectURL(data);
    a.href = url;
    a.download = name+fileExtension;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
  }

export const objectMap = (obj, fn) =>
    Object.fromEntries(
        Object.entries(obj).map(
            ([k, v], i) => [k, fn(v, k, i)]
        )
)

export function search(value, propName, arrayobject){
    for (var i=0; i < arrayobject.length; i++) {
        if(arrayobject[i][propName]){
            if (arrayobject[i][propName].trim() === value.trim()) {
                return arrayobject[i];
            }
        }
    }
}

export function searchIndex(value, propName, arrayobject){
    for (var i=0; i < arrayobject.length; i++) {
        if(arrayobject[i][propName]){
            if (arrayobject[i][propName].trim() === value.trim()) {
                return i;
            }
        }
    }
}

export function camelCaseToTitleCase(text){
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export const singkatFormatAngka = (num) => {
    let formatAngka, simbol
    if (num < 900) {
		formatAngka = num;
		simbol = '';
	} else if (num < 900000) {
		formatAngka = formatNumberAum(num / 1000);
		simbol = 'Ribu';
	} else if (num < 900000000) {
		formatAngka = formatNumberAum(num / 1000000);
		simbol = 'Juta';
	} else if (num < 900000000000) {
		formatAngka = formatNumberAum(num / 1000000000);
		simbol = 'M';
	} else {
		formatAngka = formatNumberAum(num / 1000000000000);
		simbol = 'T';
	}

    return formatAngka+' '+simbol
}

export function timeDiff(date1, date2) {
    date1 = new Date(date1);
    date2 = date2 ? new Date(date2) : new Date();

    let differenceInTime = date1.getTime() - date2.getTime();

    differenceInTime = Math.abs(differenceInTime);

    const differenceInSec = differenceInTime / (1000);

    let DiffText;
    if (differenceInSec < 5){
        DiffText = `Just Now`;
        return DiffText;
    }

    if (differenceInSec < 60){
        DiffText = `${Math.round(differenceInSec)} seconds ago`;
        return DiffText;
    }

    if (differenceInSec < 3600){
        DiffText = `${Math.round(differenceInSec / 60)} minutes ago`;
        return DiffText;
    }
    
    if (differenceInSec < (3600 * 24)){
        DiffText = `${Math.round(differenceInSec / 3600)} hours ago`;
        return DiffText;
    }

    if (differenceInSec >= (3600 * 24) && differenceInSec < (3600 * 24 * 30)){
        DiffText = `${Math.round(differenceInSec / (3600 * 24))} days ago`;
        return DiffText;
    }

    if (differenceInSec >= (3600 * 24 * 30) && differenceInSec < (3600 * 24 * 30 * 12)){
        DiffText = `${Math.round(differenceInSec / (3600 * 24 * 30))} month ago`;
        return DiffText;
    }

    if (differenceInSec >= (3600 * 24 * 30 * 12)){
        DiffText = `${Math.round(differenceInSec / (3600 * 24 * 30 * 12))} years ago`;
        return DiffText;
    }
}