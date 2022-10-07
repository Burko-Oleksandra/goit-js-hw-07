import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');
let modalWindow;
galleryEl.innerHTML = createGalleryItemsMarkup(galleryItems);
galleryEl.addEventListener('click', openModal);

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
           <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join('');
}

function openModal(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  let imgLink = event.target.dataset.source;
  modalWindow = basicLightbox.create(`<img src="${imgLink}" width="1280" height="853">`);
  modalWindow.show();
  document.addEventListener('keydown', closeModal);
}

function closeModal(event) {
  if (event.code === 'Escape') {
    modalWindow.close();
    document.removeEventListener('keydown', closeModal);
  }
}
