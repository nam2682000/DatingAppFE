// Define TypeScript interface for the form model
export interface UserRegisterRequest {
    username: string
    firstname: string
    lastname: string
    dateOfBirth: string // Use string to work with v-model of el-date-picker
    gender: string
    email: string
    password: string
    rePassword: string // New field for re-entering password
}



export interface LoginRequest {
    userName: string
    passWord: string
    rememberMe: boolean
};