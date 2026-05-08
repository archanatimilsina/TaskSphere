<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous"></script>
    <style>
        .Attendancecontainer {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  font-family: 'Baloo 2', sans-serif;
}
.Attendancecontainer h1{
  border-bottom:1px solid gray ;
  width: 250px;
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.attendance-table th,
.attendance-table td {
  border: 1px solid #ddd;
  padding: 0.8rem;
  text-align: left;
}

.attendance-table th {
  background-color: #f5f5f5;
}

.status.present {
  color: green;
  font-weight: bold;
}

.status.absent {
  color: red;
  font-weight: bold;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn.primary {
  background-color: #4CAF50;
  color: white;
}

.btn.edit {
  background-color: #2196F3;
  color: white;
}

.btn.delete {
  background-color: #f44336;
  color: white;
}

.modal {
  display: none;
  position: fixed;
  z-index: 999;
  padding-top: 60px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: white;
  margin: auto;
  padding: 2rem;
  border: 1px solid #888;
  width: 400px;
  border-radius: 8px;
}

.modal-content h3 {
  margin-bottom: 1rem;
}

.modal-content label {
  display: block;
  margin: 0.5rem 0 0.3rem;
}

.modal-content input,
.modal-content select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.radio-group {
  display: flex;
  gap: 1rem;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

    </style>
</head>
<body>
<div class="Attendancecontainer">
  <h1>Attendance List</h1>
  <table class="attendance-table">
    <thead>
      <tr>
        <th>S.N</th>
        <th>Employee</th>
        <th>Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Jane Doe</td>
        <td>2025-04-30</td>
        <td><span class="status present">Present</span></td>
        <td>
          <button class="btn edit">Edit</button>
          <button class="btn delete">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>


<div class="modal" id="addAttendanceModal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h3>Add Attendance</h3>
    <form>
      <label>Employee</label>
      <select>
        <option>-- Select --</option>
        <option>Jane Doe</option>
      </select>

      <label>Date</label>
      <input type="date" />

      <label>Status</label>
      <div class="radio-group">
        <label><input type="radio" name="status" value="Present" checked /> Present</label>
        <label><input type="radio" name="status" value="Absent" /> Absent</label>
      </div>

      <button type="submit" class="btn primary">Submit</button>
    </form>
  </div>
</div>


<div class="modal" id="updateAttendanceModal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h3>Update Attendance</h3>
    <form>
      <label>Employee</label>
      <select>
        <option>Jane Doe</option>
      </select>

      <label>Date</label>
      <input type="date" value="2025-04-30" />

      <label>Status</label>
      <div class="radio-group">
        <label><input type="radio" name="status" value="Present" /> Present</label>
        <label><input type="radio" name="status" value="Absent" checked /> Absent</label>
      </div>

      <button type="submit" class="btn primary">Update</button>
    </form>
  </div>
</div>

</body>
</html> 