
let promise = new Promise (async function (resolve, reject) {
  let promise =await fetch('https://front-test.beta.aviasales.ru/search');
  let res = await promise.json();
  let myUrl = 'https://front-test.beta.aviasales.ru/tickets' + '?searchId=' + res.searchId;
  let tickets = await fetch(myUrl);
  if(tickets.status != 200) {
    let div = document.createElement('div');
    div.classList.add('errTicket');
    div.classList.add('right-object');
    div.innerText='Что-то пошло не так! Перезагрузите страницу...';
    document.querySelector('#Tickets_window').append(div);
  }
  let answer = await tickets.json();
  resolve(answer.tickets);
});

let r=5;
function fiveTicket(){ return promise.then(function (arr){
  for (let i =0; i<arr.length; i++){

  let div = document.createElement('div')
  div.className = "Ticket";

  let myUrl='https://pics.avs.io/99/36/'+arr[i].carrier+'.png';

  let stops = "";
  let pointStops = "";
  switch(arr[i].segments[0].stops.length){
    case 0:{
      stops = stops + "Без пересадок";
      pointStops = pointStops +"-";
      break;
    }
    case 1:{
      stops = stops + "1 пересадка";
      pointStops = pointStops + arr[i].segments[0].stops[0];
      break;
    }
    case 2:{
      stops = stops + "2 пересадки";
      pointStops = pointStops + arr[i].segments[0].stops[0]+", "+ arr[i].segments[0].stops[1];
      break;
    }
    case 3:{
      stops = stops + "3 пересадки";
      pointStops = pointStops + arr[i].segments[0].stops[0]+", "+ arr[i].segments[0].stops[1]+", "+ arr[i].segments[0].stops[2];
      break;
    }
  }

  let stops1 = "";
  let pointStops1 = "";
  switch(arr[i].segments[1].stops.length){
    case 0:{
      stops1 = stops1 + "Без пересадок";
      pointStops1 = pointStops1 +"-";
      break;
    }
    case 1:{
      stops1 = stops1 + "1 пересадка";
      pointStops1 = pointStops1 + arr[i].segments[1].stops[0];
      break;
    }
    case 2:{
      stops1 = stops1 + "2 пересадки";
      pointStops1 = pointStops1 + arr[i].segments[1].stops[0]+", "+ arr[i].segments[1].stops[1];
      break;
    }
    case 3:{
      stops1 = stops1 + "3 пересадки";
      pointStops1 = pointStops1 + arr[i].segments[1].stops[0]+", "+ arr[i].segments[1].stops[1]+", "+ arr[i].segments[1].stops[2];
      break;
    }
  }

  div.classList.add(String(arr[i].segments[0].stops.length));
  div.classList.add(String(arr[i].segments[1].stops.length));
  div.classList.add("all");
  div.classList.add("right-object");
  if (i>=5) div.classList.add('hide3');
  div.setAttribute("data-price",arr[i].price);
  div.setAttribute("data-time",arr[i].segments[0].duration+arr[i].segments[1].duration)
  let d = new Date(arr[i].segments[0].date);
  let hours = String(d.getHours());
  let minutes = String(d.getMinutes());
  if (hours.length == 1) hours = "0"+hours;
  if (minutes.length == 1) minutes = "0"+minutes;

  d.setHours(d.getHours()+ Math.trunc(arr[i].segments[0].duration/60));
  d.setMinutes(d.getMinutes()+ arr[i].segments[0].duration%60);
  let hours2 = String(d.getHours());
  let minutes2 = String(d.getMinutes());
  if (hours2.length == 1) hours2 = "0"+hours2;
  if (minutes2.length == 1) minutes2 = "0"+minutes2;

  let d1 = new Date(arr[i].segments[1].date);
  let hours1 = String(d1.getHours());
  let minutes1 = String(d1.getMinutes());
  if (hours1.length == 1) hours1 = "0"+hours1;
  if (minutes1.length == 1) minutes1 = "0"+minutes1;

  d1.setHours(d1.getHours()+ Math.trunc(arr[i].segments[1].duration/60));
  d1.setMinutes(d1.getMinutes()+ arr[i].segments[1].duration%60);
  let hours3 = String(d1.getHours());
  let minutes3 = String(d1.getMinutes());
  if (hours3.length == 1) hours3 = "0"+hours3;
  if (minutes3.length == 1) minutes3 = "0"+minutes3;

  let arrPrice = String(arr[i].price);
  let Price = arrPrice[0] + arrPrice[1]+" "+arrPrice[2]+arrPrice[3]+arrPrice[4];
  div.innerHTML = ('<div class="header"><div class="price">'+Price+' Р</div><img src="'+myUrl+'" class="sticker"></div><div class="rest_ticket"><div class="city-line"><div class="line"><div class="first-line">'+arr[i].segments[0].origin+' – '+arr[i].segments[0].destination+'</div><div class="second-line">'+hours+':'+minutes+' – '+hours2+':'+minutes2+'</div></div><div class="line"><div class="first-line">'+arr[i].segments[1].origin+' – '+arr[i].segments[1].destination+'</div><div class="second-line">'+hours1+':'+minutes1+' – '+hours3+':'+minutes3+'</div></div></div><div class="time-line"><div class="line"><div class="first-line">В пути</div><div class="second-line">'+Math.trunc(arr[i].segments[0].duration/60)+'ч '+arr[i].segments[0].duration%60+'м</div></div><div class="line"><div class="first-line">В пути</div><div class="second-line">'+Math.trunc(arr[i].segments[1].duration/60)+'ч '+arr[i].segments[1].duration%60+'м</div></div></div><div class="city-spot"><div class="line"><div class="first-line">'+stops+'</div><div class="second-line">'+pointStops+'</div></div><div class="line"><div class="first-line">'+stops1+'</div><div class="second-line">'+pointStops1+'</div></div></div></div>')
  document.querySelector('#Tickets_window').append(div);
  }
  return document.querySelectorAll('.Ticket');
});
}

