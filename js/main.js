/* Define the functions we'll use */

function toggleCompletion() {
  /* 
  this function is called when the checkbox in a list item is clicked 
  it is supposed to change the text of the list item to strikethrough 
  and grey when checked and back to normal when cleared.
  */ 

  if (this.checked == true) {
    this.nextSibling.className = "checked";
  } 
  else {
    this.nextSibling.className = "";
  }

  /* TODO - make checked status persistant
   *
   * this routine needs to be modified in the following way:
   * instead of changing the DOM - the appearance of the list item,
   * we need to change the underlying data - the "checked" status -
   * and then call an existing routine to just display the data
   *
   * We need to find the item in the stored array, update its status,
   * store the array again, and then display the array.
   *
   * Wouldn't this be easier if each item in the list had it's own, unique key?
   */

  // When this is talking to server-side storage, it will have to do a PUT ajax call to 
  // update the status of the item in the database. It may not need to modify the list, 
  // depending on how the callback to the 
}

function getFormValues(){
  /* This function reads the form and returns an object with the form values */

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

function addListItem( formValues){
  /* This function adds a new list item to the list using the given parameters */

  /* NOTE: this routine does not use jQuery. It is "legacy" code. It's been modified to add the
   * "checked" property, but otherwise left using basic DOM manipulation.
   * 
   * We leave the translation of this code to jQuery as an exercise for the interested student.
   * 
   * Note that, because the function was well-encapsulated, it did not have to be 
   * rewritten as the code changed around it, as long as we preserved its interface.
   */

   // JSON has booleans as strings, our form creates booleans
   // this expression converts strings to booleans
   var isChecked = (formValues.checked === 'true' || formValues.checked === true ); 

  /* make the list item element */
  var item = document.createElement("li");

  /* put a checkbox at the start of the list item, check it if the item is checked, and make it clickable */
  var checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  if (isChecked) {
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

  // if the contact is checked, we have to style it appropriately
  if (isChecked) {
    the_span.setAttribute("class", "checked");
  }
  item.appendChild(the_span);

  /* make the image for the delete button and attach it to the list item element */
  deleteButtonImage = document.createElement("img");
  deleteButtonImage.setAttribute("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/53676/1411117915_cross-24-16.png");
  deleteButtonImage.setAttribute("alt", "[X]");
  deleteButtonImage.setAttribute("class", "deleteListItem");
  deleteButtonImage.addEventListener("click", removeListItem);
  item.appendChild(deleteButtonImage);



  /* attach the list item to the list */
  var list = document.getElementById("contactList");
  list.appendChild(item);
}

function addListItemFromForm(){
  /* get the values from the form and put them in the list, then display the list */

  var newItem = getFormValues();  // get the form values and store them as an object  

  var theListJson = localStorage.getItem('theList'); // get the old list  out of local storage
  var theList = JSON.parse(theListJson);            // convert it from JSON

  theList.push(newItem);                              // save the new item to the list
  theListJson = JSON.stringify(theList);
  localStorage.setItem('theList', theListJson);       // and put it back in storage

  displayList();                                    // display the stored list
  // addListItem( getFormValues());
}

function removeListItem(){
  /* This function will be called when the delete button image in the list item is clicked. */

  var listItem = this.parentNode;                 // get the DOM <li> element
  var firstName=listItem.innerText.split(" ")[0]; // Get the first word of the li element's string
                                                  // and assume it's the first name

  // get the old list out of local storage, converting it from JSON
  var theList = JSON.parse(localStorage.getItem('theList'));  

  // create a new array with every object EXCEPT the one that matches the clicked-on list item
  var newList = theList.filter(function (contact) {
                        return contact.first_name !== firstName;
                       });
  
  localStorage.setItem('theList', JSON.stringify(newList));     // save new list
  displayList();                                                // and display it

  // THERE'S A BUG IN THIS METHOD
  //
  // can you find it?

  // When this is talking to server-side storage, it will have to do a DELETE ajax call to 
  // remove the item from the database.
}

function makeStartingList(){
  /*  this function creates an initial list with a bunch of dummy values 
  *   it uses a json data structure in a file
  *   if there's already a list in local storage, it just loads that instead.
  */
  if (localStorage.getItem('theList') === null) {       // if the local stored copy does not exist
    $.getJSON('db/defaultList.json', function (data) {  // get the list from the file
      var theListJson = JSON.stringify(data);
      localStorage.setItem('theList', theListJson);     // save the initial list to local storage
      displayList();                                    // display it when it's ready
                                                        // remember, this is asynchronous
    });
  }  else { // the list is already stored from the last time we were on this page
    displayList(); // display what already exists.
  }
}

function displayList(){
  /*
   * Get the list out of local storage and create the HTML to display it, one list item at a time.
   * Clear any existing DOM list elements to make sure we only display what's in local storage
  */
   var theListJson = localStorage.getItem('theList'); // get it out of local storage
    var theList = JSON.parse(theListJson);            // convert it to JSON
    document.getElementById("contactList").innerHTML = ""; // clear the DOM <ul>
    $.each(theList,function (index, contact) {        // Construct the DOM <ul> from the list
      addListItem(contact);
    });
}

/* FINALLY, let's run the functions we've defined to get the page ready for the user */
$("#submitButton").click(addListItemFromForm); 
makeStartingList();

