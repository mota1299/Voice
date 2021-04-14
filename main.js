const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const info = document.querySelector(".info");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";

  searchForm.insertAdjacentHTML("beforeend", '<button type="button" class="btn btn-outline-primary btn-rounded"data-mdb-ripple-color="blue"> <i class="fas fa-microphone"></i></button>');
  searchFormInput.style.paddingRight = "50px";

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if(micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    }
    else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    if(transcript.toLowerCase().trim()==="detener grabación") {
      recognition.stop();
    }
    if(transcript.toLowerCase().trim()==="ayuda del sitio") {
      window.open("ayuda.html" , "ventana1" , "width=1920,height=1080,scrollbars=NO")
    }
    
    if(transcript.toLowerCase().trim()==="salir del sitio") {
     //window.close();
     
      var mensaje;
      var opcion = confirm("Para salir dar clic en aceptar");
     
      if (opcion == true) {
         mensaje = "Has clickado OK";
         
         window.close();     //window.close();
         recognition.stop();
    } else {
        mensaje = "Has clickado Cancelar";
    }
    document.getElementById("ejemplo").innerHTML = mensaje;
  }
    else {
      if(transcript.toLowerCase().trim()==="busca múltiple") {
        window.open("https://www.superama.com.mx/buscar/"+searchFormInput.value);
        window.open("https://mascaradelatex.com/search?q="+searchFormInput.value);
        window.open("https://www.sears.com.mx/resultados/q="+searchFormInput.value);
        window.open("https://www.nintendo.com/search/#category=all&page=1&query="+searchFormInput.value);
        window.open("https://www.famsa.com/busqueda/?q="+searchFormInput.value);
      }
      if(transcript.toLowerCase().trim()==="superama") {
        window.open("https://www.superama.com.mx/buscar/"+searchFormInput.value).submit();
      }
      if(transcript.toLowerCase().trim()==="máscara de látex") {
        window.open("https://mascaradelatex.com/search?q="+searchFormInput.value).submit();
      }
      if(transcript.toLowerCase().trim()==="famsa") {
        window.open("https://www.famsa.com/busqueda/?q="+searchFormInput.value);
      }
      if(transcript.toLowerCase().trim()==="sears") {
        window.open("https://www.sears.com.mx/resultados/q="+searchFormInput.value);
      }
      if(transcript.toLowerCase().trim()==="nintendo") {
        window.open("https://www.nintendo.com/search/#category=all&page=1&query="+searchFormInput.value);
      }
   
      else if(transcript.toLowerCase().trim()==="reiniciar") {
        searchFormInput.value = "";
      }
      else {
        searchFormInput.value = transcript;
      }
    }
    // searchFormInput.value = transcript;
    // searchFormInput.focus();
    // setTimeout(() => {
    //   searchForm.submit();
    // }, 500);
  }
  
//  info.textContent = 'Comandos de voz: "detener grabación", "reiniciar", "busca"';
  
}
else {
  console.log("Your Browser does not support speech Recognition");
  info.textContent = "Your Browser does not support Speech Recognition";
}