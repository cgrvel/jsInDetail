import uniqid from 'uniqid';

export default class List {
   constructor() {
      this.items = [];
   }
   addItem(count, unit, ingredient) {
       const item = {
           id: uniqid(),
           count,
           unit,
           ingredient
       }
       this.items.push(item);
       // persist data in localStorage
       this.persisData();
       return item;
   }

   deleteItem(id) {
        const index = this.items.findIndex(el => id === el.id);
        this.items.splice(index, 1);
        // persist data in localStorage
        this.persisData();
   }

   updateItem(id, newCount) {
       this.items.find(el => id === el.id).count = newCount;
   }

   getNumItems() {
    return this.items.length;
}

   deleteItems() {
        this.items = [];
        this.persisData();
   }
   persisData() {
    localStorage.setItem('shopping_list', JSON.stringify(this.items));
}

readStorage() {
    const data = JSON.parse(localStorage.getItem('shopping_list'));
    if(data) {
        // restore likes from localstorage
        this.items = data;
    }
}
}
