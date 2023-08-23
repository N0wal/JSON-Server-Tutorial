// javascript for create.html

const form = document.querySelector('form');

const createPost = async (e) => {
    e.preventDefault(); /*Add a new blog sayfasındaki submit butonunun default işlevini devre dışı bırakır. Default işlem ise sayfayı yenilemesidir. */

    const doc = {
        title: form.title.value,
        body: form.body.value,
        likes: 0
    }

    await fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' }
    })

    window.location.replace('/index.html');
}

form.addEventListener('submit', createPost);