// class Question {
//     constructor(data, placeToRenderQuiz, onContinue, onBack) {
//       this.id = data.id;
//       this.question = data.question;
//       this.options = data.options;
//       this.correctAnswer = data.correctAnswer;
//       this.explanation = data.explanation;
//       this.placeToRenderQuiz = document.getElementsByTagName(placeToRenderQuiz)[0];
//       this.main = document.createElement('main');
//       this.onContinue = onContinue;
//       this.onBack = onBack;
//     }
  
//     render() {
//       // Render question content and options here
//       this.placeToRenderQuiz.appendChild(this.main);
//       this.main.appendChild(this.renderQuestion());
//       this.main.appendChild(this.renderOptions());
//       this.main.appendChild(this.renderExplanation());
  
//       const backButton = document.createElement('button');
//       backButton.textContent = 'Back';
//       backButton.addEventListener('click', () => {
//         this.onBack();
//       });
  
//       const continueButton = document.createElement('button');
//       continueButton.textContent = 'Continue';
//       continueButton.addEventListener('click', () => {
//         const selectedOption = document.querySelector(`input[name="option${this.id}"]:checked`);
//         if (selectedOption) {
//           this.onContinue(selectedOption.value);
//         } else {
//           alert('Please select an option to continue.');
//         }
//       });
  
//       const buttonContainer = document.createElement('div');
//       buttonContainer.appendChild(backButton);
//       buttonContainer.appendChild(continueButton);
//       this.main.appendChild(buttonContainer);
//     }
  
//     // Other methods for checking answer and showing explanation
//   }
  

// class FetchFromApi {
//     async fetchData() {
//       const response = await fetch('./data/data.json');
//       const data = await response.json();
//       this.data = data.questions;
//       console.log(data);
//       return this.data;
//     }
//   }


//   class MultipleChoice {
//     constructor(questionData) {
//       this.questionData = questionData;
//     }
  
//     createElements() {
//       const { text, options } = this.questionData;
//       const container = document.createElement('div');
//       const questionText = document.createElement('p');
//       questionText.textContent = text;
//       container.appendChild(questionText);
//       options.forEach(option => {
//         const optionContainer = document.createElement('div');
//         const optionInput = document.createElement('input');
//         const optionLabel = document.createElement('label');
//         optionInput.setAttribute('type', 'radio');
//         optionInput.setAttribute('name', 'option');
//         optionInput.setAttribute('value', option.id);
//         optionLabel.textContent = option.text;
//         optionLabel.setAttribute('for', option.id);
//         optionLabel.insertBefore(optionInput, optionLabel.firstChild);
//         optionContainer.appendChild(optionLabel);
//         container.appendChild(optionContainer);
//       });
//       return container;
//     }
  
//     render(container) {
//       const elements = this.createElements();
//       container.appendChild(elements);
//     }
// }

// class SortableList {
//     constructor(data) {
//       this.data = data;
//       this.question = data.question;
//       this.choices = data.choices;
//       this.render();
//     }
  
//     shuffle(array) {
//       for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//       }
//       return array;
//     }
  
//     render() {
//       const container = document.createElement("div");
//       container.classList.add("sortable-list-container");
  
//       const question = document.createElement("h2");
//       question.textContent = this.question;
//       container.appendChild(question);
  
//       const shuffledChoices = this.shuffle(this.choices);
//       const list = document.createElement("ul");
//       list.classList.add("sortable-list");
  
//       for (const choice of shuffledChoices) {
//         const listItem = document.createElement("li");
//         listItem.textContent = choice;
//         listItem.draggable = true;
//         listItem.addEventListener("dragstart", (event) => {
//           event.dataTransfer.setData("text/plain", choice);
//         });
//         list.appendChild(listItem);
//       }
  
//       list.addEventListener("dragover", (event) => {
//         event.preventDefault();
//         const activeItem = list.querySelector(".active");
//         if (activeItem) {
//           activeItem.classList.remove("active");
//         }
//         const targetItem = event.target.closest("li");
//         if (targetItem) {
//           targetItem.classList.add("active");
//         }
//       });
  
//       list.addEventListener("drop", (event) => {
//         event.preventDefault();
//         const activeItem = list.querySelector(".active");
//         const targetItem = event.target.closest("li");
//         if (activeItem && targetItem && activeItem !== targetItem) {
//           const activeIndex = Array.from(list.children).indexOf(activeItem);
//           const targetIndex = Array.from(list.children).indexOf(targetItem);
//           if (activeIndex < targetIndex) {
//             list.insertBefore(activeItem, targetItem.nextSibling);
//           } else {
//             list.insertBefore(activeItem, targetItem);
//           }
//         }
//       });
  
