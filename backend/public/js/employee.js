// const token = localStorage.getItem("token");
// console.log(token);
fetch("/api/userIndex",{
    method:"GET",
    headers:
    {
        // 'Authorization':`Bearer ${token}`

    }
}).then(response=>
{
   return response.json();
}
).then(data=>
{
   const employeeData= data.data;

 const employees={};
 employeeData.forEach(employee => {
    employees[employee.id]={
'FirstName': employee.fname,
'LastName': employee.lname,
'phone': employee.phone,
'email': employee.email,
    };
});   
console.log(employees);
}
);

