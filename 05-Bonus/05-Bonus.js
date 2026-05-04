//List of audio with display names and file paths
const allSamples =[
    {name:"Ah-Ha", file:"ah-ha.mp3"},
    {name:"Dan", file:"dan.mp3"},
    {name:"Back of the net", file:"back-of-the-net.mp3"},
    {name:"Bang out of order", file:"bangoutoforder.mp3"},
    {name:"ah ha (2)", file:"ah-ha.mp3"},
    {name:"i ate scotch egg", file:"iateascotchegg.mp3"},
    {name:"Email of the evening", file:"emailoftheevening.mp3"},
    {name:"Im confused", file:"imconfused.mp3"},
    {name:"Hello Patridge", file:"hellopartridge.mp3"},
]

//tracks which page we're on and how many items to show per page
let currentPage = 0;
const itemsPerPage = 9;

//builds the sound grid
function updateUI() {
    const grid = document.getElementById('playlist');
    
    grid.innerHTML=""; //clear  previous items

    //slice the sample array to get only the currents page's items
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = allSamples.slice(start,end);

    //builds a card for each sample on this page
    currentItems.forEach ((item,index) => {
        const sound = document.createElement('div');
        sound.className = 'sound';

        const audio = new Audio(`AudioSampler/Audio/${item.file}`);
        const displayID = start + index + 1;

        sound.innerHTML = `
            <span>${displayID}.</span>
            <b>${item.name}</b>
            <small id ="dur-${displayID}">0.00</small>
        `;

        //populate duration once audio metadata loaded
        audio.onloadedmetadata = () => {
            document.getElementById(`dur-${displayID}`).innerText = audio.duration.toFixed(2);
        };

        //play from start on click
        sound.onclick = () => {
            audio.currentTime = 0;
            audio.play();
        };

        grid.appendChild(sound)
    
    });

    //update title and show/hide prev/next buttons based currents page
    document.getElementById("Title").innerText = `Sample Bank ${currentPage + 1}`;
    document.getElementById("prev").classList.toggle('hidden',currentPage === 0);
    document.getElementById("next").classList.toggle('hidden',end >= allSamples.length);
}

//pagination controls
document.getElementById("prev").onclick = () => {
    currentPage--;
    updateUI();
};

document.getElementById("next").onclick = () => {
    currentPage++;
    updateUI();
};

//text to speech reads input aloud 
document.getElementById("say").onclick = () => {
    const text = document.getElementById("text").value;
    if (text.trim()) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance (text));
    }
    };

//init
updateUI();