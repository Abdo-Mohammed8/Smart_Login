

var userName = document.getElementById('userName');
var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');
var userNameData = localStorage.getItem('userName');



var path = location.pathname.split('/');

var baseURL = ''
for (var i = 0; i < path.length - 1; i++) {
    baseURL += '/' + path[i];
}

if (userNameData){
  document.getElementById('home').innerHTML =`Welcome ${userNameData}` ;
}

var data = [];
if (localStorage.getItem('users') !== null){
 data = JSON.parse(localStorage.getItem("users"));
}

function emailRe(){



  var x = Boolean();
    for(var i=0 ;i <data.length;i++){

      if (userEmail.value.toLowerCase() === data[i].email.toLowerCase() )
       {
        x = true ;
        break;
        }
        else {
    
          x = false;
        }
    }
  return x 
}

function emity (){

  if(userName.value==""){
    document.getElementById("exist").innerHTML = `<p class="color-red">The name field is empty</p>`;
  }
  else if (userEmail.value==""){
    document.getElementById("exist").innerHTML = `<p class="color-red">The email field is empty</p>`;
  }

  else{
    document.getElementById("exist").innerHTML = `<p class="color-red">The Password field is empty</p>`;
  }

}

function signUp() {

  if(userEmail.value == "" || userName.value == "" || userPassword.value == ""){
    emity()
  }
  else{

     if (isValidName(userName)){
      if (isValidEmail(userEmail.value)){
        if (isValidPassword(userPassword)){
          if(emailRe())
         {
         document.getElementById("exist").innerHTML = `<p class="color-red">Email already exists </p>`;
      
         }
  
       else {
         var user = {
  
        name:userName.value,
        email:userEmail.value,
        password:userPassword.value
       }
    
      data.push(user);
      localStorage.setItem("users" , JSON.stringify(data))
      document.getElementById("exist").innerHTML = `<p class="color-green">Success</p>`;
      clearInputs()
        }
        
        
  
     }
     else {
      document.getElementById("exist").innerHTML = `<p class="color-red">The name must consist of at least 8 letters or numbers</p>`

       }
     }
     else {
      document.getElementById("exist").innerHTML = `<p class="color-red">Invalid email</p>`;
       }
      }
  else{
      document.getElementById("exist").innerHTML = `<p class="color-red">The name must consist of at least 3 letters</p>`
  }
  
}

}
function passwordNotCorrect(){

  for(var i=0 ;i<data.length ; i++){
    if(userEmail.value.toLowerCase() == data[i].email.toLowerCase() && userPassword.value.toLowerCase() != data[i].password.toLowerCase()){
      var x = false ;
      break;
    }
    else {
       x = true;
    }
  }
  return x ;
 
}

function correctLoin(){
  for (var i=0 ;i<data.length ; i++){
    if (userEmail.value.toLowerCase() == data[i].email.toLowerCase() && userPassword.value.toLowerCase() == data[i].password.toLowerCase()) {

      document.getElementById("exist").innerHTML = `<p class="color-green">Success</p>`

      localStorage.setItem("userName",data[i].name)
      pathTo('home.html');
      break;
      
      }
   else {
    document.getElementById("exist").innerHTML = `<p class="color-red">Invalid email or password</p>`
   }
 }
}

function login() {
  if (userEmail.value == "" || userPassword.value == "") {
    document.getElementById("exist").innerHTML = `<p class="color-red">All inputs is required</p>`

  }
  else {

  if (isValidEmail(userEmail.value)){
      if (passwordNotCorrect()){
        correctLoin()   
      }
      else {
        document.getElementById("exist").innerHTML = `<p class="color-red">The password is incorrect</p>`
    
      }
      
    }

    else {
      document.getElementById("exist").innerHTML = `<p class="color-red">Invalid email</p>`

    }
    

}
}

function isValidEmail(str) {
  var pattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  return pattern.test(str);
}

function isValidName(inputValue){

  if (inputValue.value.length>=3){
    return true;
  }
  else {
    return false;
  }
}
function isValidPassword(inputValue){

  if (inputValue.value.length>=8){
    return true;
  }
  else {
    return false;
  }
}

function logout() {
  pathTo('index.html')
  localStorage.removeItem('userName');
}

function pathTo (str) {

  if (baseURL == '/') {
    location.replace('https://' + location.hostname + '/'+str)
  } 
  else {
    location.replace(baseURL + '/'+str)

 }
}

function signUpPage(){
  pathTo("signup.html")
}

function signInPage(){
  pathTo("index.html")
}

function clearInputs(){
  userName.value = "";
  password.value = "";
  userEmail.value = "";
}