import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string, 
    email: string,
    admin: boolean,
    password: string
}

class CreateUserService {

    async execute({name, email, admin = false, password} : IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories)
        // VERIFICA SE O EMAIL FOI PASSADO. SE EM BRANCO RETORNA ERRO
        if(!email) {
            throw new Error("email incorrect")
        }
        // PESQUISA NO BANCO PELO EMAIL
        const userAlreadyExists = await usersRepository.findOne({email})

        // SE O EMAIL JÁ EXISTE RETORNA ERRO
        if(userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8)

        // FAZ A INSTANCIA DO OBJETO USER
        const user = usersRepository.create({name, email, admin, password: passwordHash})

        // SALVA O OBJETO EM BANCO
        await usersRepository.save(user)

        return user;
    }

}

export { CreateUserService }