document.addEventListener("DOMContentLoaded", () => {

    loadPage("Pages/home.html");
    

});

function loadPage(page) {

    const content = document.getElementById("content");

    content.classList.add("page-exit");

    setTimeout(() => {

        fetch(page)
            .then(response => response.text())
            .then(html => {

                content.innerHTML = `
                    <div class="page-enter">
                        ${html}
                    </div>
                `;

                content.classList.remove("page-exit");

            })
            .catch(error => {

                console.error(error);

                content.innerHTML = `
                    <div class="page-enter">
                        <h2>Error cargando la página</h2>
                    </div>
                `;

                content.classList.remove("page-exit");

            });

    }, 300);

}
