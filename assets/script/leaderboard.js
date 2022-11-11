
function setLeaderboardView(rank, name, contests, points){

    var leaderboard = document.getElementById("leaderboard")

    var leaderboard_row = document.createElement("tr")
    
    var student_rank = document.createElement("td")
    var student_name = document.createElement("td")
    var student_contests = document.createElement("td")
    var student_points = document.createElement("td")

    student_rank.appendChild(document.createTextNode(rank))
    student_name.appendChild(document.createTextNode(name))
    student_contests.appendChild(document.createTextNode(contests))
    student_points.appendChild(document.createTextNode(points))

    //styling

    student_rank.style.textAlign = "center"
    student_rank.style.background = "#232427"
    student_contests.style.textAlign = "center"
    student_points.style.textAlign = "center"

    leaderboard_row.appendChild(student_rank)
    leaderboard_row.appendChild(student_name)
    leaderboard_row.appendChild(student_contests)
    leaderboard_row.appendChild(student_points)

    leaderboard.appendChild(leaderboard_row)


}

function getData(){

    var request = new XMLHttpRequest()

    var URL = "https://uaf-programmers-default-rtdb.firebaseio.com/Students.json"

    request.open("GET", URL, false)

    request.send( null )

    return request.responseText

}


function setData(){
    
    var response = getData()

    var students_json = JSON.parse(response)

    var all_students_arr = []

    var student_counter = 0

    for(var student_key in students_json){

        student_arr = []

        student_arr[0] = students_json[student_key]["name"]
        student_arr[1] = students_json[student_key]["contests"]
        student_arr[2] = students_json[student_key]["points"]

        all_students_arr[student_counter] = student_arr

        student_counter++

    }

    all_students_arr.sort(function(stu1, stu2){return stu2[2] - stu1[2]})

    var student_rank = 1

    var prev_points = all_students_arr[0][2]

    for(var student of all_students_arr){

        

        if(student[2] < prev_points){
            console.log(prev_points)
            prev_points = student[2]
            student_rank++
        }


        setLeaderboardView(student_rank, student[0], student[1], student[2])
    }



}

setData()



