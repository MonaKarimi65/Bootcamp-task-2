//http://localhost:3000/transactions

let allTransactions = [];
const TransactionsBtn = document.querySelector(".TransactionsBtn");
const tableBody = document.querySelector(".tableBody");
const searchInput = document.querySelector("#searchInput");
const search = document.querySelector(".search");
const tableList = document.querySelector(".tableList");

searchInput.value = "";


searchInput.addEventListener("input", () => {
	const inputValue = searchInput.value;
	getTransactions("http://localhost:3000/transactions?refId_like=" + inputValue);
})


function getTransactions(url) {
	axios.get(url)
		.then((res) => {
			console.log(res.data);
			allTransactions = res.data;
			renderTransactions()

		})
		.catch((err) => {
			console.log(err);
		})
}

TransactionsBtn.addEventListener("click", () => {
	getTransactions("http://localhost:3000/transactions");
	TransactionsBtn.classList.add("d-none");
	search.classList.remove("d-none");
	tableList.classList.remove("d-none");
})

function renderTransactions() {
	const table = document.querySelector(".table");
	table.classList.remove("d-none");
	tableBody.innerHTML = "";
	allTransactions.forEach(item => {
		const tr = document.createElement("tr");
		let date = new Date(item.date).toLocaleString("fa-ir", {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		});
		let time = new Date(item.date).toLocaleString("fa-ir", {
			hour: '2-digit',
			minute: '2-digit'
		});
		let displayDate = date + " ساعت " + time;
		let typeStyle = item.type == "افزایش اعتبار" ? "green" : "red";
		tr.innerHTML =
			`<tr>
		<th>${item.id}</th>
		<td class=${typeStyle}>${item.type}</td>
		<td>${item.price}</td>
		<td>${item.refId}</td>
		<td>${displayDate}</td>
	</tr>`
		tableBody.appendChild(tr);
	});
}


function toggleSort(e, sortItem) {
	const chevronIcon = e.target.querySelector('span');
	if (chevronIcon.classList.contains("down")) {
		chevronIcon.classList.remove("down");
		chevronIcon.classList.add("up");
		getTransactions("http://localhost:3000/transactions?_sort=" + sortItem + "&_order=asc");

	} else {
		chevronIcon.classList.remove("up");
		chevronIcon.classList.add("down");
		getTransactions("http://localhost:3000/transactions?_sort=" + sortItem + "&_order=desc")

	}
}

const sortPrice = document.querySelector("#sortPrice");
sortPrice.addEventListener("click", (e) => {
	toggleSort(e, "price");

})

const sortDate = document.querySelector("#sortDate");
sortDate.addEventListener("click", (e) => {
	toggleSort(e, "date");
})