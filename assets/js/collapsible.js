var coll = document.getElementsByClassName("question");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].firstElementChild.addEventListener("click", expand(coll[i]) );
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