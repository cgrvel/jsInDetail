import {elements} from './base';

export const renderItem = (item, flag = false) => {
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    if(flag){
        elements.shoppingList.insertAdjacentHTML('afterbegin', markup);
    }
    else {
        elements.shoppingList.insertAdjacentHTML('beforeend', markup);
    }
};

export const addItembtn = () => {
    const markup = `
    <li class="shopping__item add_item">
                    <div class="shopping__count add_item">
                        <input type="number" value="1" step="1">
                        <input type="text">
                    </div>
                    <div class="shopping__count_desc">
                        <input type="text">
                    </div>
                    <button class="shopping__add btn-tiny add">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </li>
    `;
    elements.shoppingList.insertAdjacentHTML('beforeend', markup);
}

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.remove();
};

export const deleteItems = () => {
    elements.shoppingList.innerHTML = '';
    displayDeteleBtn(false);
}

export const displayDeteleBtn = (flag) => {
    document.querySelector('.deleteAll_btn').style.visibility = flag ? 'visible' : 'hidden';
}