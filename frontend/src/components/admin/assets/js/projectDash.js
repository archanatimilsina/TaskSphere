 // Example: You get this from your backend using ID
 const project = {
    id: 6,
    name: "Data Analytics Dashboard",
    description: "Develop a real-time analytics dashboard",
    sdate: "2025-01-20",
    edate: "2025-04-15",
    members: ["Oliver", "Isabella", "Lucas"],
    leader: "Oliver",
    workspaceCount: 6,
    status: "completed",
    created_at: "2025-01-15",
    updated_at: "2025-04-10"
  };

  document.getElementById("title").textContent = project.name;
  document.getElementById("description").textContent = project.description;
  document.getElementById("leader").textContent = project.leader;
  document.getElementById("members").textContent = project.members.join(", ");
  document.getElementById("sdate").textContent = project.sdate;
  document.getElementById("edate").textContent = project.edate;
  document.getElementById("workspaces").textContent = project.workspaceCount;
  document.getElementById("created").textContent = project.created_at;
  document.getElementById("updated").textContent = project.updated_at;

  const statusEl = document.getElementById("status");
  statusEl.textContent = project.status;
  statusEl.classList.add(
    project.status === "completed"
      ? "status-completed"
      : project.status === "on hold"
      ? "status-on-hold"
      : "status-not-started"
  );