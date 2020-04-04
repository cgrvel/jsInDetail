export default class Likes {
   constructor() {
      this.likes = [];
   }

   addLike(id, title, author, img) {
       const like = {
           id,
           title,
           author,
           img
       }
       this.likes.push(like);
       // persist data in localStorage
       this.persisData();
       return like;
   }

   deleteLike(id) {
        const index = this.likes.findIndex(el => id === el.id);
        this.likes.splice(index, 1);
        // persist data in localStorage
        this.persisData();
   }

   isLiked(id) {
        return this.likes.findIndex(el => id === el.id) !== -1;   
   }

   getNumLikes() {
       return this.likes.length;
   }

   persisData() {
       localStorage.setItem('likes', JSON.stringify(this.likes));
   }

   readStorage() {
       const data = JSON.parse(localStorage.getItem('likes'));
       if(data) {
           // restore likes from localstorage
           this.likes = data;
       }
   }
}
