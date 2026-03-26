document.addEventListener("DOMContentLoaded", () => {
  const addBtn     = document.getElementById("addBtn");
  const modal      = document.getElementById("modal");
  const saveNote   = document.getElementById("saveNote");
  const closeModal = document.getElementById("closeModal");

  const titleInput = document.getElementById("noteTitle");
  const textInput  = document.getElementById("noteText");
  const colorInput = document.getElementById("noteColor");

  const container  = document.getElementById("notesContainer");
  const search     = document.getElementById("search");
  const themeBtn   = document.getElementById("themeBtn");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `${r},${g},${b}`;
  }

  function renderNotes(filter = "") {
    container.innerHTML = "";

    const filtered = notes.filter(n =>
      n.title.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="
          grid-column: 1/-1;
          text-align: center;
          padding: 70px 20px;
          font-size: 1rem;
        ">
          <div style="font-size: 3rem; margin-bottom: 14px; filter: drop-shadow(0 0 12px rgba(255,120,220,0.5))">🌸</div>
          <p style="color: var(--text-mid)">No notes yet — add your first one! 💕</p>
        </div>`;
      return;
    }

    filtered.forEach(note => {
      const div = document.createElement("div");
      div.className = "note";

      if (note.color) {
        const rgb = hexToRgb(note.color);
        div.style.setProperty('--note-bg',     `rgba(${rgb}, 0.22)`);
        div.style.setProperty('--note-accent', note.color);
        div.style.borderColor = `rgba(${rgb}, 0.45)`;
        div.style.boxShadow   = `0 8px 28px rgba(0,0,0,0.45), 0 0 25px rgba(${rgb}, 0.30)`;
      }

      const title = document.createElement("h3");
      title.innerText = note.title || "(no title)";

      const text = document.createElement("p");
      text.innerText = note.text;

      const btns = document.createElement("div");
      btns.className = "note-buttons";

      const del = document.createElement("button");
      del.innerText = "🗑️ Delete";
      del.onclick = () => {
        const realIndex = notes.indexOf(note);
        notes.splice(realIndex, 1);
        saveNotes();
        renderNotes(search.value);
      };

      btns.appendChild(del);
      div.append(title, text, btns);
      container.appendChild(div);
    });
  }

  addBtn.onclick = () => {
    modal.style.display = "flex";
  };

  closeModal.onclick = () => {
    modal.style.display = "none";
    titleInput.value = "";
    textInput.value  = "";
    colorInput.value = "#ffd6e7";
  };

  saveNote.onclick = () => {
    if (!titleInput.value.trim() && !textInput.value.trim()) return;

    notes.push({
      title: titleInput.value.trim(),
      text:  textInput.value.trim(),
      color: colorInput.value
    });

    saveNotes();
    modal.style.display = "none";

    titleInput.value = "";
    textInput.value  = "";
    colorInput.value = "#ffd6e7";

    renderNotes(search.value); // immediately shows note on main page
  };

  search.oninput = (e) => {
    renderNotes(e.target.value);
  };

  themeBtn.onclick = () => {
    document.body.classList.toggle("light");
    themeBtn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
  };

  renderNotes();
});