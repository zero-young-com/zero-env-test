let data = new Object();
let result = new Array();
let count = [0, 0, 0, 0, 0, 0, 0, 0], sum = 0;
let barColors = [
    "#EB5353",
    "#F9D923",
    "#36AE7C",
    "#CA82FF",
    "#6FDFDF",
    "#EC9B3B",
    "#F7D716",
];
$.ajax({
    url: '//api.zero-young.com/test/getData',
    async: false,
    type: 'POST',
    success: res => {
        data = res;
    }
});
console.log(data);
let cnt = 0;
for(let i = 0; i < data.length; i++){
    if(data[i][5]) cnt++;
}
console.log(data.length, cnt);

/*
console.log(data);
for(let i = 0; i < data.length; i++){
    let cnt = 0;
    for(let j = 0; j < data[i].length; j++){
        cnt += data[i][j];
    }
    count[cnt]++;
    sum++;
    result.push(cnt);
}
count[6] += count[7];
count.splice(7, 1);
const ref = () => {
    let xValues = ['Lv1', 'Lv2', 'Lv3', 'Lv4', 'Lv5', 'Lv6', 'Lv7'];
    let yValues = count;
    new Chart("myChart", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: barColors,
            data: yValues,
            borderColor: 'rgba(0, 0, 0, 0)'
          }]
        },
        options: {
          legend: {display: false},
          animation: {
              duration: 1
          }
        }
      }); 
}
$(window).load(() => {
    for(let i = 0; i < count.length; i++){
        let cont = $('.list').html()
        $('.list').html(`${cont}<div class="lv${i + 1}" style="color: ${barColors[i]};">Lv${i + 1}: ${count[i].toLocaleString('ko-KR')}명 (${Math.floor(count[i] / sum * 100)}%)</div>`);
    }
    $('.list').html(`${$('.list').html()}<div class="sum">SUM: ${sum.toLocaleString('ko-KR')}명</div>`);
    ref();
});
*/