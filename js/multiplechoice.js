class Quizez {
    constructor(questions) {
      this.questions = questions.map(questionData => new MultipleChoice2(...questionData));
      this.element = this.createDOMElement();
    }
  
    createDOMElement() {
      const container = document.createElement("div");
      container.classList.add("quiz");
  
      this.questions.forEach(question => {
        const questionEl = question.toDOM();
        container.appendChild(questionEl);
      });
  
      return container;
    }
  
    toDOM(parent) {
      parent.appendChild(this.element);
    }
  }
  
  class MultipleChoice2 {
    constructor(question, options, correctAnswerIndex) {
      this.question = question;
      this.options = options;
      this.correctAnswerIndex = correctAnswerIndex;
      this.userAnswerIndex = null;
      this.element = this.createDOMElement();
    }
  
    createDOMElement() {
      const container = document.createElement("div");
      container.classList.add("multiple-choice");
  
      const questionEl = document.createElement("h2");
      questionEl.textContent = this.question;
      container.appendChild(questionEl);
  
      const optionsEl = document.createElement("ul");
      optionsEl.classList.add("options");
      this.options.forEach((option, index) => {
        const optionEl = document.createElement("li");
        optionEl.textContent = option;
        optionEl.addEventListener("click", () => {
          this.userAnswerIndex = index;
          this.renderOptions();
        });
        optionsEl.appendChild(optionEl);
      });
      container.appendChild(optionsEl);
  
      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Submit";
      submitBtn.addEventListener("click", () => {
        if (this.userAnswerIndex !== null) {
          this.checkAnswer();
        }
      });
      container.appendChild(submitBtn);
  
      return container;
    }
  
    renderOptions() {
      const optionsEl = this.element.querySelector(".options");
      this.options.forEach((optionEl, index) => {
        if (index === this.userAnswerIndex) {
          optionEl.classList.add("selected");
        } else {
          optionEl.classList.remove("selected");
        }
      });
    }
  
    checkAnswer() {
      const resultEl = document.createElement("p");
      resultEl.classList.add("result");
      if (this.userAnswerIndex === this.correctAnswerIndex) {
        resultEl.textContent = "Correct!";
        resultEl.classList.add("correct");
      } else {
        resultEl.textContent = "Incorrect!";
        resultEl.classList.add("incorrect");
      }
      this.element.appendChild(resultEl);
    }
  
    toDOM() {
      return this.element;
    }
  }
  
  // example usage:
  const quizez = new Quizez([
    ["What is the capital of France?", ["Paris", "Berlin", "London", "Rome"], 0],
    ["What is the largest country by area?", ["Russia", "Canada", "China", "USA"], 0],
    ["What is the chemical symbol for gold?", ["Au", "Ag", "Hg", "Cu"], 0]
  ]);
  quizez.toDOM(document.body);
  