class InputQuestion {
    constructor(prompt, answer) {
      this.prompt = prompt;
      this.answer = answer;
    }
  
    render() {
      const inputEl = document.createElement('input');
      inputEl.type = 'text';
      inputEl.placeholder = this.prompt;
  
      const divEl = document.createElement('div');
      divEl.appendChild(inputEl);
  
      return divEl;
    }
  
    checkAnswer() {
      const userAnswer = document.querySelector('input').value.trim();
      return userAnswer === this.answer;
    }
  }
  
  class SortQuestion {
    constructor(prompt, options, answer) {
      this.prompt = prompt;
      this.options = options;
      this.answer = answer;
    }
  
    render() {
      const ulEl = document.createElement('ul');
      ulEl.classList.add('sortable-list');
  
      this.options.forEach((option) => {
        const liEl = document.createElement('li');
        liEl.textContent = option;
        liEl.setAttribute('draggable', 'true');
        ulEl.appendChild(liEl);
      });
  
      const divEl = document.createElement('div');
      divEl.textContent = this.prompt;
      divEl.appendChild(ulEl);
  
      // Initialize draggedItem variable
      let draggedItem = null;
  
      // Add dragstart event listener to ul element
      ulEl.addEventListener('dragstart', (event) => {
        draggedItem = event.target;
        event.dataTransfer.setData('text/plain', ''); // Required for Firefox
      });
  
      // Add dragover event listener to ul element
      ulEl.addEventListener('dragover', (event) => {
        event.preventDefault();
        const overItem = event.target;
        if (overItem !== draggedItem && overItem.nodeName === 'LI') {
          overItem.classList.add('over');
        }
      });
  
      // Add drop event listener to ul element
      ulEl.addEventListener('drop', (event) => {
        event.preventDefault();
        const dropItem = event.target;
        if (dropItem !== draggedItem && dropItem.nodeName === 'LI') {
          const dropIndex = [...ulEl.children].indexOf(dropItem);
          const draggedIndex = [...ulEl.children].indexOf(draggedItem);
          ulEl.insertBefore(draggedItem, dropItem);
          // Adjust answer array to match new order
          const removed = this.options.splice(draggedIndex, 1)[0];
          this.options.splice(dropIndex, 0, removed);
          dropItem.classList.remove('over');
        }
      });
  
      return divEl;
    }
  
    checkAnswer() {
      const userAnswer = Array.from(document.querySelectorAll('.sortable-list li')).map((li) => li.textContent);
      return JSON.stringify(userAnswer) === JSON.stringify(this.answer);
    }
  }
  
  
  class MultipleChoiceQuestion {
    constructor(prompt, options, answer) {
      this.prompt = prompt;
      this.options = options;
      this.answer = answer;
    }
  
    render() {
      const divEl = document.createElement('div');
      divEl.textContent = this.prompt;
  
      this.options.forEach((option) => {
        const labelEl = document.createElement('label');
        labelEl.textContent = option;
        const inputEl = document.createElement('input');
        inputEl.type = 'radio';
        inputEl.name = 'answer';
        inputEl.value = option;
        labelEl.appendChild(inputEl);
        divEl.appendChild(labelEl);
      });
  
      return divEl;
    }
  
    checkAnswer() {
      const userAnswer = document.querySelector('input[name="answer"]:checked');
      return userAnswer && userAnswer.value === this.answer;
    }
  }
  
  class QuizAPI {
    constructor(dataUrl) {
      this.dataUrl = dataUrl;
    }
  
    async getData() {
      const response = await fetch(this.dataUrl);
      const data = await response.json();
      return data.questions.map((question) => {
        switch (question.type) {
          case 'input':
            return new InputQuestion(question.question, question.answer);
          case 'sort':
            return new SortQuestion(question.question, question.options, question.answer);
          case 'multiple_choice':
            return new MultipleChoiceQuestion(question.question, question.options, question.answer);
          default:
            throw new Error(`Unknown question type: ${question.type}`);
        }
      });
    }

    
  }
  
  class App {
    constructor() {
      this.api = new QuizAPI('./data/data.json');
      this.questions = [];
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.quizContainer = document.querySelector('#quiz-container');
      this.quizEl = document.createElement('div');
      this.buttonsEl = document.createElement('div');
      this.backButtonEl = document.createElement('button');
      this.continueButtonEl = document.createElement('button');
      this.quizEl.id = 'quiz';
      this.buttonsEl.classList.add('buttons');
      this.backButtonEl.textContent = 'Back';
      this.continueButtonEl.textContent = 'Continue';
  
      // Add event listeners to buttons
      this.continueButtonEl.addEventListener('click', this.handleContinueButtonClick.bind(this));
      this.backButtonEl.addEventListener('click', this.handleBackButtonClick.bind(this));
    }
      handleContinueButtonClick() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (currentQuestion.checkAnswer()) {
          this.score++;
        }
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.questions.length) {
          this.showResults();
        } else {
          this.renderQuestion();
        }
      };
      
      handleBackButtonClick() {
        this.currentQuestionIndex--;
        if (this.currentQuestionIndex < 0) {
          this.currentQuestionIndex = 0;
        }
        this.renderQuestion();
      }
    
      
      showResults() {
        const quizEl = document.querySelector('#quiz');
        quizEl.innerHTML = `You scored ${this.score} out of ${this.questions.length}`;
        
        // Create the "restart" button
        const restartButtonEl = document.createElement('button');
        restartButtonEl.textContent = 'Restart Quiz';
        restartButtonEl.addEventListener('click', () => {
          this.currentQuestionIndex = 0;
          this.score = 0;
          this.renderQuestion();
        });
    
        // Add the restart button to the page
        const buttonsEl = document.createElement('div');
        buttonsEl.classList.add('buttons');
        buttonsEl.appendChild(restartButtonEl);
        quizEl.appendChild(buttonsEl);
      }  
      renderQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.quizEl.innerHTML = '';
        this.quizEl.appendChild(currentQuestion.render());
      
        // Add the continue and back buttons
        this.buttonsEl.innerHTML = '';
        if (this.currentQuestionIndex > 0) {
          this.buttonsEl.appendChild(this.backButtonEl);
        }
      
        // Add the finish button
        if (this.currentQuestionIndex === this.questions.length - 1) {
          const finishButtonEl = document.createElement('button');
          finishButtonEl.textContent = 'Finish';
          finishButtonEl.addEventListener('click', () => {
            this.showResults();
          });
          this.buttonsEl.appendChild(finishButtonEl);
        } else {
          this.buttonsEl.appendChild(this.continueButtonEl);
        }
      
        this.quizEl.appendChild(this.buttonsEl);
      }
         
}


// Instantiate the App class and start the quiz
const app = new App();


app.api.getData().then((questions) => {
  app.questions = questions;
  app.renderQuestion();
});


document.body.appendChild(app.quizEl);
