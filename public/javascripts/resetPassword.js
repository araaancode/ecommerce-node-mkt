let password = document.getElementById('password')
let confirmPassword = document.getElementById('confirm-password')
let btn=document.getElementById("reset-password-btn")
const notifications = document.querySelector(".notifications");


let token, userId

token = document.baseURI
  .split('/reset-password?')[1]
  .split('&')[0]
  .split('=')[1]
userId = document.baseURI
  .split('/reset-password?')[1]
  .split('&')[1]
  .split('=')[1]



// $(document).ready(function () {
//   $('#reset-password').click(function (e) {
//     e.preventDefault()
//     if (
//       password.value === '' ||
//       password.value === undefined ||
//       password.value === null
//     ) {
//       passwordMSG.innerText = 'گذرواژه را باید وارد کنید'
//     } else if (
//       confirmPassword.value === '' ||
//       confirmPassword.value === undefined ||
//       confirmPassword.value === null
//     ) {
//       confirmPasswordMSG.innerText = 'تایید گذرواژه را باید وارد کنید'
//     } else {
//       $.ajax({
//         type: 'POST',
//         url: '/api/auth/reset-password',
//         data: {
//           userId: userId,
//           token: token,
//           password: $('#password').val(),
//           confirmPassword: $('#confirm-password').val(),
//         },
//         success: function (response) {
//           Swal.fire({
//             text: 'گذرواژه با موفقیت تغییر کرد برای ادامه به ایمیل خود مراجعه کنید',
//             icon: 'success',
//             buttonsStyling: !1,
//             confirmButtonText: 'تایید',
//             customClass: { confirmButton: 'btn btn-primary' },
//           }).then(function (t) {
//             location.reload()
//           })
//         },
//         error: function (xhr, textStatus, errorThrown) {
//           Swal.fire({
//             text: `${xhr.responseJSON.msg}`,
//             icon: 'error',
//             buttonsStyling: !1,
//             confirmButtonText: 'تایید',
//             customClass: { confirmButton: 'btn btn-danger' },
//           })
//         },
//       })
//     }
//   })
// })


// Object containing details for different types of toasts
const toastDetails = {
    timer: 5000,
    success: {
      icon: "fa-circle-check",
      text: "Success: This is a success toast.",
    },
    error: {
      icon: "fa-circle-xmark",
      text: "Error: This is an error toast.",
    },
    warning: {
      icon: "fa-triangle-exclamation",
      text: "Warning: This is a warning toast.",
    },
    info: {
      icon: "fa-circle-info",
      text: "Info: This is an information toast.",
    },
  };
  
  const removeToast = (toast) => {
    toast.classList.add("hide");
    if (toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
  };
  
  const createToast = (id, icon, text) => {
    // Getting the icon and text for the toast based on the id passed
    // const { icon, text } = toastDetails[id];
    const toast = document.createElement("li"); // Creating a new 'li' element for the toast
    toast.className = `toast ${id}`; // Setting the classes for the toast
    // Setting the inner HTML for the toast
    toast.innerHTML = `<div class="column">
               <i class="fa-solid ${icon}"></i>
               <span style="margin-right:10px"> ${text}</span>
            </div>
            <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast); // Append the toast to the notification ul
    // Setting a timeout to remove the toast after the specified duration
    toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
  };
  
  // Example POST method implementation:
  async function resetPassword(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  

btn.addEventListener("click",function (e) {
    e.preventDefault()

    if(password.value === "" || password.value === undefined || password.value === null){
        let msg = "گذروازه نباید خالی باشد";
        createToast("error", "fa-circle-xmark", msg);
    }
    if(confirmPassword.value === "" || confirmPassword.value === confirmPassword || confirmPassword.value === null){
      let msg = "تایید گذرواژه نباید خالی باشد";
      createToast("error", "fa-circle-xmark", msg);
    }
    else {
        resetPassword("/api/auth/reset-password", {
          userId: userId,
          token: token,
          password: password.value,
          confirmPassword:  confirmPassword.value,
        })
          .then((data) => {
            let msgCode = data.msgCode;
            switch (msgCode) {
              case 1:
                createToast("warning", "fa-triangle-exclamation", data.msg);
                break;
    
              case 2:
                createToast("success", "fa-circle-check", data.msg);
                setTimeout(() => {
                  localStorage.setItem("userId", data._id);
                  location.reload();
                }, 5000);
                break;
    
              case 3:
                createToast("error", "fa-circle-xmark", data.msg);
                break;
    
              case 4:
                createToast("info", "fa-circle-info", data.msg);
                break;
              default:
                break;
            }
          })
          .catch((error) => {
            createToast("error", "fa-circle-xmark", error);
          });
      }
})

