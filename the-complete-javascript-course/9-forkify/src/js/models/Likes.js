export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };

        this.likes.push(like);

        // Store data locally
        this.storeLocally();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);

        this.likes.splice(index, 1);

        // Store data locally
        this.storeLocally();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id == id) !== -1;
    }

    getCount() {
        return this.likes.length;
    }

    storeLocally() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    // Restore likes from localStorage
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        if (storage) this.likes = storage;
    }
}