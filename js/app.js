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
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');
const navMenu = document.querySelector('nav');
const logo = document.querySelector('.logo');
const open = document.querySelector('.open');
const close = document.querySelector('.close');
const toggleButton = document.querySelector('.collapse-toggle');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Capture an element on top of viewport
const inViewport = function (element) {
  //assign top of viewport to a variable
  const viewportTop = element.getBoundingClientRect();
  return (
    viewportTop.top >= 0 &&
    viewportTop.bottom <= document.documentElement.clientHeight 
  );
};

// Close navigation on mobile
function closeNav() {
  // toggle display class from nav and buttons
  navMenu.classList.toggle('displayed');
  close.classList.toggle('displayed');
  open.classList.toggle('displayed');
}
/**
* End Helper Functions
* Begin Main Functions
* 
*/

// Build the navigation menu
function buildNav() {
  // create a fragment to inlude a list to
  const navFragment = document.createDocumentFragment();
  //separate each section
  for (let section of sections) {
    //create 'a' variable
    const navItem = document.createElement('a');
    //form an anchor link based on section id
    navItem.href = '#' + section.getAttribute('id');
    //add a link inner text
    navItem.innerText = section.getAttribute('data-nav');
    //add a class and id to a link
    navItem.classList.add('menu-item');
    navItem.id = `menu-${section.id}`;
    //append it to a fragment
    navFragment.appendChild(navItem);
  }
  //append a nav grament to nav
  navList.appendChild(navFragment);
};

// Add class 'active' to section when near top of viewport
function activate() {
  //separate each section
  for (let section of sections) {
    //retrieve a nav item matching the section
    const menuItems = document.getElementsByClassName('menu-item');
    const currentMenuItem = document.getElementById(`menu-${section.id}`);
    //add class if in viewport
    if (inViewport(section)){
      section.classList.add('active');
      currentMenuItem.classList.add('highlighted')
      // remove class if not in viewport
    } else {
      section.classList.remove('active');
      currentMenuItem.classList.remove('highlighted')
    }
  };
};


// Scroll to anchor ID using scrollTO event
function scrolling(event) {
  //prevent standart anchor link functionality
  event.preventDefault();
  // separate each item in nav menu
  const navItems = document.querySelectorAll('.menu-item');
  for (let navItem of navItems) {
    // assign function to each item
    navItem.addEventListener('click', function () {
      document.querySelector(navItem.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  };
}

// Smooth scroll to top 
function topScroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
/**
 * End Main Functions
 * Begin Events
 * 
*/
function highlight(){
  const menuItems = document.querySelectorAll('.menu-item');
  for (let menuItem of menuItems)
  menuItem.addEventListener('click', function(){
    menuItem.classList.remove('active');
    this.classList.add('active')
  })
}

// Build menu 
buildNav();
// Scroll to section on link click
document.addEventListener('click', scrolling);
// Set sections as active
document.addEventListener('scroll', activate);
// Scroll to top once logo clicked
logo.addEventListener('click', topScroll);
//Open nav on header click
document.querySelector('header').addEventListener('click', closeNav);
// Highlight nav item when active
highlight()


