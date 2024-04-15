// Get reminders from localStorage or initialize an empty array
let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

// Reminder form submission
document.getElementById('reminderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get input values
  let reminderTitle = document.getElementById('title').value;
  let reminderDate = document.getElementById('date').value;

  // Create a reminder object
  let reminder = {
    title: reminderTitle,
    date: reminderDate
  };

  // Add the reminder to the array
  reminders.push(reminder);

  // Save the updated reminders to localStorage
  localStorage.setItem('reminders', JSON.stringify(reminders));

  // Reset form
  document.getElementById('reminderForm').reset();

  // Display the reminders on the page
  displayReminders();
});

function displayReminders() {
    let reminderList = document.getElementById('reminderList');
    reminderList.innerHTML = '';
  
    reminders.forEach(function(reminder, index) {
      let reminderItem = document.createElement('div');
      reminderItem.classList.add('reminder-item');
      
      if (reminder.editMode) {
        // Edit mode
        reminderItem.innerHTML = `
          <input type="text" value="${reminder.title}" id="editTitle${index}">
          <input type="date" value="${reminder.date}" id="editDate${index}">
          <button onclick="saveReminder(${index})">Save</button>
          <button onclick="cancelEdit(${index})">Cancel</button>
        `;
      } else {
        // Display mode
        reminderItem.innerHTML = `
          <button>${reminder.title}</button>
          <p>${reminder.date}</p>
          <button onclick="deleteReminder(${index})">Delete</button>
          <button onclick="editReminder(${index})">Edit</button>
        `;
      }
  
      reminderList.appendChild(reminderItem);
    });
  }

  
// Edit a reminder
function editReminder(index) {
  reminders[index].editMode = true;
  displayReminders();
}

// Save a reminder after editing
function saveReminder(index) {
  let editTitle = document.getElementById(`editTitle${index}`).value;
  let editDate = document.getElementById(`editDate${index}`).value;

  reminders[index].title = editTitle;
  reminders[index].date = editDate;
  reminders[index].editMode = false;

  localStorage.setItem('reminders', JSON.stringify(reminders));
  displayReminders();
}

// Cancel editing a reminder
function cancelEdit(index) {
  reminders[index].editMode = false;
  displayReminders();
}

// Delete a reminder
function deleteReminder(index) {
  reminders.splice(index, 1);
  localStorage.setItem('reminders', JSON.stringify(reminders));
  displayReminders();
}

function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}

// // Function to get reminders for a specific month
// function getRemindersByMonth(month) {
//   return remindersByMonth[month] || [];
// }


// Initial display of reminders on page load
displayReminders();

