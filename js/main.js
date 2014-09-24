/* Define the functions we'll use */

/* this function is called when the checkbox in a list item is clicked */
/* it is supposed to change the text of the list item to strikethrough and grey */ 
function completeItem() {
  this.nextSibling.className = "completed";
}

/* This function reads the form and returns an object with the form values */
function getFormValues(){
  var form = document.getElementById ("the_form");
  var fn = form.elements.first_name.value;
  var ln = form.elements.last_name.value;
  var p = form.elements.phone.value;
  var e = form.elements.email.value;
  return {first_name: fn, last_name: ln, phone: p, email: e}; 
}

/* This function adds a new list item to the list using the given parameters */

/* Why do we separate this function from the one above? Where else do these values come from? */

function addListItem( formValues){

  /* make the list item element */
  var item = document.createElement("li");

  /* put a checkbox at the start of the list item and make it clickable*/
  var checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", completeItem);
  item.appendChild(checkbox)

  /* add the text from the parameter and make it stylable using a span element */
  var the_span = document.createElement("span");
  /* make the text node and attach it to the list element */
  var node = document.createTextNode( formValues.first_name + " "
                                     + formValues.last_name + ", "
                                     + formValues.phone + ", " 
                                     + formValues.email);
  the_span.appendChild(node);
  item.appendChild(the_span);

  /* make the image for the delete button and attach it to the list item element */
  deleteButtonImage = document.createElement("img");
  deleteButtonImage.setAttribute("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/53676/1411117915_cross-24-16.png");
  deleteButtonImage.setAttribute("alt", "[X]");
  deleteButtonImage.setAttribute("class", "deleteListItem");
  /* make it clickable */
  deleteButtonImage.addEventListener("click", removeListItem);
  /* attach the button to the list item */
  item.appendChild(deleteButtonImage);

  /* attach the list item to the list */
  var list = document.getElementById("contactList");
  list.appendChild(item);
}

/* This function uses two other functions to 1) get the values from the form, and 2) put them in the list */
function addListItemFromForm() {
  addListItem( getFormValues());
}

/* This function will be called when the delete button image in the list item is clicked. */
function removeListItem() {
  var listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
}

/* this function sets up things to catch clicks on the form submit button */
function setUpForm(){
  var button = document.getElementById("submitButton");
  button.addEventListener("click", addListItemFromForm); 
}

/* this function sets up things to catch clicks on ALL the current delete buttons */
function attachDeleteButtonListeners() {
  /* Find all the delete buttons (which are images) */
  var closeButtonElements = document.getElementsByClassName("deleteListItem");

  /* For each one, add an event listener */
  if (closeButtonElements.length > 0) {
    for (var i = 0; i<closeButtonElements.length; i++) {
      closeButtonElements[i].addEventListener("click", removeListItem);
    }  
  }
  else { /* handle errors */
    console.log("No delete buttons found.");
  }
}

/* this function adds a bunch of dummy values to the list */
function makeStartingList(){
  for(var i = 0; i<3; i++){
    addListItem( {first_name: "Samantha", 
                  last_name: "Smith",
                  phone: "123-456-7890", 
                  email: "sam@smith.com"});
  }
}

/* FINALLY, let's run the functions we've defined to get the page ready for the user */
setUpForm();
makeStartingList();
attachDeleteButtonListeners();


