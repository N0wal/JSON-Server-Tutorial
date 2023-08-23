// javascript for index.html
const container = document.querySelector('.blogs'); 
/* Burada querySelector metodunu kullanıp '.blogs' yazmamızın sebebi, index.html içerisindeki <div>'in classının adı 'blogs' olmasından dolayıdır. querySelector metodu ile o div'i seçtik ve seçili div'i container diye bir değişkenin içerisine attık. Aşağıda bu değişkenin içindeki veriyi değiştirmek için ise; 
container.innerHTML = template; kodunu kullandık. Böylece index.html içerisindeki <div>'in içine burada yazdığımız kodları inject ettik.*/ 
const searchForm = document.querySelector('.search');

const renderPosts = async (term) => {
    let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';
    if(term) {
        uri += `&q=${term}`;
    }

    const res = await fetch(uri);
    const posts = await res.json();

    let template = '';
    posts.forEach(post => [
        template += `
            <div class="post">
                <h2>${post.title}</h2>
                <p class="likes"><small>${post.likes} likes</small></p>
                <p>${post.body.slice(0, 200)}</p>
                <a href="/details.html?id=${post.id}"> read more... </a>
            </div>
        `
    ])
    container.innerHTML = template;
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPosts(searchForm.term.value.trim())
    /*Öncelikle renderPosts() fonksiyonuna term parametresini ekledik. Ardından bu term parametresinin value'sunu burada aldık ve renderPosts fonksiyonunun altına bir if check ekledik. Bunu eklememizin sebebi, searchbar'dan bir şey aratıyorsak arattığımız şey için JSON dosyasına bir &q ekler. &q dan sonra ise bizim arattığımız texti ekler. Böylece search barı aktifleştirdiğimizde JSON dosyası bizim arattığımız text'e göre tüm verileri filtreler ve blogda bizim karşımıza arattığımız kelimeyi içeren verileri sunar.*/
})

window.addEventListener('DOMContentLoaded', () => renderPosts());