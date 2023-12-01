const buttonContainer = document.querySelector('.button-container');
const contentElements = document.querySelectorAll('.parent-content');

let contentElementContent = {};
let allContentHtml = [];
contentElements.forEach((content) => {
  const htmlContent = content.innerHTML;
  allContentHtml.push(htmlContent);
  const contentAttribute = content.getAttribute('data-filter');
  contentElementContent = {
    ...contentElementContent,
    [contentAttribute]: htmlContent,
  };
});
// variables
const list = ['All', 'Service', 'Contact', 'About', 'Address'];
// content injection functions
function main() {
  injectButtons();
}
main();

function injectButtons() {
  for (let index = 0; index < list.length; index++) {
    const buttonElement = document.createElement('button');
    buttonElement.innerText = list[index];
    buttonElement.setAttribute('id', `${list[index].toLowerCase()}`);
    buttonElement.classList.add('button');
    index === 0 && buttonElement.classList.add('active');
    buttonContainer.appendChild(buttonElement);
  }
}
// adding listeners to buttons
const buttonElements = document.querySelectorAll('.button');

buttonElements.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonId = button.getAttribute('id');
    updateButtonState(buttonId);
    // if its all then push everything inside
    if (buttonId === 'all') {
      let htmlContentVals = Object.values(contentElementContent);
      contentElements.forEach((contentDiv, index) => {
        contentDiv.innerHTML = htmlContentVals[index];
      });
      return;
    }
    // adding simple transitions when filtering
    if (!document.startViewTransition) {
      filterContent(buttonId);
      return;
    }
    document.startViewTransition(() => {
      filterContent(buttonId);
    });
  });
});

// filtering content
function filterContent(filterId) {
  contentElements.forEach((contentDiv) => {
    const contentDivDataFilter = contentDiv.getAttribute('data-filter');
    if (filterId === contentDivDataFilter) {
      contentDiv.innerHTML = contentElementContent[filterId];
    } else {
      contentDiv.innerHTML = '';
    }
  });
}

// simple function to update the active state of a button
function updateButtonState(buttonId) {
  for (let index = 0; index < buttonElements.length; index++) {
    const id = buttonElements[index].getAttribute('id');
    id === buttonId
      ? buttonElements[index].classList.add('active')
      : buttonElements[index].classList.remove('active');
  }
}
