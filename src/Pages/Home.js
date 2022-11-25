import companyLogo from "../Components/Assets/test.jpeg"; 
import carRent from "../Components/Assets/carRent.jpg";
import garage from "../Components/Assets/Garage.jpg";
import Support from "../Components/Assets/Support.png"
import hertz from "../Components/Assets/hertz.jpg"
import rental from "../Components/Assets/rental.jpeg"

const Home = () => {
  return (
    <>
      <div class="container-fluid px-0">
        <div
          id="carouselExampleFade"
          class="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://source.unsplash.com/1600x600/?Cars"
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://source.unsplash.com/1600x600/?Car,Rental"
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://source.unsplash.com/1600x600/?Car,booking"
                class="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="container my-4">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col">
            <div class="card shadow-sm">
              <img src={carRent} class="d-block w-100" alt="img1" />

              <div class="card-body">
                <p class="card-text">
                  Our Car Rental is in business for the last 2 decades.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm">
              <img src={companyLogo} class="d-block w-100" alt="img1" />
              <div class="card-body">
                <p class="card-text">
                  Providing the best Cars for your optimum performance.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm">
              <img src={garage} class="d-block w-100" alt="img1" />

              <div class="card-body">
                <p class="card-text">Always serviced at certified garages.</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card shadow-sm">
              <img src={Support} class="d-block w-100" alt="img1" />{" "}
              <div class="card-body">
                <p class="card-text">Rent hassle free with our 24/7 support.</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm">
              <img src={hertz} class="d-block w-100" alt="img1" />

              <div class="card-body">
                <p class="card-text">
                  Awarded as best Car rental service in Toronto.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm">
              <img src={rental} class="d-block w-100" alt="img1" />

              <div class="card-body">
                <p class="card-text">
                  We provide felxible rates for your savings.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
