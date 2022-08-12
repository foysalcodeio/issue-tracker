
document.getElementById('h1').style.color = "white"
document.getElementById('p_total').style.color = "white"
document.getElementById('p_total').style.fontSize = "2rem"

document.getElementById('p_open').style.color = "white"
document.getElementById('p_open').style.fontSize = "2rem"
document.getElementById('p_open').style.background = "green"

document.getElementById('p_close').style.color = "white"
document.getElementById('p_close').style.fontSize = "2rem"
document.getElementById('p_close').style.fontFamily = "Helvetica"
document.getElementById('p_close').style.background = "red"


document.getElementById('issueInputForm').addEventListener('submit', submitIssue);


// document.getElementById('add').addEventListener("click", ()=> {
//   const data = document.getElementById('total')
//   const dataValue = parseInt(data.value)
//   console.log(dataValue)
// })

function addBtn(){
  const dataInput = document.getElementById('total').innerText
  const dataValue = parseInt(dataInput) + 1  
  document.getElementById('total').innerHTML  = dataValue;

  const dataOpen = document.getElementById('open').innerText
  const openValue = parseInt(dataOpen) + 1
  document.getElementById('open').innerHTML = openValue;
}



function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription'); 
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = '✅ Open';

  const issue = { id, description, severity, assignedTo, status };

  let issues = [];

  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue); // data push in a variable
  localStorage.setItem('issues', JSON.stringify(issues)); // localStorage e data push

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}


const closeIssue = id => {

  // const issues = JSON.parse(localStorage.getItem('issues'));
  // const currentIssue = issues.find( issue => issue.id == id);
  // currentIssue.status = '❌ closed';
  // localStorage.setItem('issues', JSON.stringify(issues));

  const issues = JSON.parse(localStorage.getItem('issues'))
  for(let i = 0; i < issues.length; i++){
    if(issues[i].id == id){
      issues[i].status = '❌ closed';
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues))



  const dataInput = document.getElementById('close').innerText
  const dataValue = parseInt(dataInput) + 1  
  document.getElementById('close').innerHTML = dataValue;
  openDecreaseData();
  fetchIssues();
}

function openDecreaseData(){
  const openInput = parseInt(document.getElementById('open').innerText)
  document.getElementById('open').innerHTML = openInput - 1;
}


// const deleteIssue = id => {
//   const issues = JSON.parse(localStorage.getItem('issues'));
//   const remainingIssues = issues.filter( (issue) => issue.id == id )
//   remainingIssues.splice(1, 1)
//   localStorage.setItem('issues', JSON.stringify(remainingIssues));
//   fetchIssues()
// }



function deleteIssue(id){
  
  const issues = JSON.parse(localStorage.getItem('issues'))
  for(let i = 0; i < issues.length; i++){
    if(issues[i].id == id){
      issues.splice(i, 1)
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues))

  const dataTotal = document.getElementById('total').innerText
  const openValue = parseInt(dataTotal) - 1
  document.getElementById('total').innerHTML = openValue;

  if (openValue == '0'){
    document. location. reload();
  }

  
  fetchIssues()
}


const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
