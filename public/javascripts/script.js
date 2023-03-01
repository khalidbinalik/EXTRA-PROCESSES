
//ONLINE OFFLINE - START
function updateConnectionStatus() {
    var internet_status = document.getElementById("internet_status");
    if (navigator.onLine) {
    //   document.getElementById('internet_status_text').innerText = "ONLINE";
    //   document.getElementById('internet_status_text').style.color = "green"
      document.getElementById('internet_status_line').style.color = 'green';
      $('.online_offline_enable_disable').removeClass('disabled');
    } else {
    //   document.getElementById('internet_status_text').innerText = "OFFLINE";
    //   document.getElementById('internet_status_text').style.color = "red"
      document.getElementById('internet_status_line').style.color = 'red';
      $('.online_offline_enable_disable').addClass('disabled');
    }
  }
  window.addEventListener("load", updateConnectionStatus);
  window.addEventListener("online", function (e) {
    updateConnectionStatus();
  });
  window.addEventListener("offline", function (e) {
    updateConnectionStatus();
  });
//ONLINE OFFLINE - END