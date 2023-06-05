var collapsible = document.getElementsByClassName("question");
  var i;

  for (i = 0; i < collapsible.length; i++) {
    collapsible[i].firstElementChild.addEventListener("click", expand(collapsible[i]) );
    }

    function expand(questionElement) {
      return () => {
      questionElement.firstElementChild.classList.toggle("active");
      var content = questionElement.lastElementChild;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
       } 
     }
    }
