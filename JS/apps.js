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

function filterTable(inputId, tableId){

    const filter =
        document.getElementById(inputId)
        .value
        .toUpperCase();

    const rows =
        document.querySelectorAll(
            `#${tableId} tbody tr`
        );

    rows.forEach(row => {

        const text =
            row.textContent.toUpperCase();

        row.style.display =
            text.includes(filter)
            ? ""
            : "none";

    });

}
