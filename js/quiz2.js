class SortableList {
    constructor(items) {
      this.items = items;
      this.element = document.createElement("ul");
      this.element.classList.add("sortable-list");
      this.items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        li.draggable = true;
        li.addEventListener("dragstart", this.onDragStart.bind(this));
        li.addEventListener("dragover", this.onDragOver.bind(this));
        li.addEventListener("drop", this.onDrop.bind(this));
        this.element.appendChild(li);
      });
    }
  
    onDragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.textContent);
      event.dataTransfer.effectAllowed = "move";
      event.currentTarget.classList.add("dragging");
    }
  
    onDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      const target = event.currentTarget;
      const dragged = document.querySelector(".dragging");
      if (dragged !== target) {
        const rect = target.getBoundingClientRect();
        const next =
          event.clientY - rect.top > rect.height / 2 ? target.nextSibling : target;
        target.parentNode.insertBefore(dragged, next);
      }
    }
  
    onDrop(event) {
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.classList.remove("dragging");
    }
  
    toHTML() {
      return this.element;
    }
  
    getItems() {
      return Array.from(this.element.children).map((item) => item.textContent);
    }
  }
  
  // create sortable list object and append it to the body
  const sortableList = new SortableList(["Item 1", "Item 2", "Item 3", "Item 4"]);
  document.body.appendChild(sortableList.toHTML());
  

  