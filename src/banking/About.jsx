const AboutUs = () => {
  const secciones = [
    {
      icon: "bi-building",
      titulo: "Who we are",
      descripcion:
        "We are a digital bank committed to financial innovation, offering modern and secure solutions for our customers.",
    },
    {
      icon: "bi-bullseye",
      titulo: "Mision",
      descripcion:
        "Facilitate people's financial lives by providing accessible, fast, and reliable services from anywhere.",
    },
    {
      icon: "bi-eye",
      titulo: "Vision",
      descripcion:
        "To become the leading digital bank in the region, recognized for trust, innovation, and service excellence.",
    },
    {
      icon: "bi-heart",
      titulo: "Values",
      descripcion:
        "Transparency, commitment, innovation, and responsibility toward our clients and society.",
    },
    {
      icon: "bi-people",
      titulo: "Our Team",
      descripcion:
        "We have a multidisciplinary team of professionals passionate about transforming digital banking.",
    },
  ];

  return (
    <div className="about-container">
      <nav class="navbar dashboard-navbar">
        <div class="container-fluid">
          <a class="navbar-brand fs-1 text-light" href="/">
            AG-Bank
          </a>
        </div>
      </nav>

      <section id="about" className="py-5 bg-white about-content-container">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">About us</h2>
          <div className="row">
            {secciones.map((item, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center">
                    <i
                      className={`bi ${item.icon} display-4 text-primary mb-3`}
                    ></i>
                    <h5 className="card-title">{item.titulo}</h5>
                    <p className="card-text">{item.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
