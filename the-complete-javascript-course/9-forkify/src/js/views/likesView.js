import { dome, domStrs, getDOM } from './base'
import { limitRecipeTitle } from './searchView'

export const toggleLikeBtn = isLiked => {
    const whichOne = isLiked ? `${domStrs.likedIcon}` : `${domStrs.likeIcon}`;

    getDOM(`.${domStrs.likeIconParent}`).setAttribute('href', `img/icons.svg#${whichOne}`);
};

export const toggleLikeMenu = likesCount => {
    dome.likesMenu.style.visibility = likesCount > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
    const markup = `
        <li>
            <a class="${domStrs.likesLink}" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;

    dome.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const el = getDOM(`.${domStrs.likesLink}[href*="${id}"]`).parentElement;

    if (el) el.parentElement.removeChild(el);
};
