firebase.initializeApp({
    apiKey: "AIzaSyDOI1wDXi6hc7oTWqit-bSPte5XDyFeqfI",
    authDomain: "plp-apps-de76d.firebaseapp.com",
    projectId: "plp-apps-de76d",
    storageBucket: "plp-apps-de76d.appspot.com",
    messagingSenderId: "363079398668",
    appId: "1:363079398668:web:d3aae20fc726d1f3b50529",
});
  
const db = firebase.firestore();
  
  // Function to add a task and store in DB
function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== ""){
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
    }
}
  
  // Function to render tasks - fetch and display them
function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        <span>${doc.data().task}</span>
        <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}
  
  // Real-time listener for tasks
db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === "added") {
                renderTasks(change.doc);
            }
        });
    });
  
  // Function to delete a task
function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
}