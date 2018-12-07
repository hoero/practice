import { dome, domStrs, getDOM } from './base';

export const renderItem = item => {
    const markup = `
        <li class="${domStrs.shoppingItem}" data-itemid="${item.id}">
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="${domStrs.shoppingCountVal}">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="${domStrs.deleteBtn} btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    dome.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
    const item = getDOM(`[data-itemid="${id}"]`);

    if (item) item.parentElement.removeChild(item);
};
