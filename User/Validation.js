function validation({ firstName, lastName, email, password }, type) {
   let arr = []
   if (type === "register") {
      if (!firstName) {
         arr.push({ key: "firstName", message: "Required filed Firstname is empty" })
      }else if(!(/^[A-Za-z]+$/.test(firstName))){
         arr.push({key:"firstName", message:"Firstname must contain at least 3 letters without numbers"})
      }
      if (!lastName) {
         arr.push({ key: "lastName", message: "Required field Lastname is Empty" })
      }else if(!(/^[A-Za-z]+$/.test(lastName))){
         arr.push({key:"lastName", message:"Lastname must contain at least 3 letters without numbers"})
      }
      if (!email) {
         arr.push({ key: "email", message: "Required field Email is Empty" })
      } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
         arr.push({ key: "email", message: "Invalid Email" })
      }
      if (!password) {
         arr.push({ key: "password", message: "Required field Password is Empty" })
      } else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password))) {
         arr.push({ key: "password", message: "Password is to weak" })
      }

   } else {
      if (!email) {
         arr.push({ key: "email", message: "Required field Email is Empty" })
      } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
         arr.push({ key: "email", message: "Invalid Email" })
      }
      if (!password) {
         arr.push({ key: "password", message: "Required field Password is Empty" })
      } else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password))) {
         arr.push({ key: "password", message: "Password is to weak" })
      }
   }
   return arr
}

module.exports = validation