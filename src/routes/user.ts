import {Router } from 'express'
import { userController } from '../controller/user'
import { userRepository } from '../repositories/user'
import { userInteractor } from '../interactors/user'



const router=Router()

const repository=new userRepository()

const interactor=new userInteractor(repository)

const controller = new userController(interactor)

router.get('/test',controller.test.bind(controller))
router.post('/login',controller.login.bind(controller))
router.post('/register',controller.register.bind(controller))
router.get('/weather',controller.weather.bind(controller))


export default router