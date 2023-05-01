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
        