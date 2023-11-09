/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

// Wait for the DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function() {

  // Create the variables to be used in the function to build to navigation menu
  const chapterMenuItems = document.getElementById('navbar__list'); // Get the unordered list element with the id of navbar list which will be used to help build the navigation menu
  const chapters = document.querySelectorAll('section'); // set chapters variable to select all of the sections to iterate over to build the navigation menu

  // Build the navigation menu by iterating over each section by the section id and data-nav attributes
  chapters.forEach((section) => {
    const chapterId = section.getAttribute('id');
    const chapterName = section.getAttribute('data-nav');

    // Create a list item and anchor element for the navigation menu
    const chapterItem = document.createElement('li');
    const chapterLink = document.createElement('a');

    // Add the properties for the anchor element
    chapterLink.innerHTML = chapterName;
    chapterLink.href = `#${chapterId}`;
    chapterLink.classList.add('menu__link');

    // Append the anchor to list item
    chapterItem.appendChild(chapterLink);

    // Append list item to the navigation menu
    chapterMenuItems.append(chapterItem);

    // Listen for a click to scroll to selected secion
    chapterLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent any default anchor click behavior
      section.scrollIntoView({
        behavior: 'smooth'
      }); // Maintain a smooth scroll behavior
    });
  });

  // Use the event listener to highlight the active section based on the scroll position
  window.addEventListener('scroll', function() {
    let selectedChapter = ''; // Set the selected chapter variable to undefined to be used to keep track of the current visible secion 
    let nearRange = 9999; // Set the near range variable to a high number to be used to keep track of the closest section to the top of the viewport


    // We will iterate over each section to determine which section is closest to the top of the viewport
    chapters.forEach((section) => {
      const onDisplay = section.getBoundingClientRect(); // set the on display variable to the current section's bounding rectangle
      const secTop = Math.abs(onDisplay.top); // set the range variable to get the absolute value of the top of the section's bounding rectangle using Math.abs method


      if (secTop < nearRange) { // if the current section is closer to the top of the viewport than the previous section, 
         nearRange = secTop; // then set the near range variable to the range of the current section, and update the current section to the selected chapter variable
         selectedChapter = section; 
      }
    });

    // Iterate over the sections to clear and add the active classes to the selected section and navgation menu item
    chapters.forEach((section) => {
      if (section === selectedChapter) {
        section.classList.add('active-chapter-class');
      }
      else {
        section.classList.remove('active-chapter-class');
      }

      const chapterId = section.id; // set the chapter id variable to the current section's id
      const relatedChapterMenuItem = chapterMenuItems.querySelector(`a[href="#${chapterId}"]`); // set the related chapter menu item variable to the anchor element with the href attribute equal to the current section id

      if (relatedChapterMenuItem) { // if the related chapter menu item exists, then add the active class to the menu item       
        if (section === selectedChapter) {
          relatedChapterMenuItem.classList.add('active-chapter-menu');
        }
        else {
          relatedChapterMenuItem.classList.remove('active-chapter-menu'); // otherwise remove the active class from the navigation menu item
        }
      }
    });
  });
});