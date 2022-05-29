/*Create the user in an attendance array of objects at the local storage when a new user register and his/here account was confirmed
 * It will be int this structure
 * [{username:,attendance:
 *   {date:5-10-2022,
 *    case:'late',
 *    arrival:'08:32:45',
 *    departure:'3:30:00'
 *   }
 * }]
 */
export class UserAttendance {
  #username;

  constructor(username) {
    this.#username = username;
  }

  userRegisterSystem() {
    let attendance = localStorage.getItem("userAttendance");
    if (attendance != null) {
      attendance = JSON.parse(attendance);
      attendance.push({
        username: this.#username,
        attendance: [],
      });
      localStorage.setItem("userAttendance", JSON.stringify(attendance));
    } else {
      let attendance = [
        {
          username: this.#username,
          attendance: [],
        },
      ];
      localStorage.setItem("userAttendance", JSON.stringify(attendance));
    }
  }
  static getDay()
  {
    let currentDateTime = new Date();
    let currentDate =
      currentDateTime.getMonth() +
      1 +
      "-" +
      currentDateTime.getDate() +
      "-" +
      currentDateTime.getFullYear();
      return currentDate;
  }
  static getTime()
  {
    let currentDateTime = new Date();
    let currentTime = `${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`;
    return currentTime;
  }
  getCase() {
    if (
      Math.floor(
        (new Date(UserAttendance.getDay() + " " + UserAttendance.getTime()) -
          new Date(UserAttendance.getDay() + " " + "8:30:00")) /
          1000 /
          60
      ) > 0
    ) {
      return 'late';
    } else {
      return 'attend';
    }
  }

  confirmAttendance()
  {
    let userAttendance = JSON.parse(localStorage.getItem("userAttendance"));
    userAttendance.forEach(user => {
      if (user.username == this.#username)
      {
        user.attendance.unshift({
          date:UserAttendance.getDay(),
          case:this.getCase(),
          arrival:UserAttendance.getTime(),
          departure:'15:30:00'
        })
      }
    });
    localStorage.setItem("userAttendance", JSON.stringify(userAttendance));
  }

  excuse()
  {
    let userAttendance = JSON.parse(localStorage.getItem("userAttendance"));
    userAttendance.forEach(user =>{
      if (user.username == this.#username)
      {
        if(user.attendance[0].case != 'excuse')
        {
          user.attendance[0].case = 'excuse';
          user.attendance[0].departure =UserAttendance.getTime();
        }
        else
        {
          alert('Employee already execused');
        }
        
      }
    })
    localStorage.setItem("userAttendance", JSON.stringify(userAttendance));
  }

  static closeDayAttendance()
  {
    let userAttendance = localStorage.getItem('userAttendance');
    if(userAttendance!=null)
    {
      userAttendance = JSON.parse(localStorage.getItem('userAttendance'));
    }
    userAttendance.forEach(function(user){
      if(user.attendance.length == 0)
      {
        user.attendance.unshift({
          date:UserAttendance.getDay(),
          case:'absent',
          arrival:'',
          departure:''
        })
      }
      else
      {
        if(user.attendance[0].date != UserAttendance.getDay())
        {
          user.attendance.unshift({
            date:UserAttendance.getDay(),
            case:'absent',
            arrival:'',
            departure:''
          })
        }
      }
    })
    localStorage.setItem("userAttendance", JSON.stringify(userAttendance));
  }
}
