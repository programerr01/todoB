import lading_img from '../images/landing_image.webp';

export default function LandingPage() {
  return (
    <>
      <div className="main-container container-fluid row m-auto mt-3 justify-content-center align-items-center">
        <div className="left-side col-12 col-md-6">
          <img src={lading_img} className="img-fluid" alt="Landing Image" />
        </div>
        <div className="right-side col-12 col-md-6 p-2">
          <div className="heading">
            <h2 className="heading">Tired of Forgetting ? </h2>
          </div>
          <div className="sub-heading lead">
            <p>
              Keep Track of your tasks<br />
              and never forget about <br />
              your important tasks
            </p>
          </div>
          <div className="user-submission">
            <button onClick={() =>{window.location.href="/todos"}} className="font-weight-bold text-light btn btn-primary p-2 m-2 rounded-3 shadow">
              Add Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
}