document.addEventListener('DOMContentLoaded', () => {

    const wishlistBtn = document.querySelector('.wishlist-btn');
    const svg = wishlistBtn.querySelector('svg');
    let isFavorite = false;

    if (wishlistBtn && svg) {    
        const color = wishlistBtn.getAttribute('data-color');    
        wishlistBtn.addEventListener('click', () => {
            isFavorite = !isFavorite;
            console.log('is favorite:', isFavorite);
            if (isFavorite) {
                svg.setAttribute('fill', color)
            } else {
                svg.setAttribute('fill', 'none')
            }
        });
    };
});