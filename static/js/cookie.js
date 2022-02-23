function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}
  
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
  
function checkCookie() {
  if (navigator.cookieEnabled) {
    let user = getCookie("username");
    if (user != "") {
      swal({
        title: "بلک جک",
        text: `خوش اومدی ${user}`,
        button: "بزن بریم",
      });
    } else {
      swal("اسمت چیه؟", {
        content: "input",
        closeOnClickOutside: false,
        className: 'firstSwal'
      })
      .then((value) => {
        swal(`خوش اومدی ${value}`);
        if (value != "" && value != null) {
          setCookie("username", value, 30);
        }
      });
    }
  } else {
    swal({
      title: "بلک جک",
      text: `خوش اومدی`,
      button: "بزن بریم",
    });
  }
}