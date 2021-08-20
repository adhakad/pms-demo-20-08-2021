if(TIMES==1){
  const JOIN_DATE = Date.now();
const total_time = JOIN_DATE-STARTS_DATE;
console.log(STARTS_DATE);console.log("000000");
var ms_time = 30*60*1000;
var remaining_ms_time = ms_time-total_time;
var remaining_s_time = remaining_ms_time/60000;
  
  const startimeMinutes = remaining_s_time;
      let time =startimeMinutes * 60;
      const countdownEl = document.getElementById('countdown');
      function updateCountdown(){
         const minutes = Math.floor(time / 60);
         let seconds = (time % 60).toFixed(0);
         if (seconds < 10) {
              seconds = "0" + seconds; 
          }
         countdownEl.innerHTML = minutes + ":" + seconds;
         if (time <= 2) {
             clearInterval(abc);
          } else {    
            time--;
          }             
      }
      var abc = setInterval(updateCountdown,1000);
    
  var a = remaining_ms_time;
  
  function ajax(){
    window.location.href = '/student-dashboard';
  return false;
  }
  window.onload=function(){
    setInterval(ajax, a);
  }
  
  }