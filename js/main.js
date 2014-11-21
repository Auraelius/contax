/* Define the functions we'll use */

/* 
this function is called when the checkbox in a list item is clicked 
it is supposed to change the text of the list item to strikethrough 
and grey when checked and back to normal when cleared.
*/ 
function toggleCompletion() {
  if (this.checked == true) {
    this.nextSibling.className = "checked";
  } 
  else {
    this.nextSibling.className = "";
  }

  // When this is talking to server-side storage, it will have to do a PUT ajax call to 
  // update the status of the item in the database. It may not need to modify the list, 
  // depending on how the callback to the 
}

/* This function reads the form and returns an object with the form values */
function getFormValues(){
  var form = document.getElementById ("the_form");
  var fn = form.elements.first_name.value;
  var ln = form.elements.last_name.value;
  var p = form.elements.phone.value;
  var e = form.elements.email.value;
  // the form does not allow setting the "checked" property, but it must be
  // assigned a value, so we give it a value of false.
  return {first_name: fn, last_name: ln, phone: p, email: e, checked: false}; 

  // When this is talking to server-side storage, it will have to do a POST ajax call to 
  // create a new item in the database.

}

/* This function adds a new list item to the list using the given parameters */
function addListItem( formValues){

  /* NOTE: this routine does not use jQuery. It is "legacy" code. It's been modified to add the
   * "checked" property, but otherwise left using basic DOM manipulation.
   * 
   * We leave the translation of this code to jQuery as an exercise for the interested student.
   * 
   * Note that, because the function was well-encapsulated, it did not have to be 
   * rewritten as the code changed around it, as long as we preserved its interface.
   */

  /* make the list item element */
  var item = document.createElement("li");

  /* put a checkbox at the start of the list item, check it if the item is checked, and make it clickable */
  var checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  if (formValues.checked) {
    checkbox.setAttribute("checked", "true");
  }
  checkbox.addEventListener("click", toggleCompletion);
  item.appendChild(checkbox)

  /* add the text from the parameter to the list item and make it stylable using a span element */
  var the_span = document.createElement("span");
  /* make the text node and attach it to the span element */
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
  deleteButtonImage.addEventListener("click", removeListItem);
  item.appendChild(deleteButtonImage);

   if (formValues.checked) {
    item.setAttribute("class", "checked");
  }

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

  // When this is talking to server-side storage, it will have to do a DELETE ajax call to 
  // remove the item from the database.
}


/* this function adds a bunch of dummy values to the list */
function makeStartingList(){

  // When this is talking to server-side storage, it will have to do a GET ajax call to 
  // get the items from the server instead of making them up right here.

  defaultListValues = [
    {
      first_name: "Samantha", 
      last_name: "Smith",
      phone: "123-456-7890", 
      email: "sam@smith.com",
      checked: false
    },
    {
      first_name: "Jimmy", 
      last_name: "Jones",
      phone: "123-456-7890", 
      email: "jim@jones.com",
      checked: false
    },
        {
      first_name: "Francis", 
      last_name: "Farmer",
      phone: "123-456-7890", 
      email: "fran@farmer.com",
      checked: false
    },
        {
      first_name: "Zed", 
      last_name: "Zero",
      phone: "123-456-7890", 
      email: "zeds@dead.com",
      checked: true
    }
  ];

  // use an iterator method to do the same thing to every item in the list
  defaultListValues.forEach(addListItem); // only works in IE 9+


}

/* FINALLY, let's run the functions we've defined to get the page ready for the user */
$("#submitButton").click(addListItemFromForm); 
makeStartingList();
$("deleteListItem").click(removeListItem);