//       container.appendChild(list);
//       document.body.appendChild(container);
//     }
// }
  

// class Input {
//     constructor(data) {
//       this.id = data.id;
//       this.type = data.type;
//       this.label = data.label;
//       this.placeholder = data.placeholder;
//       this.render();
//     }
  
//     render() {
//       const container = document.createElement('div');
//       container.classList.add('input-container');
  
//       const label = document.createElement('label');
//       label.textContent = this.label;
//       label.setAttribute('for', `input-${this.id}`);
//       container.appendChild(label);
  
//       const input = document.createElement('input');
//       input.setAttribute('id', `input-${this.id}`);
//       input.setAttribute('type', 'text');
//       input.setAttribute('placeholder', this.placeholder);
//       container.appendChild(input);
  
//       document.body.appendChild(container);
//     }
// }

// class App {
//     constructor() {
//       this.questions = [];
//       this.currentQuestionIndex = 0;
  
//       this.container = document.createElement('div');
//       this.container.classList.add('quiz-container');
//       document.body.appendChild(this.container);
  
//       this.fetchData().then((data) => {
//         this.questions = data.map((questionData) => new Question(questionData, 'div', this.continueToNextQuestion.bind(this), this.goBackToPreviousQuestion.bind(this)));
  
//         this.renderCurrentQuestion();
//       });
//     }
  
//     async fetchData() {
//       const response = await fetch('./data/data.json');
//       const data = await response.json();
//       return data.questions;
//     }
  
//     renderCurrentQuestion() {
//       this.container.innerHTML = '';
//       this.questions[this.currentQuestionIndex].render();
//     }
  
//     continueToNextQuestion(selectedOption) {
//       if (this.currentQuestionIndex < this.questions.length - 1) {
//         this.currentQuestionIndex++;
//         this.renderCurrentQuestion();
//       } else {
//         alert('You have completed the quiz!');
//       }
//     }
  
//     goBackToPreviousQuestion() {
//       if (this.currentQuestionIndex > 0) {
//         this.currentQuestionIndex--;
//         this.renderCurrentQuestion();
//       } else {
//         alert('This is the first question.');
//       }
//     }
//   }
  
//   const app = new App();



class Input {
    constructor(data) {
      this.data = data;
    }
  
    render() {
      const input = document.createElement("input");
      input.type = "text";
      input.name = this.data.name;
      input.id = this.data.id;
      return input;
    }
  }
  
  class SortableList {
    constructor(data) {
      this.data = data;
    }
  
    render() {
      const ul = document.createElement("ul");
      ul.className = "sortable-list";
  
      for (const choice of this.data.choices) {
        const li = document.createElement("li");
        li.textContent = choice;
        ul.appendChild(li);
      }
  
      return ul;
    }
  }
  
  class MultipleChoice {
    constructor(data) {
      this.data = data;
    }
  
    render() {
      const select = document.createElement("select");
      select.name = this.data.name;
  
      for (const choice of this.data.choices) {
        const option = document.createElement("option");
        option.value = choice;
        option.textContent = choice;
        select.appendChild(option);
      }
  
      return select;
    }
  }
  class Question {
    constructor(data) {
      this.data = data;
      this.input = new Input(data.input);
      this.sortableList = new SortableList(data.sortable_choice);
      this.multipleChoice = new MultipleChoice(data.multiple_choice);
    }
  
    render() {
      const form = document.createElement("form");
  
      const label = document.createElement("label");
      label.textContent = this.data.question;
  
      const input = this.input.render();
      const sortableList = this.sortableList.render();
      const multipleChoice = this.multipleChoice.render();
  
      form.appendChild(label);
      form.appendChild(input);
      form.appendChild(sortableList);
      form.appendChild(multipleChoice);
  
      return form;
    }
  }
  class App {
    constructor() {
      this.questions = [];
      this.appElement = document.querySelector("#app");
    }
  
    async init() {
      const response = await fetch("./data/data.json");
      const data = await response.json();
  
      for (const questionData of data) {
        const question = new Question(questionData);
        this.questions.push(question);
      }
  
      this.render();
    }
  
    render() {
      for (const question of this.questions) {
        const form = question.render();
        this.appElement.appendChild(form);
      }
    }
  }
  const app = new App();
  app.init();
        