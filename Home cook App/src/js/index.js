// how module works on ES6
/* import str from './models/Search';
//import {sum as s,mul as m} from './views/searchView';
import * as searchView from './views/searchView';
console.log(`using import fun ${searchView.sum(1,2)} ${searchView.mul(1,2)}. ${str}.`); */

import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';
import Recipe from './models/Recipe';
import List from './models/List';
import  { elements,renderSpinner,clearSpinner } from './views/base';
import Likes from './models/Likes';

/*  
Global state of app
    *search Object
    *current recipe Object
    *shopping list Object
    *liked recipes
*/

const state = { }

const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();
    if(query) {
        // new search object for state
        state.search = new Search(query);
        // prepare view results
        searchView.clearInput();
        searchView.clearResults();
        renderSpinner(elements.searchRes);
        // search for recipes
        try{
            await state.search.getResults();
    
            // return results on UI
            clearSpinner();
            searchView.renderResult(state.search.result);
        } catch (err) {
            alert('Something wrong with search processing');
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Testing
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
// });

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        //console.log(btn.dataset);
        searchView.renderResult(state.search.result, gotoPage);
        window.scrollTo(0,0);
    }
});


const  controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if(id) {
        // prepare UI
        recipeView.clearRecipe();
        renderSpinner(elements.recipe);
        if(state.search)searchView.highlightSelected(id);
        // create recipe object
        state.recipe = new Recipe(id);
        // window.r = state.recipe;
        // get recipe data
        try{
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // calc time 
            state.recipe.calcTime();
            state.recipe.calcServings();
            // render UI
            clearSpinner();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch (err) {
            alert('error processing recipe')
        }
    }
}
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['load','hashchange'].forEach(event => window.addEventListener(event, controlRecipe));


const controlList = () => {
    // create new list 
    if(!state.list) state.list = new List();
    // add each ing to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
    listView.addItembtn();
    listView.displayDeteleBtn(true);
}

elements.shopping.addEventListener('click', e => {
    if(e.target.matches('.deleteAll_btn, .deleteAll_btn *')) {
        console.log("deleteall")
        state.list.deleteItems();
        listView.deleteItems();
    }
});

//handle delete-add in shopping list
elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete state
        state.list.deleteItem(id);
        // delete UI
        listView.deleteItem(id);
    } else if(e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateItem(id, val);
    } else if(e.target.matches('.add, .add *')) {
        const count = document.querySelector('.add_item').querySelectorAll('input')[0].value;
        const unit = document.querySelector('.add_item').querySelectorAll('input')[1].value;
        const desc = document.querySelector('.shopping__count_desc').querySelector('input').value;
        // add state
        const item = state.list.addItem(count,unit,desc);
        // add UI
        listView.renderItem(item, true);
        //reset
        document.querySelector('.add_item').querySelectorAll('input')[1].value = "";
        document.querySelector('.shopping__count_desc').querySelector('input').value = "";
    }
})

const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // not liked the current recipe
    if(!state.likes.isLiked(currentID)) {
        // add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        // toggle the button
        likeView.toggleLikeBtn(true);
        // add to UI
        likeView.renderLike(newLike);
    // has liked the current recipe    
    } else {
        // remove like to the state
        state.likes.deleteLike(currentID);
        // toggle the button
        likeView.toggleLikeBtn(false);
        // remove to UI
        likeView.deleteLike(currentID);
    }
    likeView.toggleLikeMenu(state.likes.getNumLikes());
};

// restores like recipes on page load

window.addEventListener('load', () => {
    state.likes = new Likes();
    state.list = new List();
    // restore likes
    state.likes.readStorage();
    state.list.readStorage();
    // toggle button
    likeView.toggleLikeMenu(state.likes.getNumLikes());
    // render the recipes 
    state.likes.likes.forEach(like => likeView.renderLike(like));
    if(state.list.getNumItems() > 0) {
    state.list.items.forEach(item => listView.renderItem(item));
    listView.addItembtn();
    listView.displayDeteleBtn(true);
    }
})

// handle recipe clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.servings > 1) {
        state.recipe.updateServings('dec');
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
    } else if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
    recipeView.updateServingsIngredients(state.recipe); // instead call this method --> recipeView.renderRecipe(state.recipe);
});
