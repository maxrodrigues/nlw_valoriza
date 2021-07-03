import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string,
    password: string
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepositories)

        // VERIFICA SE O USUÁRIO EXISTE
        const user = await usersRepository.findOne({email});
        if(!user) {
            throw new Error("Email/Password incorrect");
        }

        // VERIFICA SE O PASSWORD INFORMADO É IGUAL AO ARMAZENADO
        const passwordMath = await compare(password, user.password)
        if(!passwordMath){
            throw new Error("Email/Password incorrect");
        }
        
        // md5(aprendendonodeJSnoNLW)
        const token = sign({
            email: user.email,
        }, "08726250ec1f9a36d34df2793ff2a17d", {
            subject: user.id, 
            expiresIn: "1d"
        })

        return token;
    }
}

export { AuthenticateUserService }