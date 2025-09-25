async function carregarClubes(arquivo) {
    let container = document.getElementById("clubes");
    container.innerHTML = "<p>Carregando...</p>";

    try {
        let resposta = await fetch(arquivo);
        let clubes = await resposta.json();

        container.innerHTML = ""; // limpa antes de preencher

        clubes.forEach((clube, index) => {
            container.innerHTML += `
                <div class="col-md-3 mb-3">
                    <div class="card h-100 shadow">
                        <img src="${clube.img}" class="card-img-top" alt="${clube.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${clube.nome}</h5>
                            <p class="card-text">${clube.cidade}</p>
                            <button class="btn btn-sm btn-primary" onclick="abrirModal(${index}, '${arquivo}')">Saiba mais</button>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (erro) {
        container.innerHTML = "<p>Erro ao carregar clubes.</p>";
        console.error(erro);
    }
}

async function abrirModal(posicao, arquivo) {
    let resposta = await fetch(arquivo);
    let clubes = await resposta.json();
    let clube = clubes[posicao];

    document.getElementById("nomeClube").innerText = clube.nome;
    document.getElementById("cidadeClube").innerText = clube.cidade;
    document.getElementById("imgClube").src = clube.img;
    document.getElementById("descricaoClube").innerText = clube.descricao;

    let btn = document.querySelector("#zoomClubeModal .btn-primary");
    btn.onclick = function() {
        window.location.href = clube.url;
    };

    new bootstrap.Modal(document.getElementById("zoomClubeModal")).show();
}