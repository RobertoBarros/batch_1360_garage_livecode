const url = "https://wagon-garage-api.herokuapp.com/macarraobolonhesa/cars"
const carsList = document.querySelector('.cars-list');
const form = document.querySelector('.car-form');




form.addEventListener('submit',(event) => {
  event.preventDefault();

  const bodyValue = Object.fromEntries(new FormData(form))

  const requestDetails = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyValue)
  }

  fetch(url, requestDetails)
  .then(result => result.json())
  .then((data) => {
    // console.log(data);
    form.reset();
    refreshCars();
  })

})

const removeCar = () => {
  const removeBtns = carsList.querySelectorAll('.remove');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
    const id = event.currentTarget.dataset.id;
    fetch(`https://wagon-garage-api.herokuapp.com/cars/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then((data) => {
        refreshCars();
      })
    });
  });
}


const carTemplate = (car) => {
  return `
  <div class="car">
    <div class="car-image">
      <img src="http://loremflickr.com/280/280/${car.brand.replace(' ','-')}-${car.model.replace(' ','-')}" />
    </div>
    <div class="car-info">
      <h4>${car.brand} ${car.model}</h4>
      <p><strong>Owner:</strong> ${car.owner}</p>
      <p><strong>Plate:</strong> ${car.plate}</p>
      </div>
      <button class='btn btn-danger remove' data-id="${car.id}">Remove</button>
  </div>`;
}

const refreshCars = () => {
  fetch(url)
  .then(result => result.json())
  .then((data) => {
    carsList.innerText = ''
    data.forEach((car) => {
      const output = carTemplate(car);
      carsList.insertAdjacentHTML("beforeend",output);
    })

    removeCar()
  });
};


refreshCars();
