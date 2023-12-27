import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { DateTime } from 'luxon'


export default class UsuariosController {
  public async index({}: HttpContextContract) {
    return Usuario.all()
  }

  //Criar usuário
  public async store({request, response}: HttpContextContract) {
    const {nome,cpf,senha}=request.body()
    if(nome==undefined || cpf==undefined|| senha==undefined){
      return response.status(400)
    }

    //Criptografar senha
    var md5 = require('md5');
    const senhamd5 = md5(senha);

    const newUsuario={nome,cpf,senha:senhamd5}
    Usuario.create(newUsuario)
    return response.status(201).send(newUsuario)
  }

  //Mostrar usuário
  public async show({params, response}: HttpContextContract) {
    let usuarioEncontrado=await Usuario.findByOrFail('id',params.id)
    if (usuarioEncontrado == undefined)
    return response.status(404)
    return usuarioEncontrado
  }

  //Atualizar usuário
  public async update({request, params, response}: HttpContextContract) { 
    const {nome, cpf, senha}= request.body()
    let usuarioEncontrado=await Usuario.findByOrFail('id',params.id)
    if (!usuarioEncontrado)
      return response.status(404)
    usuarioEncontrado.nome=nome
    usuarioEncontrado.cpf=cpf
    usuarioEncontrado.senha=senha

    await usuarioEncontrado.save()
    await usuarioEncontrado.merge({updatedAt:DateTime.local()}).save()
    return response.status(200).send(usuarioEncontrado)}

  //Deletar usuário
  public async destroy({response, params}: HttpContextContract) {
    let usuarioEncontrado=await Usuario.findByOrFail('id',params.id)
    if (!usuarioEncontrado) {
      return response.status(404)
    } else {
      await usuarioEncontrado.delete()
      return response.status(204)
    }
  }
}
