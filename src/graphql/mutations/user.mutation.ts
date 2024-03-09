export const userMutation = `
login (email:String ,password:String):loginResponse
signup (email:String,password:String,role : UserRole):signupResponse
updateuser(email:String,password:String ,role : UserRole): User


`;
// delete(email:String,password:String,role : UserRole): String
