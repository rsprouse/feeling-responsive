var collapsible = document.getElementsByClassName("question");
  var i;

  for (i = 0; i < collapsible.length; i++) {
    collapsible[i].firstElementChild.addEventListener("click", expand(collapsible[i]) );
    }

    function expand(questionElement) {
      return () => {

      questionElement.firstElementChild.classList.toggle("collapsibleactive");
      var collapsiblecontent = questionElement.lastElementChild;
      if (collapsiblecontent.style.maxHeight){
        collapsiblecontent.style.maxHeight = null;
      } else {
        collapsiblecontent.style.maxHeight = collapsiblecontent.scrollHeight + "px";

       } 
     }
    }
