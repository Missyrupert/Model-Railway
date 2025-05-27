const TRAINS = [
  {
    name: "Flying Scotsman",
    history:
      "Built in 1923, the Flying Scotsman became the first steam locomotive officially authenticated at 100 mph. It ran the London to Edinburgh service and remains a British cultural icon.",
    facts: [
      "Set speed record for steam locomotives in 1934.",
      "Preserved and still runs on heritage lines.",
      "Featured in multiple films, books, and TV documentaries.",
      "Available as models in multiple scales: OO, N, and more.",
    ],
  },
  {
    name: "Mallard",
    history:
      "The LNER Class A4 4468 Mallard, built in 1938, holds the world speed record for steam locomotives at 126 mph. It's famous for its streamlined design and iconic blue livery.",
    facts: [
      "Set the steam locomotive speed record on 3 July 1938.",
      "Part of the National Collection and on display at the National Railway Museum, York.",
      "Frequently modelled by Hornby and other makers.",
    ],
  },
  {
    name: "InterCity 125 (HST)",
    history:
      "Launched in 1976, the InterCity 125 (High-Speed Train) transformed UK rail travel with speeds up to 125 mph, connecting major cities efficiently.",
    facts: [
      "First British train to reach 125 mph in regular service.",
      "Revolutionised British railways in the late 20th century.",
      "Popular model in OO and N gauge.",
    ],
  },
  {
    name: "The Royal Scot",
    history:
      "Introduced in 1927, The Royal Scot was the pride of the LMS, running between London Euston and Glasgow Central. Its distinctive locomotive and carriages symbolised luxury and speed.",
    facts: [
      "Rebuilt several times for performance improvements.",
      "Named 'Royal Scot' after a competition.",
      "Replicated in Hornby and Bachmann ranges.",
    ],
  },
  {
    name: "Great Western Railway King Class",
    history:
      "The GWR King Class, launched in 1927, was the most powerful passenger steam locomotive built for the Great Western Railway, handling top express services like the 'Cornish Riviera Express'.",
    facts: [
      "Only 30 built; known for power and reliability.",
      "Preserved examples include 6023 King Edward II.",
      "Modelled by major UK brands.",
    ],
  },
];

const funFacts = [
  "Britain hosted the world’s first public railway in 1825: the Stockton and Darlington Railway.",
  "The earliest known model railway dates back to the mid-1800s, belonging to the son of Queen Victoria.",
  "Model railway clubs have flourished in the UK since the early 20th century.",
  "Hornby and Tri-ang are classic British model railway manufacturers.",
  "The BBC series 'The Great Model Railway Challenge' brought the hobby to prime-time TV.",
];

// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Populate fun facts
const funFactsEl = document.getElementById("fun-facts");
funFacts.forEach(fact => {
  const li = document.createElement("li");
  li.textContent = fact;
  funFactsEl.appendChild(li);
});

// Train lookup logic
document.getElementById("train-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const query = document.getElementById("train-input").value.trim().toLowerCase();
  const match = TRAINS.find(
    train =>
      train.name.toLowerCase() === query ||
      train.name.toLowerCase().includes(query)
  );
  const resultDiv = document.getElementById("train-result");
  resultDiv.innerHTML = "";

  if (match) {
    let factsHtml = "<ul>";
    match.facts.forEach(f => {
      factsHtml += `<li>${f}</li>`;
    });
    factsHtml += "</ul>";
    resultDiv.innerHTML = `
      <h3>${match.name}</h3>
      <p><strong>History:</strong> ${match.history}</p>
      ${factsHtml}
    `;
  } else {
    resultDiv.innerHTML = `<p>No matching train found. Try "Flying Scotsman", "Mallard", "InterCity 125", "The Royal Scot", or "Great Western Railway King Class".</p>`;
  }
});
