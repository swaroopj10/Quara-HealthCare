var x=document.getElementById("login")
        var y=document.getElementById("signup")
        var z=document.getElementById("btn")

        function signup(){
            x.style.left = "-400px";
            y.style.left = "50px";
            z.style.left = "110px";
        } 
        function login(){
            x.style.left = "50px";
            y.style.left = "450px";
            z.style.left = "0px";
        }
          
           function onChange() {
            const password = document.querySelector('input[name=password]');
            const confirm = document.querySelector('input[name=confirm]');
            if (confirm.value === password.value) {
              confirm.setCustomValidity('');
            } else {
              confirm.setCustomValidity('Passwords do not match');
            }
          }

          function myFunction() {
            var x = document.getElementById("pswd1");
            if (x.type === "password") {
              x.type = "text";
            } else {
              x.type = "password";
            }
            var y = document.getElementById("pswd2");
            if (y.type === "password") {
              y.type = "text";
            } else {
              y.type = "password";
            }
            var z = document.getElementById("pswd");
            if (z.type === "password") {
              z.type = "text";
            } else {
              z.type = "password";
            }
          }
          
          function redirect(){
            window.location="../Home/Home.html"
          }
        