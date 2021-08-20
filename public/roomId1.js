  if(TIMES==""){
    const JOIN_DATE = Date.now();
    const total_time = JOIN_DATE-START_DATE;
    console.log(START_DATE);console.log("111111");
    var ms_time =30*60*1000;
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
          location.reload();
          window.location.href = '/teacher-admin-dashboard';
        return false;
        }
        window.onload=function(){
          setInterval(ajax, a);
        }
        
        }