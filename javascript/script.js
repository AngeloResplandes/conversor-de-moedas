document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()

    const amountInput = document.querySelector("#amount")
    const currencySelect = document.querySelector("#currency")
    const footer = document.querySelector("footer")
    const resultElement = document.querySelector("#result")
    const descriptionElement = document.querySelector("#description")

    const amount = parseFloat(amountInput.value.replace(",", "."))
    const currency = currencySelect.value

    if (!amount || !currency) {
        alert("Por favor, preencha todos os campos.")
        return
    }

    fetch("https://v6.exchangerate-api.com/v6/e8b690a55e60d77e23ba7d86/latest/BRL")
        .then((response) => response.json())
        .then((json) => {
            const rate = json.conversion_rates[currency]
            if (!rate) {
                alert("Moeda não suportada.")
                return
            }

            const converted = amount / rate

            descriptionElement.textContent = `1 ${currency} = R$ ${(1 / rate).toFixed(2).replace(".", ",")}`
            resultElement.textContent = `${converted.toFixed(2).replace(".", ",")} Reais`
            footer.classList.add("show-result")
        })
        .catch((error) => {
            console.error("Erro ao buscar dados da API:", error)
            alert("Erro ao buscar os dados. Tente novamente mais tarde.")
        })
})
