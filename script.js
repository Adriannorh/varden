let prisGraf = null;
let endringsGraf = null;
let erMørktTema = false;

function byttTema() {
  erMørktTema = !erMørktTema;
  document.body.classList.toggle("dark-theme");
  oppdaterGrafer(document.getElementById("region-velger").value);
}

async function hentData() {
  try {
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl = encodeURIComponent(
      "https://ommu1982.pythonanywhere.com/static/boligprisstatistikk.json"
    );
    const response = await fetch(proxyUrl + targetUrl);
    if (!response.ok) throw new Error(`Nettverksfeil: ${response.status}`);
    const data = await response.json();
    return JSON.parse(data.contents);
  } catch (error) {
    console.error("Hentingsfeil:", error);
    throw new Error("Kunne ikke laste data: " + error.message);
  }
}

function oppdaterGrafer(region) {
  if (!window.statisticsData || !window.statisticsData[region]) return;

  const regionData = window.statisticsData[region];
  const tekstFarge = erMørktTema ? "#ffffff" : "#1a1a1a";
  const aksentFarge = erMørktTema ? "#6366f1" : "#4f46e5";

  document.getElementById("gjennomsnittspris").textContent =
    regionData["Gjennomsnittspris"];
  document.getElementById("kvadratmeterpris").textContent =
    regionData["Gjennomsnitt kvm. pris"];
  document.getElementById("manedlig-endring").textContent =
    regionData["Endring siste måned"] + "%";
  document.getElementById("arlig-endring").textContent =
    regionData["Endring siste år"] + "%";

  const grafKonfigurasjon = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        color: tekstFarge,
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      y: {
        ticks: {
          color: tekstFarge,
          font: { size: 12 },
        },
        grid: {
          color: erMørktTema
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        ticks: {
          color: tekstFarge,
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  if (prisGraf) prisGraf.destroy();
  if (endringsGraf) endringsGraf.destroy();

  const gjennomsnittsPris =
    parseInt(regionData["Gjennomsnittspris"]?.replace(/\s/g, "")) || 0;
  const kvadratmeterPris =
    parseInt(regionData["Gjennomsnitt kvm. pris"]?.replace(/\s/g, "")) || 0;

  const prisKontekst = document.getElementById("pris-graf").getContext("2d");
  prisGraf = new Chart(prisKontekst, {
    type: "bar",
    data: {
      labels: ["Gjennomsnittspris", "Kvm. pris"],
      datasets: [
        {
          data: [gjennomsnittsPris, kvadratmeterPris],
          backgroundColor: aksentFarge,
          borderRadius: 6,
        },
      ],
    },
    options: {
      ...grafKonfigurasjon,
      plugins: {
        ...grafKonfigurasjon.plugins,
        title: {
          ...grafKonfigurasjon.plugins.title,
          text: "Priser (NOK)",
        },
      },
    },
  });

  const månedligEndring = parseFloat(regionData["Endring siste måned"]) || 0;
  const årligEndring = parseFloat(regionData["Endring siste år"]) || 0;
  const sesongjustertEndring =
    parseFloat(regionData["Endring sesongjustert siste måned"]) || 0;

  const endringsKontekst = document
    .getElementById("endrings-graf")
    .getContext("2d");
  endringsGraf = new Chart(endringsKontekst, {
    type: "bar",
    data: {
      labels: ["Siste måned", "Siste år", "Sesongjustert"],
      datasets: [
        {
          data: [månedligEndring, årligEndring, sesongjustertEndring],
          backgroundColor: aksentFarge,
          borderRadius: 6,
        },
      ],
    },
    options: {
      ...grafKonfigurasjon,
      plugins: {
        ...grafKonfigurasjon.plugins,
        title: {
          ...grafKonfigurasjon.plugins.title,
          text: "Prisendringer (%)",
        },
      },
    },
  });
}

async function initialiserApp() {
  try {
    window.statisticsData = await hentData();
    const regionVelger = document.getElementById("region-velger");

    Object.keys(window.statisticsData).forEach((region) => {
      const alternativ = document.createElement("option");
      alternativ.value = region;
      alternativ.textContent = region;
      regionVelger.appendChild(alternativ);
    });

    regionVelger.addEventListener("change", (e) =>
      oppdaterGrafer(e.target.value)
    );

    const standardRegion = window.statisticsData["Norge"]
      ? "Norge"
      : Object.keys(window.statisticsData)[0];

    regionVelger.value = standardRegion;
    oppdaterGrafer(standardRegion);
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener("DOMContentLoaded", initialiserApp);