function filterWorks(){
let promise1 = fiveTicket();
  promise1.then( function(filterTicket){
  $('.Point_Checkbox').on('click', function (){
      if (this.id =="all" && this.checked == true){
        let allInputs = document.querySelectorAll('.Point_Checkbox');
        allInputs.forEach( function(Element){
          if ( Element.id != "all" ) Element.checked = false;
        })
        filterTicket.forEach( function (Element){
          Element.classList.remove('hide');
        });
      } else {
        let count = 0;
        document.querySelectorAll('.Tabs_point').forEach(function(Element){
          Element.classList.remove('active');
        })
        filterTicket.forEach(function(Element){
          if(!Element.classList.contains('hide3')) Element.classList.remove('hide1');
        })
        document.querySelector("#all").checked = false;
        filterTicket.forEach( function (Element){
          Element.classList.add('hide');
        });        
        let allInputs = document.querySelectorAll('.Point_Checkbox');
        allInputs.forEach ( function (Element) {
          if (Element.checked == true){
            count++;
            let filter = document.querySelector("[for =\""+Element.id+"\"]")
            filterTicket.forEach(function (Element){
              if (Element.classList.contains(filter.id)) Element.classList.remove('hide');
            })
          }  
        })
        if ( count == 0){
          document.querySelector("#all").checked = true;
          filterTicket.forEach ( function (Element) {
            Element.classList.remove('hide');
          })
        }
    }
  })
  $('.Tabs_point').on('click', function (){
    if (this.classList.contains('active')){
      this.classList.remove('active');
      filterTicket.forEach(function(Element){
        if(!Element.classList.contains('hide3')) Element.classList.remove('hide1');
      })
    } else {
      document.querySelectorAll('.Tabs_point').forEach(function(Element){
        Element.classList.remove('active');
      })
      this.classList.add('active');
      filterTicket.forEach(function(Element){
        if(!Element.classList.contains('hide3')) Element.classList.remove('hide1');
      })
      let mn = -1;
      let needTicket ; 
      switch(this.id){
        case "Tabs_one":{   
          filterTicket.forEach( function(Element){
            if(!Element.classList.contains('hide3'))
            if (!Element.classList.contains('hide')){
              if (mn == -1) {mn = Element.getAttribute('data-price'); needTicket = Element;}
                  else if (mn > Element.getAttribute('data-price')){mn = Element.getAttribute('data-price'); needTicket = Element;}
            }
          })
          break;
        }
        case "Tabs_second":{   
          filterTicket.forEach( function(Element){
            if(!Element.classList.contains('hide3'))
            if (!Element.classList.contains('hide')) {
              if (mn == -1) {mn = Element.getAttribute('data-time'); needTicket = Element;}
                else if (mn > Element.getAttribute('data-time')){mn = Element.getAttribute('data-time'); needTicket = Element;}
            }
          })
          break;
        }
        case "Tabs_third":{
          filterTicket.forEach( function(Element){
            if(!Element.classList.contains('hide3'))
            if (!Element.classList.contains('hide')){
              if (mn == -1) {mn = Element.getAttribute('data-price')/ Element.getAttribute('data-time'); needTicket = Element;}
                else if (mn > Element.getAttribute('data-price')/ Element.getAttribute('data-time')){mn = Element.getAttribute('data-price')/ Element.getAttribute('data-time'); needTicket = Element;}
            }
          })
          break;
        }
      }
      filterTicket.forEach( function(Element){
        if (Element != needTicket) Element.classList.add('hide1');
      })
    }
  })
  document.querySelector('#addButton').addEventListener('click', (Event) =>{
      let allInputs = document.querySelectorAll('.Point_Checkbox');
      allInputs.forEach( function(Element){
        if ( Element.id == "all" ) Element.checked = true;
        if ( Element.id != "all" ) Element.checked = false;
      })
      filterTicket.forEach( function (Element){
        Element.classList.remove('hide');
      });
      document.querySelectorAll('.Tabs_point').forEach( function(Element){
        Element.classList.remove('active');
      })
      filterTicket.forEach( function (Element){
        Element.classList.remove('hide1');
      });
    let node = document.querySelectorAll('.Ticket');
    for (let i =0; i<r+5; i++) {
      node[i].classList.remove('hide3');
    }
    r = r+5;
  });
});

}

filterWorks(0);
